let AllLinks = document.querySelectorAll(".links button");
let AllContent = document.querySelectorAll(".allContent  > div");
let sabehAndMasee = document.querySelector("#content-masee");
let slib = document.querySelector("#content-sleep");
let afterPrayer = document.querySelector("#content-after-preyer");

AllLinks.forEach((e) => {
  e.addEventListener("click", function (tr) {
    AllLinks.forEach((c) => {
      c.classList.remove("active");
    });
    AllContent.forEach((co) => {
      co.classList.remove("active");
      if (tr.target.getAttribute("targit").includes(co.getAttribute("id"))) {
        co.classList.add("active");
      }
    });
    tr.target.classList.add("active");
  });
});

function getdata(url, title, parintItem) {
  fetch(url)
    .then((resbone) => resbone.json())
    .then((data) => {
      data[title].map((e) => {
        let item = document.createElement("div");
        item.className = `item`;
        item.innerHTML = `
                        <p class="text fs-1"> ${e.ARABIC_TEXT} </p>
                        <div class="count rounded-circle d-flex align-items-center justify-content-center m-auto">${e.REPEAT}</div>
                        <button class="btn position-absolute run-sound" title="تشغيل"><i class="fa-solid fa-play " title="تشغيل">
                        <audio src="${e.AUDIO}"></audio></i></button>
                        <button class="btn position-absolute copy" title="نسخ"><i class="fa-solid fa-copy w-100"></i>  </button>
            `;
        parintItem.children[0].innerHTML = title;
        parintItem.children[2].appendChild(item);
      });
    })
    .then((hendlesound) => {
      let soundAzkir = Array.from(document.querySelectorAll(".run-sound i"));
      soundAzkir.forEach((e) => {
        e.addEventListener("click", function (cl) {
          soundAzkir.forEach((del) => {
            del.children[0].pause();
          });
          cl.target.children[0].play();
        });
      });
    })
    .then((hendlecopy) => {
      let allCopy = Array.from(document.querySelectorAll(".copy i"));
      allCopy.forEach((e) => {
        e.addEventListener("click", function (cl) {
          let text =
            `${cl.target.parentElement.parentElement.children[0].innerHTML}` +
            `
        نسألكم الدعاء لمطور الموقع
      `;
          window.navigator.clipboard.writeText(text);
        });
      });
    })
    .then((hendlercount) => {
      let AllCount = Array.from(document.querySelectorAll(".item .count"));
      if (AllCount.length > 44) {
        AllCount.forEach((e) => {
          e.addEventListener("click", function (co) {
            if (co.target.innerHTML <= 1) {
              co.target.innerHTML = "تم";
              co.target.setAttribute("done", "");
            } else {
              co.target.innerHTML -= 1;
            }
            if (co.target.hasAttribute("done")) {
              co.target.innerHTML = "تم";
            }
          });
        });
      }
    });
}
getdata(
  `https://www.hisnmuslim.com/api/ar/27.json`,
  `أذكار الصباح والمساء`,
  sabehAndMasee
);
getdata(`https://www.hisnmuslim.com/api/ar/28.json`, `أذكار النوم`, slib);
getdata(
  `https://www.hisnmuslim.com/api/ar/25.json`,
  `الأذكار بعد السلام من الصلاة`,
  afterPrayer
);
