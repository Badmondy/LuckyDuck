/* Kod för menyn*/

//toggle funktion för ta bort fiskrätter
$("#fish").on("click", function(){
    $(".fisk").slideToggle();
});

//toggle funktion för ta bort kötträtter
$("#kött").on("click", function(){
    $(".kött").slideToggle();
});
//funtion för nötter
$("#nuts").on("click", function(){
    $(".nötter").slideToggle();
});
//gluten
$("#gluten").on("click", function(){
    $(".gluten").slideToggle();
});
//laktos
$("#lactose").on("click", function(){
    $(".laktos").slideToggle();
});