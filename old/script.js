window.addEventListener("load", getnavbar);
function getnavbar() {
    document.getElementById("navbar").innerHTML = '<li><a href="./index.html" >HOME</a></li><li><a href="./services.html" >SERVICES</a></li> <li><a href="./works.html" >WORKS</a></li><li><a href="./behind.html" >BEHIND THE SCENES</a></li><li class="contact"><a href="./contact.html" >CONTACT</a></li>';
}
