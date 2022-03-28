let allAcirdionBtn = Array.from(document.querySelectorAll(".acurdion-btn"));
let contentAyet = document.querySelector(".content");
let soureBorder = document.querySelector(".soure-border");
let selectSoure = document.querySelector(".select-sure");
let parintPage = document.querySelector(".page");
let parintCursoil = document.querySelector(".content .curoil");
let btnLeftCursoil = document.querySelector(".page  .left-cursoil-btn");
let btnRightCursoil = document.querySelector(".page  .right-cursoil-btn");
let pageNumber = document.querySelector(".number-page");
let spanSoureName = document.querySelector(".sour-name");
let spanJuz = document.querySelector(".span-juz");
let inputAddAyet = document.querySelector(".input-ayet");
let inputLoction = document.querySelector(".loction");
let selectBecgroundColor = document.querySelector("#selectbacegroundcolor");
let selectFontColor = document.querySelector("#selectColorWrite1");
let sevePage = document.querySelector(".seve-page");
let body = document.querySelector("body");
let seveColorToFovorit = document.querySelector(".seve-color");
let allDiv = Array.from(document.querySelectorAll("body *:not(.nav-dont *)"));
let player = document.querySelector(".quranPlayer");
let startAudioQuren = document.querySelector(".start-quren");
let itemactive = 0;

allAcirdionBtn.forEach((e) => {
  e.addEventListener("click", function (cl) {
    console.log();
    cl.target.parentElement.classList.toggle("active");
  });
});

let screensize = 0;

window.onresize = function () {
  screensize = window.innerWidth;
};

const AllItems = Array.from(document.querySelectorAll(".curoil-item"));
let itemactive2 = 0;
window.onload = function () {
  screensize = window.innerWidth;
  if (localStorage.getItem("werd")) {
    itemactive2 = Number(localStorage.getItem("werd"));
  }
  if (
    localStorage.getItem("baceGroundColor-fov") &&
    localStorage.getItem("color-fov")
  ) {
    seveColorToFovorit.innerHTML = "حذف الاعدادات المفضلة";
    seveColorToFovorit.setAttribute("delet", "");
    body.classList.add("chenge");
    allDiv.forEach((e) => {
      e.style.cssText = `color : ${localStorage.getItem(
        "color-fov"
      )} !important`;
    });
    body.style.cssText = `background-color : ${localStorage.getItem(
      "baceGroundColor-fov"
    )} !important ;`;
    // body
    // console.log(localStorage.getItem("baceGroundColor-fov"));
    // localStorage.getItem();
  } else {
  }

  AllItems[itemactive2].classList.add("active");
  fetch("https://api.alquran.cloud/v1/meta")
    .then((getnamesoure) => getnamesoure.json())
    .then((get) => {
      get.data.surahs.references.forEach((e, ind) => {
        let option = document.createElement("option");
        option.value = ind + 1;
        option.innerHTML = e.name;
        selectSoure.appendChild(option);
      });
    });
  addayet();
};
btnLeftCursoil.addEventListener("click", function () {
  removeActiveClass(AllItems);
  addOrDownActiveNumber("up");
  AllItems[itemactive2].classList.add("active");
  AllItems[itemactive2].innerHTML = ``;
  addayet();
  // addPathSound();
  // console.log(itemactive2);
});
btnRightCursoil.addEventListener("click", function () {
  removeActiveClass(AllItems);
  addOrDownActiveNumber("down");
  AllItems[itemactive2].classList.add("active");
  AllItems[itemactive2].innerHTML = ``;
  addayet();
  // addPathSound();
  // console.log(itemactive2);
});

selectSoure.addEventListener("change", function (ch) {
  fetch(`https://api.alquran.cloud/v1/surah/${ch.target.value}/ar.asad`)
    .then((e) => e.json())
    .then((f) => {
      itemactive2 = f.data.ayahs[0].page - 1;
      removeActiveClass(AllItems);
      AllItems[itemactive2].classList.add("active");
      AllItems[itemactive2].innerHTML = ``;
      addayet();
      // addPathSound/();
    });
});

function removeActiveClass(arr) {
  arr.forEach((e) => {
    e.classList.remove("active");
  });
}

function addOrDownActiveNumber(stat) {
  if (stat == "up") {
    itemactive2++;
    if (itemactive2 >= 603) {
      itemactive2 = 603;
    }
  } else if (stat == "down") {
    itemactive2--;
    if (itemactive2 <= 0) {
      itemactive2 = 0;
    }
  }
}

function addayet() {
  fetch(`https://api.alquran.cloud/v1/page/${itemactive2 + 1}/ar.asad`)
    .then((getayet) => getayet.json())
    .then((addayet) => {
      addayet.data.ayahs.forEach((e, ind) => {
        let div = document.createElement("div");
        div.className = `ayee position-relative m-0 `;
        div.setAttribute("sort", ind);
        div.innerHTML = `
        ${e.text}
        <span class = "position-relative d-inline-flex parnumberayet justify-content-center align-items-center "> <span class = "position-absolute text-light fw-bold ayeeNumber">${e.numberInSurah}</span> <img class = "" src="./img/endAyee-removebg-preview.png" style="width: 45px"/></span>
        `;
        if (
          div.innerHTML.includes("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ") ||
          div.innerHTML.includes("بَرَاءَةٌ مِنَ اللَّهِ وَرَسُولِهِ ")
        ) {
          let div2 = document.createElement("div");
          let statSoure = document.createElement("img");
          statSoure.className = `stat-soure`;
          statSoure.src = "./img/basmale2-removebg-preview.png";
          let sourName = document.createElement("p");
          div2.className = `parint-start-soure`;
          sourName.className = `soure-name`;
          sourName.innerHTML = e.surah.name;
          div2.appendChild(sourName);
          div2.appendChild(statSoure);
          AllItems[itemactive2].appendChild(div2);
          AllItems[itemactive2].appendChild(div);
        } else {
          AllItems[itemactive2].appendChild(div);
        }
        pageNumber.innerHTML = e.page;
        spanJuz.innerHTML = e.juz;
        spanSoureName.innerHTML = e.surah.name;
        inputAddAyet.value = e.surah.numberOfAyahs;
        inputLoction.value = `${
          e.surah.revelationType.innerHTML == "Medinan"
            ? "المدينة المنورة"
            : "مكة المكرمة"
        }`;
      });
    })
    .then((addSound) => {
      addPathSound();
    });
}
let errorSelectColor = document.querySelector(".error-color");
let statBaceGround = false,
  statColorText = false,
  statFontSize = false;
let baceGroundColor;
let colorText;
let fonSize;

selectBecgroundColor.addEventListener("input", function (color) {
  body.style.cssText = `background-color : ${color.target.value} !important ;`;
  statBaceGround = true;
  baceGroundColor = `${color.target.value}`;
  body.classList.add("chenge");
});

selectFontColor.addEventListener("input", function (color) {
  statColorText = true;
  allDiv.forEach((e) => {
    colorText = color.target.value;
    e.style.cssText = `color : ${color.target.value} !important`;
  });
});

// console.log(true);
// }

seveColorToFovorit.addEventListener("click", function (cl) {
  if (seveColorToFovorit.hasAttribute("delet") == true) {
    localStorage.removeItem("baceGroundColor-fov");
    localStorage.removeItem("color-fov");
    window.location.reload();
    alert("تم حذف الاعدادت بنجاح والعودة الى الوضع الافتراضى");
  } else {
    if (statBaceGround == false || statColorText == false) {
      this.style.backgroundColor = "red";
      this.style.color = "white";
      errorSelectColor.style.cssText = `display : block  !important  ;`;

      return false;
    } else {
      if (colorText != undefined && baceGroundColor != undefined) {
        this.style.backgroundColor = "inherit";
        this.style.color = "inherit";
        errorSelectColor.style.cssText = `inherit : block  !important  ;`;
        localStorage.setItem("baceGroundColor-fov", baceGroundColor);
        localStorage.setItem("color-fov", colorText);
        alert(
          "تم حفظ الالوان المفضلة بنجاح فى كل مرة سوف تدخل الى الموقع ستجده بالالوان المفضلة التى تم اختيارها من قبلكم"
        );
        window.location.reload();
      }
    }
  }
});

sevePage.addEventListener("click", function () {
  localStorage.setItem("werd", itemactive2);
});

function addPathSound() {
  arrAllSource = [];
  let statStart = false;
  let statEnd = false;
  let stap = 0;
  let stapEnd = 0;
  let allAyeeActive = Array.from(
    document.querySelectorAll(".curoil-item.active .ayee")
  );
  allAyeeActive.forEach((e) => {
    e.addEventListener("mousedown", function (cl) {
      stap++;
      e.setAttribute("stap", stap);
      statStart = true;
    });

    e.addEventListener("mouseup", function (cl) {
      stapEnd++;
      e.setAttribute("stapEnd", stapEnd);
      statEnd = true;
    });
  });

  let inter = setInterval(() => {
    if (statStart == true && statEnd == true) {
      let arr = Array.from(
        document.querySelectorAll(".curoil-item.active .ayee")
      );
      statStart = false;
      statEnd = false;
      let ayeStart;
      let ayeEnd;
      arr.filter((e) => {
        if (e.hasAttribute("stap") || e.hasAttribute("stapEnd")) {
          if (e.hasAttribute("stap") == true) {
            ayeStart = Number(e.getAttribute("sort"));
          } else if (e.hasAttribute("stapEnd") == true) {
            ayeEnd = Number(e.getAttribute("sort"));
          }

          if (ayeStart != undefined && ayeEnd != undefined) {
            // هنا جلب بيانات mp3
            fetch(
              `https://api.alquran.cloud/v1/page/${itemactive2 + 1}/ar.alafasy`
            )
              .then((e) => e.json())
              .then((f) => {
                let arrAllSource = [];
                for (let i = ayeStart; i <= ayeEnd; i++) {
                  let sourceAudio = f.data.ayahs[i].audio;
                  arrAllSource.push(sourceAudio);
                }

                return arrAllSource;
              })
              .then((addpath) => {
                let stap = 0;
                player.src = addpath[stap];
                if (screensize < 767) {
                  startAudioQuren.style.cssText = `display: none !important;`;
                  player.play();
                } else {
                  startAudioQuren.style.cssText = `display: inherit !important;`;
                  startAudioQuren.addEventListener("click", function () {
                    player.play();
                    this.style.cssText = `display: none !important;`;
                  });
                }

                player.onended = function () {
                  stap++;
                  this.src = addpath[stap];
                  if (player.getAttribute("src") == "undefined") {
                    player.pause();
                    addpath = [];
                    stap = 0;
                    player.src = "";
                  } else {
                    this.play();
                  }
                };

                // runSound();
              });
          } else {
            fetch(
              `https://api.alquran.cloud/v1/page/${itemactive2 + 1}/ar.alafasy`
            )
              .then((e) => e.json())
              .then((f) => {
                let arrAllSource = [];

                let sourceAudio = f.data.ayahs[ayeStart].audio;
                arrAllSource.push(sourceAudio);

                return arrAllSource;
              })
              .then((addpath) => {
                let stap = 0;
                player.src = addpath[stap];
                if (screensize < 767) {
                  startAudioQuren.style.cssText = `display: none !important;`;
                  player.play();
                } else {
                  startAudioQuren.style.cssText = `display: inherit !important;`;
                  startAudioQuren.addEventListener("click", function () {
                    player.play();
                    this.style.cssText = `display: none !important;`;
                  });
                }

                player.onended = function () {
                  stap++;
                  this.src = addpath[stap];
                  if (player.getAttribute("src") == "undefined") {
                    player.pause();
                    addpath = [];
                    stap = 0;
                    player.src = "";
                  } else {
                    this.play();
                  }
                };
                // runSound();
              });
          }
        }
        e.removeAttribute("stap");
        e.removeAttribute("stapEnd");
      });
    }
  }, 1000);
}

function runSound() {
  player.onended = function () {
    stap++;
    this.src = addpath[stap];
    if (player.getAttribute("src") == "undefined") {
      player.pause();
      addpath = [];
      stap = 0;
      player.src = "";
    } else {
      this.play();
    }
  };
}
