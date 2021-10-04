let $ = document;
/////////////////////////

/////////////////////////
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
let tip = $.querySelector("#tip");
let tipBtn = $.querySelector("#tip-btn");
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
let tipWrote = false;
let testQuote = [];
let text;
////////////////////////
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

////////////////////////
//first setup
contactUsMain.style.display = "none";
contactUsMain.style.display = "0";
tip.style.display = "none";
video.style.opacity = "0";

//video.style.display = "none";
aboutUs.style.display = "flex";
//video.muted = true;

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
//play random music function
function playMusic() {
  let i = Math.floor(Math.random() * 10);
  music.src = `music/${i}.mp3`;
  music.play();
}
function playKeySound() {
  music.src = "music/key.mp3";
  music.play();
}
//play random video function
function playVideo(mood) {
  if (mood == calm) {
    titleText.style.opacity = "0";
    home.scrollIntoView({ behavior: "smooth" });
    getData(
      "link/calm-link.json",
      (data) => (video.src = data[Math.floor(Math.random() * data.length)])
    );
    video.style.opacity = "0";
    setTimeout(() => {
      titleText.innerHTML = `Calm<i id="iconFace" class="fas fa-smile-beam">`;
      titleText.style.opacity = "1";
      video.style.opacity = "1";
      video.play();
    }, 2000);
  } else if (mood == motivate) {
    titleText.style.opacity = "0";
    home.scrollIntoView({ behavior: "smooth" });
    video.muted = false;
    getData(
      "link/motivate-link.json",
      (data) => (video.src = data[Math.floor(Math.random() * data.length)])
    );
    video.style.opacity = "0";
    setTimeout(() => {
      titleText.innerHTML = `Motivate<i id="iconFace" class="fas fa-grin-wink">`;
      titleText.style.opacity = "1";
      video.style.opacity = "1";
      video.play();
    }, 2000);
  }
}
//change background (calm , motivate)
function setBackground(mood) {
  if (mood == calm) {
    titleText.style.opacity = "0";
    setTimeout(() => {
      root.style.setProperty(
        "--moodBackground",
        `-webkit-linear-gradient(
        to right,
        #d76d77,
        #3a1c71
 )`
      );
      root.style.setProperty(
        "--moodBackground",
        `linear-gradient(
      to right,
      #ffaf7b,
      #d76d77,
      #3a1c71
 )`
      );
      titleText.innerHTML = `Calm<i id="iconFace" class="fas fa-smile-beam">`;
      titleText.style.opacity = "1";
    }, 1000);
  } else if (mood == motivate) {
    titleText.style.opacity = "0";
    showcase.style.opacity = "0";
    setTimeout(() => {
      root.style.setProperty(
        "--moodBackground",
        `-webkit-linear-gradient(to right, #6A82FB, #FC5C7D)`
      );
      root.style.setProperty(
        "--moodBackground",
        `linear-gradient(to right, #6A82FB, #FC5C7D)`
      );
      titleText.innerHTML = `Motivate<i id="iconFace" class="fas fa-grin-wink">`;
      titleText.style.opacity = "1";
      showcase.style.opacity = "1";
    }, 1000);
  }
}
//fade out text and button
function fadeOut() {
  tip.style.transition = "1s";
  tip.style.opacity = "0";
  calm.style.transition = "1s";
  calm.style.opacity = "0";
  motivate.style.transition = "1s";
  motivate.style.opacity = "0";
  moodText.style.transition = "1s";
  moodText.style.opacity = "0";
  deleteElem(calm);
  deleteElem(motivate);
  deleteElem(moodText);
}
//delete html element
function deleteElem(elem) {
  setTimeout(() => {
    elem.remove();
  }, 1000);
}
function setQuote(mood) {
  if (mood == calm) {
    let j = Math.floor(Math.random() * 4);
    quote.style.color = "#fff";
    quote.style.opacity = "0";
    quoteBox.style.opacity = "0";

    setTimeout(() => {
      getData(
        "quote/calm-quote.json",
        (data) =>
          (quote.innerHTML = data[Math.floor(Math.random() * data.length)])
      );
      quoteBox.style.padding = "15px 20px";
      quoteBox.style.opacity = "1";
      quote.style.opacity = "1";
    }, 1000);
  } else if (mood == motivate) {
    j = Math.floor(Math.random() * 4);

    quote.style.color = "#fff";
    quote.style.opacity = "0";
    quoteBox.style.opacity = "0";
    setTimeout(() => {
      getData(
        "quote/motivate-quote.json",
        (data) =>
          (quote.innerHTML = data[Math.floor(Math.random() * data.length)])
      );
      quoteBox.style.padding = "15px 20px";
      quoteBox.style.opacity = "1";
      quote.style.opacity = "1";
    }, 1000);
  }
}
calm.addEventListener("click", () => {
  tip.style.display = "none";
  home.style.overflow = "hidden";
  moodSelect = true;
  fadeOut();
  playMusic();
  playVideo(calm);
  setQuote(calm);
  aboutUs.style.display = "none";
});
motivate.addEventListener("click", () => {
  tip.style.display = "none";
  home.style.overflow = "hidden";
  moodSelect = true;
  fadeOut();
  playVideo(motivate);
  setQuote(motivate);
  aboutUs.style.display = "none";
});
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
      homeBtn.href = "/mood"; // avaz shd az  /money
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
/*video.addEventListener("volumechange", () => {
  if (video.volume > 0.0 && video.muted == false) {
    music.muted = true;
  } else if (video.volume == 0.0 || video.muted == true) {
    music.muted = false;
  }
});*/