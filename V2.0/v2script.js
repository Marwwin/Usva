import anime from './node_modules/animejs/lib/anime.es.js';

var pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// SPLASH PAGE

// Set logo and slogan to the right places  
let logo = document.getElementById("logo");
let sloganContainer = document.getElementById("slogan-container");
let serviceContainer = document.getElementById("service-container");
let bio = document.getElementById("bio-container");
let servicesBox = document.getElementsByClassName("services-box");

logo.style.top = pageHeight / 4 + "px";
sloganContainer.style.top = pageHeight / 2 + "px";
serviceContainer.style.top = pageHeight / 2 + "px";
bio.style.top = pageHeight * 0.5 + "px";
for(let i = 0; i<servicesBox.length;i++){
    console.log("whoppee");
servicesBox[i].style.height = pageHeight /2+"px";
servicesBox[i].style.width = pageWidth /2+"px";
}
// Scroll the user to the top of the page on reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
// On window load add the navbar and add all necessary eventlisteners
window.addEventListener("load", (function () {
    setTimeout(() => {

        // Get logo size
        let logoSize = document.getElementById("logo").offsetWidth;
        anime.set(".person",{opacity:0});
        // Wrap every letter in a span
        var textWrapper1 = document.querySelector('#slogan1');
        textWrapper1.innerHTML = textWrapper1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        var textWrapper2 = document.querySelector('#slogan2');
        textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


        var tl = anime.timeline({
            easing: 'linear',
            duration: 1500
        })
            .add({
                targets: "#loading-screen",
                opacity: 0
            })
            .add({
                targets: "#logo",
                width: [logoSize / 2, logoSize],
                easing: "easeOutBack",
                duration: 2000

            }, '-=500')
            .add({
                targets: "#logo",
                opacity: [0, 1],
            }, '-=2000')
            .add({
                begin: function () {
                    sloganContainer.style.opacity = 1;
                },
                targets: "#slogan1 .letter",
                opacity: [0, 1],
                easing: "easeInOutQuad",
                delay: anime.stagger(50)
            }, '-=1000')
            .add({
                targets: "#slogan2 .letter",
                opacity: [0, 1],
                easing: "easeInOutQuad",
                delay: anime.stagger(50),
                
            }, '-=2000')
    }, 500);
}));


// SCROLL ANIMATION

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

// Remove background image on scrolling

var scrollAnimation = anime({
    targets: '#overlay',
    opacity: 0,
    easing: 'linear',
    autoplay: false
});

var showPerson = anime({
   
        targets: '.person',
        opacity:  [0,1],
        autoplay:false,
        duration:1000,
        easing: 'linear',
        
    });
var hidePerson = anime({
        targets: '.person',
        duration: 1000,
        easing: 'linear',
        opacity:  [1,0],
        autoplay: false,
    });
    


// Scoll eventlistener
window.addEventListener('scroll', () => {
    //const persentage = getScrollPercent();
    scrollAnimation.seek(scrollAnimation.duration * (window.scrollY / (pageHeight / 2)));
    console.log("scrollY"+ window.scrollY + " "+ ( (hidePerson.duration * ((window.scrollY - pageHeight / 2) / (pageHeight / 2)))-580 ));
    console.log((window.scrollY / (pageHeight * 0.8)) );

    if ( window.scrollY <pageHeight * 0.8) {
    showPerson.seek(showPerson.duration * (window.scrollY / (pageHeight * 0.8) ));
    }
    // When bios start fading out adjust the last value 
    else if((window.scrollY / (pageHeight * 0.8)) > 1){
        console.log("JOU JOU");
        hidePerson.seek((hidePerson.duration * ((window.scrollY - pageHeight / 2) / (pageHeight / 2)))-600 );
    }
});



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



