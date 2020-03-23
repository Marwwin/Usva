
//var rellax = new Rellax('.rellax');

// GLOBAL VARIABLES
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
var s3 = document.getElementById("s3");


// Set dimensions and position of elements
function reSize() {
    console.log("whoop");
    pageWidth = window.innerWidth;
    pageHeight = window.innerHeight;
    document.getElementById("background").style.height = pageHeight + "px";
    document.getElementById("background").style.width = pageWidth + "px";


    makeRect();
   
    let header = document.getElementById("header");
    header.style.left = pageWidth - (header.offsetWidth * 1.5) + "px";
    header.style.top = (pageHeight / 2) - header.offsetHeight + "px";

  /*  let slide = document.getElementById("service-slide");
    console.log("slide" + slide);
    slide.style.top = (s3.offsetTop + s3.offsetHeight - slide.offsetHeight) + "px";
}*/}

window.addEventListener('resize', reSize);
window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

function makeRect(){
    let rect = document.getElementsByClassName("card-rect");
    let images = document.getElementsByClassName("card-image");
    for(let  i=0;i<rect.length;i++){
        let tempcard = rect[i].parentElement;
        rect[i].style.height = images[i].offsetHeight * 1.3 + "px";
        rect[i].style.width = (tempcard.offsetWidth - (images[i].offsetWidth /2)) + "px";
        if(i == 1 || i == 3) {
        rect[i].style.right = (pageWidth- (tempcard.offsetLeft + tempcard.offsetWidth)) + "px";
    }
    }
}


function navEventListener() {
    document.getElementById("nav-home").addEventListener("click", function () {
        document.querySelector("#s1").scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("nav-about").addEventListener("click", function () {
        document.querySelector("#s2").scrollIntoView({ behavior: "smooth" });

        // This fixes a bug where the parallaxbackground not reseted to 1 when using navbar link from s3
        setTimeout(() => {
            document.getElementById("parallax-background").style.opacity = 1;
        }, 100);
    });
    document.getElementById("nav-services").addEventListener("click", function () {
        document.querySelector("#s3").scrollIntoView({ behavior: "smooth" });
    });

}

// NAVBAR ANIMATIONS

var dots = document.getElementsByClassName("dot");
console.log(dots);
var navtext1 = document.querySelector('#home-text');
navtext1.innerHTML = navtext1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
var navtext2 = document.querySelector('#about-text');
navtext2.innerHTML = navtext2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
var navtext3 = document.querySelector('#services-text');
navtext3.innerHTML = navtext3.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("mouseover", function () {
        let liName = event.target.previousElementSibling;
        let letters = liName.getElementsByClassName("letter");
        anime({
            targets: letters,
            opacity: 1,
            easing: 'easeInOutQuad',
            duration: 500,
            delay: anime.stagger(70)
        })

    });
    dots[i].addEventListener("mouseleave", function () {
        let liName = event.target.previousElementSibling;
        let letters = liName.getElementsByClassName("letter");
        anime({
            targets: letters,
            opacity: 0,
            easing: 'easeInOutQuad',
            duration: 500,
            delay: anime.stagger(70)

        })

    });
}


window.addEventListener("load", (function () {
    setTimeout(() => {
        reSize();
        // Set slogan at bottom of screen
        let sloganContainer = document.getElementById("slogan-container");
        sloganContainer.style.top = (pageHeight - sloganContainer.offsetTop - sloganContainer.offsetHeight) + "px";

        window.scrollTo(0, 0);

        navEventListener();

        //let logo = document.getElementById("logo");        
        let logoSize = document.getElementById("logo").offsetWidth;
        //logo.style.top = pageHeight / 4 + "px";
        //logo.style.left = pageWidth / 4 + "px";

        // Wrap every letter of slogan in a span
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
            .add({
                targets: '#header',
                opacity: 1,
                easing: 'linear'
            }, '-=1000')
    }, 500);
}));

// Scrolling Animations
// Remove background image on scrolling

var scrollAnimation = anime({
    targets: '#background',
    opacity: 0,
    easing: 'linear',
    autoplay: false
});
/*
var showPerson = anime({

    targets: '.person',
    opacity: [0, 1],
    autoplay: false,
    duration: 1000,
    easing: 'linear',

});
var hidePerson = anime({
    targets: '.person',
    duration: 1000,
    easing: 'linear',
    opacity: [1, 0],
    autoplay: false,
});
*/

var moveServiceText = anime({
    targets: '#service-text',
    duration: 1000,
    easing: 'easeInQuad',
    top: -s3.offsetTop,
    opacity: 0,
    autoplay: false,
});

var showServices = anime({
    targets: '.service-overlay',
    duration: 1000,
    easing: 'linear',
    opacity: 0,
    autoplay: false,
});
var hideS2Background = anime({
    targets: '#parallax-background',
    duration: 1000,
    easing: 'linear',
    opacity: 0,
    autoplay: false,
});


// Scoll eventlistener
window.addEventListener('scroll', () => {

    let serviceOverlay = document.getElementById("service-overlay");
    if (window.scrollY < pageHeight) {
        scrollAnimation.seek(scrollAnimation.duration * (window.scrollY / (pageHeight / 1.5)));
    }
    if (window.scrollY < (s3.offsetTop - pageHeight / 3) && serviceOverlay.style.opacity < 1) {
        serviceOverlay.style.opacity = 1;
    }
    if (window.scrollY > (s3.offsetTop - pageHeight / 3)) {
        showServices.seek(showServices.duration * ((window.scrollY - (s3.offsetTop - pageHeight / 3)) / (s3.offsetTop - (s3.offsetTop - pageHeight / 3))));
        moveServiceText.seek(moveServiceText.duration * ((window.scrollY - (s3.offsetTop - pageHeight / 3)) / (s3.offsetTop - (s3.offsetTop - pageHeight / 3))));
        hideS2Background.seek(showServices.duration * ((window.scrollY - (s3.offsetTop - pageHeight / 3)) / (s3.offsetTop - (s3.offsetTop - pageHeight / 3))));


    }
})


    /*if (window.scrollY < pageHeight * 0.8) {
          showPerson.seek(showPerson.duration * (window.scrollY / (pageHeight * 0.8)));
      }
      // When bios start fading out adjust the last value 
      else if ((window.scrollY / (pageHeight * 0.8)) > 1) {
          hidePerson.seek((hidePerson.duration * ((window.scrollY - pageHeight / 2) / (pageHeight / 2))) - 600);
      }


});


function fadeOut(array) {
    anime({
        targets: array,
        opacity: 0,
        easing: 'linear'
    })
}
/*
let slideButtons = document.getElementsByClassName("slide-button");
console.log(slideButtons);
for (let i = 0; i < 4; i++) {
    slideButtons[i].addEventListener('click', function () {
        let slideToGoTo = event.target.parentNode.id;
        let services = document.getElementsByClassName("services");
        let notClicked = [];
        for (let i = 0; i < services.length; i++) {
            if (!slideToGoTo.includes(services[i].id)) {
                notClicked.push(services[i]);
            }
        }

        fadeOut(notClicked);

        switch (slideToGoTo) {
            case "sequence-slide":
                anime({
                    targets: "#sequence",
                    opacity: 1,
                    easing: 'linear'
                });
                break;
            case "global-slide":
                anime({
                    targets: "#global",
                    opacity: 1,
                    easing: 'linear'
                });
                break;
            case "equipment-slide":
                anime({
                    targets: "#equipment",
                    opacity: 1,
                    easing: 'linear'
                });
                break;
            case "archive-slide":
                anime({
                    targets: "#archive",
                    opacity: 1,
                    easing: 'linear'
                });
                break;

        }
    });
    slideButtons[i].addEventListener('mouseover', function(){
        let liName = event.target.parentNode.id;
        let nameDisplay = document.getElementById("display-slide");

        switch (liName) {
            case "sequence-slide":
                nameDisplay.innerHTML = "SEQUENCE";
                anime({
                    targets: "#display-slide",
                    opacity: 1,
                    easing: 'linear'
                });
            
    }});

*/
