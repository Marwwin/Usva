import $ from "jquery";
window.addEventListener("load", getnavbar);

function getnavbar() {
    console.log("what");
  //  document.getElementById("navbar").innerHTML = '<li><div id="nav_home" >HOME</div></li><li><div id="nav_services" >SERVICES</div></li> <li><div id="nav_works" >WORKS</div></li><li><div id="nav_behind" >BEHIND THE SCENES</div></li><li class="contact"><div id="nav_contact" >CONTACT</a></li>';
    $("navbar").text('<li><div id="nav_home" >HOME</div></li><li><div id="nav_services" >SERVICES</div></li> <li><div id="nav_works" >WORKS</div></li><li><div id="nav_behind" >BEHIND THE SCENES</div></li><li class="contact"><div id="nav_contact" >CONTACT</a></li>');
    /*   document.getElementById("nav_home").addEventListener("click", animetest);
    document.getElementById("nav_contact").addEventListener("click", animetest);
    document.getElementById("nav_services").addEventListener("click", animetest);
    document.getElementById("nav_works").addEventListener("click", animetest);
    document.getElementById("nav_behind").addEventListener("click", animetest);*/
}

/*function animetest(){
    page = "";
    let clicked = this.id;
    page = clicked.replace("nav_","");
    var target = document.getElementById(page)

   /* anime({
        targets: target,
        translateX: 500
    });
}*/
//import anime from 'animejs/lib/anime.es.js';
function clearView(item, index) {
    
    item.classList.remove("hiddenright");
   // item.style.display = 'none';
}

function showPage(name){
    document.getElementById(name).addEventListener("transitionend", hidePage)
    document.getElementById(name).classList.remove("hidden");
    document.getElementById(name).style.display = 'flex';
}

function hidePage(){
    console.log("page hidden wpassing side");
    this.style.display = "none";
    this.classList.add("hidden");
    this.classList.add("hide");
    this.classList.remove("hiddenright");
    this.removeEventListener("transistionend",hidePage);

}
var currentPage = "home";
var page;
function changePage() {

    let testarray = document.getElementById("page-container").querySelectorAll('section');
    testarray.forEach(clearView);

    page = "";
    let clicked = this.id;
    page = clicked.replace("nav_","");
    if(currentPage != null)  {  
    document.getElementById(currentPage).classList.add("hiddenright");
    document.getElementById(page).style.display = "flex";
    document.getElementById(page).classList.remove("hidden");
    document.getElementById(page).classList.remove("hide");
    document.getElementById(currentPage).addEventListener("transitionend", hidePage);

}
    
    
    



    // Remove the current view
    

    
    currentPage = page;
   

}
