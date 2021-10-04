let $ = document;
let calm = $.querySelector("#primary");
let motivate = $.querySelector("#secondery");
let home = $.querySelector("#home");
let showcase = $.querySelector("#showcase");
let navChoices = $.querySelector(".nav-choices");
let music = $.querySelector("#music");
let iconFace = $.querySelector("#icon");
let logo = $.querySelector("#primary-txt");
let moodText = $.querySelector("#mood-sen");
let titleText = $.querySelector(".logo").querySelector("a");
let quote = $.querySelector("#quote");
let quoteBox = $.querySelector("#quote-box");
let video = $.querySelector("#video");
let aboutUs = $.querySelector("#aboutus");
let root = $.querySelector(":root");
let tipBtn = $.querySelector("#tip-btn");
let tip = $.querySelector("#tip");
let tipWrote = false;
let empty = $.querySelector(".empty");
let contactUs = $.querySelector("#contactus");
let contactUsBtn = $.querySelector("#contactus-btn");
let aboutUsBtn = $.querySelector("#aboutus-btn");
let homeBtn = $.querySelector("#home-btn");
let InformationInput =
  $.querySelector(".information").querySelectorAll(".input");
let contactUsMain = $.querySelector(".main-txt");
let mainPic = $.querySelector(".main-pic");
let contactUsTxt = $.querySelector("#contactus-txt");
let rs = getComputedStyle(root);
let moodSelect = false;
let sent = false;
let i = 0;
let speed = 100;
let tipCheck = localStorage.getItem("tip");
let testQuote = [];
let text;
function getData(url, cb) {
  fetch(url)
    .then((response) => response.json())
    .then((result) => cb(result));
}
////////////////////////
getData("quote/tip-quote.json", (data) => (text = data[data.length - 1]));
if (tipCheck == "true") {
  setTimeout(() => {
    empty.innerHTML = text;
  }, 1000);
}
contactUsMain.style.display = "none";
contactUsMain.style.display = "0";
function Information() {
  addEventListener("keyup", () => {
    if (
      InformationInput[0].value.length > 0 &&
      InformationInput[1].value.length > 0 &&
      InformationInput[2].value.length > 0
    ) {
      mainPic.style.display = "none";
      contactUsMain.style.display = "flex";
      contactUsMain.style.opacity = "1";
    } else {
      mainPic.style.display = "flex";
      contactUsMain.style.display = "none";
    }
  });
}
Information();
function playKeySound() {
  music.src = "music/key.mp3";
  music.play();
}
logo.addEventListener("mouseover", () => {
  if (moodSelect == false) {
    iconFace.className = "fas fa-smile";
  }
});
logo.addEventListener("mouseout", () => {
  if (moodSelect == false) {
    iconFace.className = "fas fa-meh";
  }
});
logo.addEventListener("click", () => {
  if (moodSelect == false && tipWrote == false) {
    tipWrote = true;
    playKeySound();
    setTip();
    setTimeout(() => {
      music.pause();
    }, 100 * text.length);
  }
});
tipBtn.addEventListener("click", () => {
  if (moodSelect == false && tipWrote == false) {
    tipWrote = true;
    playKeySound();
    setTip();
    setTimeout(() => {
      music.pause();
    }, 100 * text.length);
  }
});
////////////daily tip/////////////
function setTip() {
  tip.style.display = "flex";
  if (i < text.length) {
    tip.innerHTML += text.charAt(i);
    empty.innerHTML += text.charAt(i);
    i++;
    setTimeout(setTip, speed);
  }
  localStorage.setItem("tip", "true");
  if (tipCheck == "true") {
    empty.innerHTML = text;
  }
}
if (tipCheck == "true") {
  empty.innerHTML = text;
}
///////////changing section///////////

function goToSection() {
  let moodCheck = localStorage.getItem("mood");
  let btnCheck = localStorage.getItem("btn");
  homeBtn.addEventListener("click", () => {
    if (moodSelect == true) {
      homeBtn.href = "./";
    } else {
      home.scrollIntoView({ behavior: "smooth" });
    }
  });
  contactUsBtn.addEventListener("click", () => {
    if (moodSelect == true) {
      localStorage.setItem("mood", "true");
      localStorage.setItem("btn", "contact");
      homeBtn.href = "./index.html";
      homeBtn.click();
    }
    contactUs.scrollIntoView({ behavior: "smooth" });
  });
  aboutUsBtn.addEventListener("click", () => {
    if (moodSelect == true) {
      localStorage.setItem("mood", "true");
      localStorage.setItem("btn", "about");
      homeBtn.href = "./index.html";
      homeBtn.click();
    }
    aboutUs.scrollIntoView({ behavior: "smooth" });
  });
  if (moodCheck == "true" && btnCheck == "contact") {
    contactUs.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("mood", "false");
    localStorage.setItem("btn", "Null");
  }
  if (moodCheck == "true" && btnCheck == "about") {
    aboutUs.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("mood", "false");
    localStorage.setItem("btn", "Null");
  }
}
goToSection();
///////////////