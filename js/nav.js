const navBtn = document.querySelector(".togle");
navBtn.addEventListener("click", function () {
  document.querySelector(".right.links").classList.toggle("active");
  if (location.href.includes("quren")) {
    document.querySelector(".quren").classList.toggle("active");
  } else if (location.href.includes("index")) {
    document.querySelector(".amsik").classList.toggle("active");
  } else if (location.href.includes("azkir")) {
    document.querySelector(".azkir").classList.toggle("active");
  }
  document.querySelector(".fanois").classList.toggle("hiid");
});
