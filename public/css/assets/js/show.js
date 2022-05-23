var check = document.getElementById("check");
var show = document.getElementById("show");
var closeMe = document.getElementById("close");

console.log(show);
// This function Show the menu
check.addEventListener("click", () => {
    show.classList.remove("show");

});
// THis function hidden the menu 
closeMe.addEventListener("click", () => {
    show.classList.add("show");

});
// when click outside the form
/*window.addEventListener("click", (e) => {
    e.target == modal ? show.classList.add("show") : false;

})*/