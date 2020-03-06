import anime from './node_modules/animejs/lib/anime.es.js';

// Scroll the user to the top of the page on reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

/////////////////////
// Intro Animation //
/////////////////////

// Logo pulsating animation
var introanimation = anime({
    targets: document.getElementById("overlay-inner"),
    opacity: 0.5,
    duration: 3000,
    easing: "linear",
    loop: true,
    direction: "alternate"
})

// On window load add the navbar and add all necessary eventlisteners
window.addEventListener("load", getnavbar);


// Get all elements for introanimation
var underover = document.getElementById("underoverlay");
var overlay2 = document.getElementById("overlay2");
var overlayInner = document.getElementById("overlay-inner");
var logo = document.getElementById("logo-container");
var logo2 = document.getElementById("loading-logo");
var logotext = document.getElementById("loading-text");

// when loaded run intro animation
window.addEventListener("load", (function () {
    setTimeout(() => {

        let logowidth = logo.offsetWidth;
        // Get the distance from top of page to the 2 logos
        let logoDistanceToTop = window.pageYOffset + logo.getBoundingClientRect().top
        let overlayDistanceToTop = window.pageYOffset + overlayInner.getBoundingClientRect().top
        let logoTopDiff = (logoDistanceToTop - overlayDistanceToTop);
        let dur = 1000;



        // TIMELINE FOR INTRO ANIMATION
        var timeline = anime.timeline({
            duration: 1000
        });

        timeline.add({
            targets: logotext,
            opacity: 0,
            easing: 'linear',
            duration: 500,
            begin: function () {
                disableScroll();
            }
        });
        timeline.add({
            targets: logo2,
            width: logowidth * 2,
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
            easing: 'easeOutQuart',
        }, '+=0')
        timeline.add({
            targets: overlay4,
            opacity: 0,
            delay: 1000,
            easing: 'easeOutQuart',
        }, '+=0')
        timeline.add({
            targets: overlay5,
            opacity: 0,
            delay: 1000,
            easing: 'easeOutQuart',
        }, '+=0')
        timeline.add({
            targets: overlay2, overlayInner,
            opacity: 0,
            delay: 600,
            duration: 1200,
            easing: 'linear',
            complete: function () {
                // When animation finished set all overlay windows to none and enablescroll 
                introanimation.pause();
                document.getElementById("overlay").style.display = 'none';
                document.getElementById("underoverlay").style.display = 'none';
                document.getElementById("overlay2").style.display = 'none';
                document.getElementById("overlay3").style.display = 'none';
                document.getElementById("overlay4").style.display = 'none';
                document.getElementById("overlay5").style.display = 'none';
                enableScroll();
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

// These lines are pretty useless, tried to fix a bug, this only fixes some use cases
if (width < widthOfPage)
    width = widthOfPage + 300;
else width = width + 300;


//Variables for navbar
var navbarHeight;
var smallNavHeight;
var smallNav = document.getElementById("small_nav");
var navbar = document.getElementById("navbar");

function getnavbar() {
    // Add navbar to page
    document.getElementById("navbar").innerHTML = '<li><div id="nav_home" >HOME</div></li><li><div id="nav_services" >SERVICES</div></li> <li><div id="nav_works" >WORKS</div></li><li class="behind"><div id="nav_behind" >BEHIND THE SCENES</div></li><li class="contact"><div id="nav_contact" >CONTACT</a></li>';
    // Add eventlisteners to each navbar button
    let temparray = document.getElementById("navbar").querySelectorAll("div");

    temparray.forEach(function (item) {
        item.addEventListener("click", animetest);
    });

    // Hide each page 
    let array = document.getElementById("page-container").querySelectorAll("section");
    array.forEach(function (item) {
        if (item.id != "home") item.style.left = "-" + width + "px";
    });

    // TODO: fix this shit the animation works.. but the links and stuff broken
    var x = window.matchMedia("(max-width: 720px)");
    if (x.matches) {
        navbarHeight = navbar.offsetHeight;
        smallNavHeight = smallNav.offsetHeight;
        let neg = -navbarHeight

        anime.set(head, { top: neg, height: smallNavHeight });
    }
    document.getElementById("small_temp").addEventListener('click', mobileNavBar);
    document.getElementById("small_nav").addEventListener('click', mobileNavBar);
}


// Add Mobile navbar to page
function mobileNavBar() {
    var head = document.getElementById("head");
    anime.set(head, { top: 0 });

    let smallHeight;

    var tl = anime.timeline({
        duration: 500,
    });
    tl.add({
        targets: smallNav,
        left: smallNav.offsetWidth,
        duration: 500,
        begin: function () {
            navbar.addEventListener("mouseleave", removeNavbarEvent);
        }
    });
    tl.add({
        targets: head,
        height: navbarHeight,
        top: 0,
        duration: 100,
        easing: 'linear'
    }, '-=400');
    tl.add({
        targets: navbar,
        height: navbarHeight,
        opacity: 1,
        easing: 'linear',
        top: 0,
    }, '-=100');
}

// End animations and remove eventlistener
function removeNavbarEvent() {

    var tl = anime.timeline({
        duration: 500
    });
    tl.add({
        targets: head,
        top: -navbarHeight,
        height: smallNavHeight
    });
    tl.add({
        targets: smallNav,
        left: 0
    }, '-=300');

    navbar.removeEventListener("mouseleave", removeNavbarEvent);
}

// Variabel for storing which page is showing right now
var currentPage = "home";

// Function for changing pages when a navbar item is clicked
function animetest() {

    // Get which button was pressed and change format from ex. 'nav_home' to 'home'
    let clicked = this.id;
    let page = clicked.replace("nav_", "");
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


/////////////////////////
// Production Services //
/////////////////////////
var theID
var clicked;
var tempwidth;
var tt = [];
var t = [];
var services = document.getElementsByClassName("services-box");

for (let i = 0; i < services.length; i++) {
    services[i].addEventListener("click", function () {

        // This if fixes so that you can't click multiple windows at the same time
        if (!clicked) {
            clicked = true;
            theID = event.currentTarget.id;
            console.log(theID);
            tempwidth = document.getElementById("sequence").offsetWidth;
            var notClicked = [];
            var texts = document.getElementsByClassName("serv-text");
            var headtext = document.getElementsByClassName("head-text");

            for (let i = 0; i < texts.length; i++) {
                texts[i].style.opacity = 0;
                texts[i].style.display = "none";
            }

            for (let i = 0; i < services.length; i++) {
                if (event.currentTarget.id != services[i].id) {
                    notClicked.push(services[i]);
                }
                // TODO: REMOVE THIS IF AND JUST REMOVE ALL TEXT WHEN ELEMENT CLICKED
                if (event.currentTarget.id != texts[i].parentNode.id) {
                    tt.push(texts[i]);
                }
            }

            var clickedWidth2 = tempwidth * 2;
            var timeline = anime.timeline({
                duration: 500
            });




            timeline.add({
                targets: event.currentTarget,
                duration: 500,
                width: tempwidth * 2,
                height: tempwidth * 2,
                easing: 'easeInSine',
                begin: function () {

                    // TODO: CHANGE THIS STUFF INTO JUST DISPLAYING ONE BLOCK
                    //		 WITH ALL TEXT INSTEAD OF JUST DISPLAYING ALL P ELEMENTS
                    console.log(theID);
                    document.getElementById(theID + "-text").style.display = "flex";
                    // let temppe = document.getElementById(theID).getElementsByTagName("p");
                    for (let i = 0; i < tt.length; i++) {
                        tt[i].style.opacity = 0;
                        tt[i].style.display = "none";
                    }
                    /* for (let i = 0; i < temppe.length; i++) {
                         temppe[i].style.display = "inline";
                         t.push(temppe[i]);
                     }*/
                },
                // Add eventlistener to return clicked item to original size on mouseleave
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
                easing: 'easeOutSine'
            }, '-=500');
            timeline.add({
                targets: "#" + theID + "-text",
                opacity: 1,
                easing: "linear"
            });
        }
    });
}

// Function for when the mouse leaves the expanded image
function mousel() {

    // Animation for returning box to original size
    anime({
        targets: '.services-box',
        width: tempwidth,
        height: tempwidth,
        duration: 500,
        easing: 'easeInSine',
        begin: function () {

            console.log("theid" + theID);
            let shownText = document.getElementById(theID + "-text");
            shownText.style.opacity = 0;
            shownText.style.display = "none";
            /*let theh3 = shownText.getElementsByTagName("h3");
            console.log(theh3);
            theh3[0].style.display = "initial";*/

            let ttt = document.getElementsByClassName("serv-text");
            console.log(ttt);


            // Show the texts on images again and empty the tt array
            for (let i = 0; i < ttt.length; i++) {
                ttt[i].style.display = "initial";
                tt.pop();
            }
            /*for (let i = t.length; i > 0; i--) {
                t[i - 1].style.display = "none";
                t.pop();
            }*/
        },
        complete: function () {

            anime({
                targets: ".serv-text",
                opacity: 1,
                easing: 'linear',
                duration: 500
            });
        }
    });
    //Remove eventlistener
    removel();
}

// Remove eventlistener when the animation is complete
function removel() {
    clicked = false;
    var t = document.getElementsByClassName("services-box");
    for (let i = 0; i < t.length; i++) {
        t[i].removeEventListener('mouseleave', mousel);
    }
}

// THESE FUNCTIONS PREVENTS/ENABLES SCROLLING ON THE P
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}