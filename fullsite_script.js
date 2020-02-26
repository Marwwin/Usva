import anime from './node_modules/animejs/lib/anime.es.js';

/////////////////////
// Intro Animation //
/////////////////////


var introanimation = anime({
    targets: document.getElementById("overlay-inner"),
    opacity: 0.5,
    duration: 3000,
    easing: "linear",
    loop: true,
    direction: "alternate"
})

window.addEventListener("load", getnavbar);

let overlay = document.getElementById("overlay");
let underover = document.getElementById("underoverlay");
let overlay2 = document.getElementById("overlay2");
let overlayInner = document.getElementById("overlay-inner");
let logo = document.getElementById("logo-container");
let logo2 = document.getElementById("loading-logo");
let logotext = document.getElementById("loading-text");
console.log(logo.offsetLeft + " " + logo.offsetTop);
console.log(logo2.offsetLeft + " " + logo2.offsetTop);

window.addEventListener("load", (function () {
    setTimeout(() => {

        let logowidth = logo.offsetWidth;
        let logowidth2 = logowidth * 2;
        // Get the distance from top of page to the 2 logos
        let logoDistanceToTop = window.pageYOffset + logo.getBoundingClientRect().top
        let overlayDistanceToTop = window.pageYOffset + overlayInner.getBoundingClientRect().top
        console.log("logo" + logoDistanceToTop);
        console.log("overlay" + overlayDistanceToTop);
        let logoTopDiff = (logoDistanceToTop - overlayDistanceToTop);

        let dur = 1000;
        var timeline = anime.timeline({
            duration: 1000
        });

        timeline.add({
            targets: logotext,
            opacity: 0,
            easing: 'linear',
            duration: 500
        });
        timeline.add({
            targets: logo2,
            width: logowidth2,
            duration: 1000,
            easing: 'easeOutBack'
        }, '-=600');
        timeline.add({
            targets: logo2,
            duration: 500,
            opacity: 1,
            easing: 'easeInCubic'
        }, '-=900');
        timeline.add({
            targets: overlayInner,
            top: logoTopDiff,
        }, '-=3000');
        timeline.add({
            targets: logo2,
            width: logowidth,
            //opacity: 0,
            duration: 750,
            easing: 'easeInBack',
            complete: function () {
                anime.set(logo2, { width: logowidth });
            }
        }, '+=0');
        timeline.add({
            targets: underover,
            duration: 800,
            opacity: 0,
            easing: 'easeOutQuart',
        }, '-=200');
        timeline.add({
            targets: overlay3,
            opacity: 0,
            delay: 1000,
            duration: dur,
            easing: 'easeOutQuart',
        }, '+=0')
        timeline.add({
            targets: overlay4,
            opacity: 0,
            delay: 1000,
            duration: dur,
            easing: 'easeOutQuart',
        }, '+=0')
        timeline.add({
            targets: overlay5,
            opacity: 0,
            delay: 1000,
            duration: dur,
            easing: 'easeOutQuart',
        }, '+=0')
        timeline.add({
            targets: overlay2, overlayInner,
            opacity: 0,
            delay: 600,
            duration: 1200,
            easing: 'linear',
            complete: function () {
                introanimation.pause();
                document.getElementById("overlay").style.display = 'none';
                document.getElementById("underoverlay").style.display = 'none';
                document.getElementById("overlay2").style.display = 'none';
                document.getElementById("overlay3").style.display = 'none';
                document.getElementById("overlay4").style.display = 'none';
                document.getElementById("overlay5").style.display = 'none';
            }
        });
    }, 500);
}));


////////////
// NavBar //
////////////

// Get width of browser
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var widthOfPage = document.getElementById("home").offsetWidth;
//fix bug with small screens if element too big and needs to be pushed further away
if (width < widthOfPage)
    width = widthOfPage + 300;
else width = width + 300;

function getnavbar() {
    // Add navbar to page
    document.getElementById("navbar").innerHTML = '<li><div id="nav_home" >HOME</div></li><li><div id="nav_services" >SERVICES</div></li> <li><div id="nav_works" >WORKS</div></li><li class="behind"><div id="nav_behind" >BEHIND THE SCENES</div></li><li class="contact"><div id="nav_contact" >CONTACT</a></li>';
    console.log("bong2");
    // Add eventlisteners to each navbar button
    let temparray = document.getElementById("navbar").querySelectorAll("div");

    temparray.forEach(function (item) {
        item.addEventListener("click", animetest);
    });
    console.log("WHOOP");
    document.getElementById("nav_home").addEventListener("click", function () {
        let logo = document.getElementById("logo-container");
        let logo2 = document.getElementById("loading-logo");
        console.log(logo.offsetLeft + " " + logo.offsetTop);
        console.log(logo2.offsetLeft + " " + logo2.offsetTop);
    })

    // Hide each page 
    let array = document.getElementById("page-container").querySelectorAll("section");
    array.forEach(function (item) {
        if (item.id != "home") item.style.left = "-" + width + "px";


    })
}

// Variabel for storing which page is showing right now
var currentPage = "home";

// Function for changing pages when a navbar item is clicked
function animetest() {

    // Get which button was pressed and change format from ex. 'nav_home' to 'home'
    let clicked = this.id;
    let page = clicked.replace("nav_", "");
    console.log("bing");
    if (page != currentPage) {

        var target = document.getElementById(page);
        let previousTarget = document.getElementById(currentPage);


        var tl = anime.timeline({
            duration: 250,
        })
        tl.add({
            targets: previousTarget,
            translateX: width,
            easing: "easeInSine",
            complete: function (anim) {
                previousTarget.style = "left: -" + width + "px";
            }
        });
        tl.add({
            targets: target,
            translateX: width,
            easing: 'easeOutCirc',
            complete: function (anim) {
                target.style = "left:";
            }
        }, '-=200');

        currentPage = page;
    }
}

var eventtt;

/////////////////////////
// Production Services //
/////////////////////////

var clicked;
var tempwidth;
var services = document.getElementsByClassName("services-box");
console.log(services);

for (let i = 0; i < services.length; i++) {
    services[i].addEventListener("click", function () {
        if (!clicked) {
            clicked = true;
            tempwidth = document.getElementById("sequence").offsetWidth;
            var notClicked = [];
            var texts = [];

            for (let i = 0; i < services.length; i++) {
                if (event.currentTarget.id != services[i].id) {
                    notClicked.push(services[i]);
                    console.log(texts[i]);
                    texts.push(services[i].getElementsByClassName("serv-text"));
                    
                }
            }
            

            eventtt = event.currentTarget.id;
            var clickedWidth2 = tempwidth * 2;
            console.log("tempw: " + tempwidth + " event: " + eventtt);
            var timeline = anime.timeline({
                duration: 500
            });

            timeline.add({
                targets: event.currentTarget,
                duration: 500,
                width: clickedWidth2,
                height: clickedWidth2,
                easing: 'linear',
                begin: function () {
                    
                    for (let i = 0; i < texts.length; i++) {
                        console.log("woo"+texts[i]);
                        texts[i].display = "none";
                    }
                },
                complete: function (anim) {
                    var l = anim.animatables[0].target;
                    l.addEventListener('mouseleave', mousel);
                }
            });
            timeline.add({
                targets: notClicked,
                duration: 500,
                width: 0,
                height: 0,
                easing: 'linear'
            }, '-=500');
            /*timeline.add({
                targets: '.serv-text',
                duration: 100,
                opacity:0,
                easing: 'linear',
                complete: function(){
                    //anime.set('.serv-text',width, 0);
                    console.log("serv-text 0");
                }
            },'-=1000');*/

        }
    });
}

function mousel() {
    clicked = false;
    var tl = anime.timeline({
        duration: 500
    });

    tl.add({
        targets: '.services-box',
        width: tempwidth,
        height: tempwidth,
        easing: 'linear',
        begin: function(){

        }
    });
    removel();
}

function removel() {
    var t = document.getElementsByClassName("service-box");
    for (let i = 0; i < t.length; i++) {
        t[i].removeEventListener('mouseleave', mousel);
        console.log("whoo");
    }
}