// ARRAY för att spara response HUVUDUTGÅNGSPUNKT
let courses = [];

// Array, för klickade allergier
let restrictAllergies = [];

// Array, för allergier som ska tas bort från menyn.
let toVanish = [];
//Sorterade priser
let sortedClicked = false;
let sortedAsc = false;
// Denier
let alreadyDisplayed = false;
let isActive = false;
//Olika meny sektioner 
let starters = [];
let main = [];
let sides = [];
let desert = [];

// ON load
window.onload = async function() {
   await readJson();
   customMenu();
    
}

// Hämtar element
const priceSortBtn = document.getElementById('priceSorter');
const priceSortBtnAsc = document.getElementById('priceSorterAsc');
const nutsBtn = document.getElementById('nuts');
const glutenBtn = document.getElementById('gluten');
const fishBtn = document.getElementById('fish');
const soyBtn = document.getElementById('soy');
const lactoseBtn = document.getElementById('lactose');
const showFullMenu = document.querySelector('#wholeMenu-Btn');


// Standard färger!
const buttonOnClickColor = "rgba(255, 0, 0, 0.585)";
const buttonDefaultColor = "#FFFFFF";





// Laddar om från början, "visa hela menyn".
showFullMenu.addEventListener('click', async () => {
   await readJson();
    customMenu();
    changeToDefualt();

});
// hämtar knapparna DESC ASC

let ascBtnColor = document.querySelector('.asc');
let descBtnColor = document.querySelector('.desc');


//Event listeners 
priceSortBtn.addEventListener('click', async () => {
    ascBtnColor.style.backgroundColor = 'red';
    descBtnColor.style.backgroundColor = 'white';
    await priceSortActive();
    // Måste utredas varför två behövs?
    customMenu();
    customMenu();
    //--------
});

priceSortBtnAsc.addEventListener('click', async () => {
    descBtnColor.style.backgroundColor = 'red';
    ascBtnColor.style.backgroundColor = 'white';
    await priceSortAsc();
    // Måste utredas varför två behövs?
    customMenu();
    customMenu();
    //--------
});

nutsBtn.addEventListener('click', async () => {
   
    // Gör så att restricAllergies ej blir fylld i onödan.
    if(!restrictAllergies.includes('nuts')){
        restrictAllergies.push('nuts');
    }

    customMenu();
    nutsBtn.style.backgroundColor = buttonOnClickColor;
});

glutenBtn.addEventListener('click', async () => {
    
        if(!restrictAllergies.includes('gluten')){
            restrictAllergies.push('gluten');
        }
   
        customMenu();
        glutenBtn.style.backgroundColor = buttonOnClickColor;
});

fishBtn.addEventListener('click', () => {
    if(!restrictAllergies.includes('fish')){
        restrictAllergies.push('fish');
    }

    customMenu();
    fishBtn.style.backgroundColor = buttonOnClickColor;
});

soyBtn.addEventListener('click',  () => {
    if(!restrictAllergies.includes('soy')){
        restrictAllergies.push('soy');
    }

    customMenu();
    soyBtn.style.backgroundColor = buttonOnClickColor;
});

lactoseBtn.addEventListener('click', () => {
    if(!restrictAllergies.includes('lactose')){
        restrictAllergies.push('lactose');
    }

    customMenu();
    lactoseBtn.style.backgroundColor = buttonOnClickColor;
});
// ------ End of event listeners


// Ändra färg till standard
function changeToDefualt() {

    nutsBtn.style.backgroundColor = buttonDefaultColor;
    glutenBtn.style.backgroundColor = buttonDefaultColor;
    fishBtn.style.backgroundColor = buttonDefaultColor;
    soyBtn.style.backgroundColor = buttonDefaultColor;
    lactoseBtn.style.backgroundColor = buttonDefaultColor;

}

// Hämtar JSON fil och läser innehåll.
async function readJson() {


    await fetch('courses.json')
        .then((res) => {
            return res.json()
        })
        .then((response) => {
            courses = [];
            //Sänder response till array för att jobba vidare med!
            response.forEach(meal => {
              courses.push(meal);
                
            });
        })
}

// Kollar allergier
async function allergyChecker() {
        // el är förkortning på element
        // Kollar om användaren har lagt till något i restrictAllergies
        // letar sedan match i alla courses[].

        for(const el in courses){
            if(restrictAllergies.some(item => courses[el].allergy.includes(item))) {
                // Om det hittas skicka
              toVanish.push(courses[el]);
            } 
    }

    //loopa igenom vad som ska tas bort och ta bort föremål på index.
     toVanish.forEach(element => {
        let index = courses.indexOf(element);

        courses.splice(index,1);
     })

     // Återställer obejekt i arrays, annars dubbleras dem.
     restrictAllergies = [];
     toVanish = [];
  
}

// Delar upp courses i sektioner.
function sectionDivider(){

    for(const item in courses){

        if(courses[item].section == 'starters'){
            starters.push(courses[item]);
        }else if(courses[item].section == 'main'){
            main.push(courses[item]);
        }
        else if(courses[item].section == 'sides'){
            sides.push(courses[item]);
        }
        else if(courses[item].section == 'desert'){
            desert.push(courses[item]);
        }
        else{
            console.log('NO SECTION');
        }
    }

}
// Ställer in och återställer Prissorteraren
async function priceSortActive(){
    sortedClicked = true;
    sortedAsc = false;

    
}

async function priceSortAsc(){
    sortedAsc = true;
    sortedClicked = false;

   
}


async function customMenu() {
    // Tar bort allergier
    allergyChecker();
    //Nollställer sektions!
    sides = [];
    desert = [];
    main = [];
    starters = [];
    
    //hämtar element
    let refreshStarters = document.querySelector('.upper-inner');
    let refreshMains = document.querySelector('.full-courses');
    let refreshDesert = document.querySelector('.desert');

    //Delar upp i sektioner
    sectionDivider();

    //Kollar vilken av prisSorteraren som ska aktiveras!
    await sorterWhichOne();
   
   // Kollar om content redan är aktivt.
    if(alreadyDisplayed){
        //Återställ content, annars dubbleras den.
        refreshDesert.replaceChildren();
        refreshStarters.replaceChildren();
        refreshMains.replaceChildren();
        displayMenu();
  
    }else{
     displayMenu(); 
    }
}

function priceSorter() {
    
  let sorter;
  sorter = courses.sort((a,b) => (a.price) > b.price ? 1 :-1);  
}

function priceSorterAsc(){
   let sorter;
   sorter = courses.sort((b,a) => (b.price) > a.price ? -1 :1 );
}
async function sorterWhichOne(){
    if(sortedClicked){
        priceSorter();
    }else if(sortedAsc){
        priceSorterAsc();
    }
    else{
        return console.log();
    }
}

// Bygger content i HTML
async function displayMenu(){
 
   
   // Sätter boolena att användaren redan använt menyn.
    alreadyDisplayed = true;

     //Hämtar div
    let starterCourses = document.querySelector('.upper-inner');
    
   
    //Grund ul:lr
    let starterList = document.createElement('ul');
    

    
  
    // Loopar igenom alla maträtter i starters
    for(const item in starters){
        //Skapar grund listor!
        var listRubric = document.createElement('li');
        var listDesc = document.createElement('li');
        var listAllergy = document.createElement('li');
        var listPrice = document.createElement('li');


        listRubric.innerHTML = `${starters[item].titel}`;
        listDesc.innerHTML = `${starters[item].desc}`;
        listAllergy.innerHTML = `${starters[item].allergy}`;
        listPrice.innerHTML = `${starters[item].price} kr`;


        // Tilldelar CCS-klasser
        listRubric.classList = 'course-rubric';
        listDesc.classList = 'course-desc';
        listAllergy.classList = 'course-allergies';
        listPrice.classList = 'course-price';

        starterList.appendChild(listRubric);
        starterList.appendChild(listDesc);
        starterList.appendChild(listAllergy);
        starterList.appendChild(listPrice);

    }
    //Slutligen sänder till hemsidan
    starterCourses.appendChild(starterList);



    let mainCourses = document.querySelector('.full-courses');

    let mainList = document.createElement('ul');

    // Loopar igenom alla huvudrätter
    for(const item in main){
        var listRubric = document.createElement('li');
        var listDesc = document.createElement('li');
        var listAllergy = document.createElement('li');
        var listPrice = document.createElement('li');


        listRubric.innerHTML = `${main[item].titel}`;
        listDesc.innerHTML = `${main[item].desc}`;
        listAllergy.innerHTML = `${main[item].allergy}`;
        listPrice.innerHTML = `${main[item].price} kr`;


        // Tilldelar CCS-klasser
        listRubric.classList = 'course-rubric';
        listDesc.classList = 'course-desc';
        listAllergy.classList = 'course-allergies';
        listPrice.classList = 'course-price';

        mainList.appendChild(listRubric);
        mainList.appendChild(listDesc);
        mainList.appendChild(listAllergy);
        mainList.appendChild(listPrice);
    }
   //Slutligen sänder till hemsidan
    mainCourses.appendChild(mainList);



    let desertCourses = document.querySelector('.desert');

    let desertList = document.createElement('ul');


    // Loopar igenom alla eftersätter.
    for(const item in desert){
        var listRubric = document.createElement('li');
        var listDesc = document.createElement('li');
        var listAllergy = document.createElement('li');
        var listPrice = document.createElement('li');


        listRubric.innerHTML = `${desert[item].titel}`;
        listDesc.innerHTML = `${desert[item].desc}`;
        listAllergy.innerHTML = `${desert[item].allergy}`;
        listPrice.innerHTML = `${desert[item].price} kr`;



      

        // Tilldelar CCS-klasser
        listRubric.classList = 'course-rubric';
        listDesc.classList = 'course-desc';
        listAllergy.classList = 'course-allergies';
        listPrice.classList = 'course-price';

        desertList.appendChild(listRubric);
        desertList.appendChild(listDesc);
        desertList.appendChild(listAllergy);
        desertList.appendChild(listPrice);
    }
   //Slutligen sänder till hemsidan
    desertCourses.appendChild(desertList);
}



