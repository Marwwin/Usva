// GLOBAL VARIABLES
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
var s3 = document.getElementById("s3");
var s35 = document.getElementById("s3.5");

// Set dimensions and position of elements
function reSize() {
  console.log("whoop");
  pageWidth = window.innerWidth;
  pageHeight = window.innerHeight;
  document.getElementById("background").style.height = pageHeight + "px";
  document.getElementById("background").style.width = pageWidth + "px";

  makeRect();

  let header = document.getElementById("header");
  header.style.left = pageWidth - header.offsetWidth * 1.5 + "px";
  header.style.top = pageHeight / 2 - header.offsetHeight + "px";
}

window.addEventListener("resize", reSize);
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

function makeRect() {
  let rect = document.getElementsByClassName("card-rect");
  let images = document.getElementsByClassName("card-image");
  for (let i = 0; i < rect.length; i++) {
    let tempcard = rect[i].parentElement;
    rect[i].style.height = images[i].offsetHeight * 1.3 + "px";
    rect[i].style.width =
      tempcard.offsetWidth - images[i].offsetWidth / 2 + "px";
    if (i == 1 || i == 3) {
      rect[i].style.right =
        pageWidth - (tempcard.offsetLeft + tempcard.offsetWidth) + "px";
    }
  }
}

/*function navEventListener() {
  document.getElementById("nav-home").addEventListener("click", function() {
    document.querySelector("#s1").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("nav-about").addEventListener("click", function() {
    document.querySelector("#s2").scrollIntoView({ behavior: "smooth" });

    // This fixes a bug where the parallaxbackground not reseted to 1 when using navbar link from s3
    setTimeout(() => {
      document.getElementById("parallax-background").style.opacity = 1;
    }, 100);
  });
  document.getElementById("nav-services").addEventListener("click", function() {
    document.querySelector("#s3").scrollIntoView({ behavior: "smooth" });
  });
}

// NAVBAR ANIMATIONS

var dots = document.getElementsByClassName("dot");
console.log(dots);
var navtext1 = document.querySelector("#home-text");
navtext1.innerHTML = navtext1.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);
var navtext2 = document.querySelector("#about-text");
navtext2.innerHTML = navtext2.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);
var navtext3 = document.querySelector("#services-text");
navtext3.innerHTML = navtext3.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("mouseover", function() {
    let liName = event.target.previousElementSibling;
    let letters = liName.getElementsByClassName("letter");
    anime({
      targets: letters,
      opacity: 1,
      easing: "easeInOutQuad",
      duration: 500,
      delay: anime.stagger(70)
    });
  });
  dots[i].addEventListener("mouseleave", function() {
    let liName = event.target.previousElementSibling;
    let letters = liName.getElementsByClassName("letter");
    anime({
      targets: letters,
      opacity: 0,
      easing: "easeInOutQuad",
      duration: 500,
      delay: anime.stagger(70)
    });
  });
}
*/
window.addEventListener("load", function () {
  window.scrollTo(0, 0);
  setTimeout(() => {
    
    reSize();
    // Set slogan at bottom of screen
    let sloganContainer = document.getElementById("slogan-container");
    sloganContainer.style.top =
      pageHeight - sloganContainer.offsetTop - sloganContainer.offsetHeight + "px";

    let cardImg = document.getElementsByClassName("card-image");
    for (let i = 0; i < cardImg.length; i++) {
      cardImg[i].style.opacity = 0;
    }

    let logoSize = document.getElementById("logo").offsetWidth;
  
    // Wrap every letter of slogan in a span
    var textWrapper1 = document.querySelector("#slogan1");
    textWrapper1.innerHTML = textWrapper1.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    var textWrapper2 = document.querySelector("#slogan2");
    textWrapper2.innerHTML = textWrapper2.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    var tl = anime
      .timeline({
        easing: "linear",
        duration: 1500
      })
      .add({
        targets: "#loading-page",
        opacity: 0,
        duration: 600
      })
      .add(
        {
          targets: "#logo",
          width: [logoSize / 2, logoSize],
          easing: "easeOutBack",
          duration: 2000
        },"+=300")
      .add(
        {
          targets: "#logo",
          opacity: 1
        },
        "-=2000"
      )
      .add(
        {
          begin: function () {
            sloganContainer.style.opacity = 1;
          },
          targets: "#slogan1 .letter",
          opacity: [0, 1],
          easing: "easeInOutQuad",
          delay: anime.stagger(50)
        },
        "-=1000"
      )
      .add(
        {
          targets: "#slogan2 .letter",
          opacity: [0, 1],
          easing: "easeInOutQuad",
          delay: anime.stagger(50)
        },
        "-=2000"
      )
      .add(
        {
          targets: "#header",
          opacity: 1,
          easing: "linear"
        },
        "-=1000"
      );
  }, 500);
});

// Scrolling Animations
// Remove background image on scrolling

var scrollAnimation = anime({
  targets: "#background",
  opacity: 0,
  easing: "linear",
  autoplay: false
});

var moveServiceText = anime({
  targets: "#service-text",
  duration: 1000,
  easing: "easeInQuad",
  top: -s3.offsetTop,
  opacity: 0,
  autoplay: false
});

var hideS2Background = anime({
  targets: "#parallax-background",
  duration: 1000,
  easing: "linear",
  opacity: 0,
  autoplay: false
});

isCard1 = false;
isCard2 = false;
isCard3 = false;
isCard4 = false;

// Scoll eventlistener
window.addEventListener("scroll", () => {

  let card1img = document.getElementById("card1-img");
  let card2img = document.getElementById("card2-img");
  let card3img = document.getElementById("card3-img");
  let card4img = document.getElementById("card4-img");
  console.log(isCard1 +" "+ isCard2 +" "+ isCard3 +" "+ isCard4 +" " )
  if (window.scrollY > card1img.offsetTop - pageHeight + (card1img.offsetHeight*0.8) && !isCard1) {
    isCard1 = true;
    anime({
      targets: card1img,
      opacity: 1,
      easing: "linear",
      duration: 600
    });
  }
  if (window.scrollY > card2img.offsetTop - pageHeight + (card2img.offsetHeight*0.8) && !isCard2) {
    isCard2 = true;
    anime({
      targets: card2img,
      opacity: 1,
      easing: "linear",
      duration: 600
    });
  }
  if (window.scrollY > card3img.offsetTop - pageHeight + (card3img.offsetHeight*0.8) && !isCard3) {
    isCard3 = true;
    anime({
      targets: card3img,
      opacity: 1,
      easing: "linear",
      duration: 600
    });
  }
  if ( window.scrollY > card4img.offsetTop - pageHeight + (card4img.offsetHeight*0.8) && !isCard4) {
    isCard4 = true;
    anime({
      targets: card4img,
      opacity: 1,
      easing: "linear",
      duration: 600
    });
  }

  if (window.scrollY < pageHeight) {
    scrollAnimation.seek(
      scrollAnimation.duration * (window.scrollY / (pageHeight / 1.5))
    );
  }
});
