// Image Display Functionality

const picture = document.querySelector("#main-img-picture");
const imgSelectorButtons = document.querySelectorAll("[data-select-img]");

function removeClass(elements, classname) {
  elements.forEach((element) => {
    element.classList.remove(classname);
  });
}

if (imgSelectorButtons) {
  imgSelectorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const imageSrc = btn.querySelector("img").getAttribute("src");
      picture.querySelector("img").setAttribute("src", imageSrc);
      removeClass(imgSelectorButtons, "opacity-60");
      btn.classList.add("opacity-60");
    });
  });
}
