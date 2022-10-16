// ARRAY för att spara response
let courses = [];

// Array, för klickade allergier
let restrictAllergies = [];

// Array, för allergier som ska tas bort från menyn.
let toVanish = [];

// Denier
let alreadyDisplayed = false;
let isActive = false;
//Olika meny sektioner 
let starters = [];
let starters2 = [];
let main = [];
let sides = [];
let desert = [];

// Knapp Din egna menu
const customBtn = document.querySelector('#custom-Btn');

// ON load

window.onload = async function() {
   await readJson();
   customMenu();
    
}

// Hämtar element
const nutsBtn = document.getElementById('nuts');
const glutenBtn = document.getElementById('gluten');
const fishBtn = document.getElementById('fish');
const soyBtn = document.getElementById('soy');
const lactoseBtn = document.getElementById('lactose');
const backdropYes = document.querySelector('#backdrop-Btn');
const backdropNo = document.querySelector('#removeBackDrop-Btn')
const backdrop = document.querySelector('#backdrop');


const showFullMenu = document.querySelector('#wholeMenu-Btn');



// Standard färger!
const buttonOnClickColor = "rgba(255, 0, 0, 0.585)";
const buttonDefaultColor = "#FFFFFF";


//Event listeners 


// Backdrop-btn
backdropYes.addEventListener('click', function(){
    console.log('yes');
    backdrop.style.display = "none";
    displayMenu();
    
});
backdropNo.addEventListener('click', function(){
    console.log('no');
    backdrop.style.display = "none";
});



customBtn.addEventListener('click', customMenu);

showFullMenu.addEventListener('click', function(){


    window.location.reload();
});

nutsBtn.addEventListener('click',  function () {
    if(!restrictAllergies.includes('nuts')){
        restrictAllergies.push('nuts');
    }
  
    nutsBtn.style.backgroundColor = buttonOnClickColor;

});

glutenBtn.addEventListener('click', function () {
    
    if(!restrictAllergies.includes('gluten')){
        restrictAllergies.push('gluten');
    }
    
    glutenBtn.style.backgroundColor = buttonOnClickColor;
});

fishBtn.addEventListener('click', function () {
    if(!restrictAllergies.includes('fish')){
        restrictAllergies.push('fish');
    }
    
    fishBtn.style.backgroundColor = buttonOnClickColor;
});

soyBtn.addEventListener('click', function () {
    if(!restrictAllergies.includes('soy')){
        restrictAllergies.push('soy');
    }
   
    soyBtn.style.backgroundColor = buttonOnClickColor;
   
});

lactoseBtn.addEventListener('click', function () {
    if(!restrictAllergies.includes('lactose')){
        restrictAllergies.push('lactose');
    }
   
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
function allergyChecker() {
        
        for(const el in courses){
            if(restrictAllergies.some(item => courses[el].allergy.includes(item))) {
                
              toVanish.push(courses[el]);
            } 
    }
     toVanish.forEach(element => {
        let index = courses.indexOf(element);

        courses.splice(index,1);
     })
     restrictAllergies = [];
     toVanish = [];
  
}


       
   
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
        else if(courses[item].section == 'starters2'){
            starters2.push(courses[item]);
        }
        else{
            console.log('NO SECTION');
        }
    }
}



    




async function customMenu() {

 
   

    // Tar bort allergier
   /*  allergyChecker(); */
    
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
    

    

    
    
   
   
    
    // Efter allergier är kollat återställ courses
    
   
    //Återställer färger
   /*  changeToDefualt(); */

}

function clearOldData(){
    let starterDelete = document.querySelector('.upper-inner');
    starterDelete.replaceChildren();
}


function displayMenu(){
    //Hämtar div
   
    alreadyDisplayed = true;
    let starterCourses = document.querySelector('.upper-inner');
    
   
    //Grund ul:lr
    let starterList = document.createElement('ul');
    //Skapar grund listor!

    
  

    for(const item in starters){

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

    starterCourses.appendChild(starterList);



    let mainCourses = document.querySelector('.full-courses');

    let mainList = document.createElement('ul');


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

    mainCourses.appendChild(mainList);



    let desertCourses = document.querySelector('.desert');

    let desertList = document.createElement('ul');

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

    desertCourses.appendChild(desertList);
}



