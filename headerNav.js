/*
  For Javascript enabled interactivity functionality on the Header Element and Navigation. 
  To be used for every page in this application that contains the Header Component
*/

// Header-Navigation popup for mobile devices (Smaller Screen Sizes)
const navPopupOverlay = document.querySelector("#nav-popup-overlay");
const navPopup = document.querySelector("#nav-popup");
const btnNavOpen = document.querySelector("#nav-open");
const btnNavClose = document.querySelector("#nav-close");

btnNavOpen.addEventListener("click", () => {
  navPopupOverlay.classList.remove("hidden");
  setTimeout(() => {
    navPopup.classList.remove("-translate-x-20");
  }, 10);
});

btnNavClose.addEventListener("click", () => {
  navPopup.classList.add("-translate-x-20");
  setTimeout(() => {
    navPopupOverlay.classList.add("hidden");
  }, 150);
});

navPopupOverlay.addEventListener("click", (e) => {
  if (e.target === navPopup) return;
  navPopup.classList.add("-translate-x-20");
  setTimeout(() => {
    navPopupOverlay.classList.add("hidden");
  }, 150);
});

// Newsletter popup
const btnOpenNl = document.querySelectorAll("[data-open-newsletter]");
const nlPopupOverlay = document.querySelector("#newsletter-popup-overlay");
const nlPopup = document.querySelector("#newsletter-form-popup");
const btnCloseNl = document.querySelector("#close-newsletter-popup");
const nlForm = document.querySelector("#newsletter-form");
const nlErrorMessage = document.querySelector("#newsletter-error-message");
const nlEmailInput = document.querySelector("#newsletter-email-input");
const nlFormSubmit = document.querySelector("#newsletter-submit");
const afterNlSubmitPopup = document.querySelector(
  "#after-newsletter-submitted-popup"
);
const nlDismiss = document.querySelector("#newsletter-dismiss");

function swapClass(element, oldClass, newClass) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

btnOpenNl.forEach((button) => {
  button.addEventListener("click", () => {
    swapClass(nlPopupOverlay, "hidden", "grid");
  });
});

btnCloseNl.addEventListener("click", () => {
  swapClass(nlPopupOverlay, "grid", "hidden");
});

nlPopupOverlay.addEventListener("click", (e) => {
  if (e.target === nlPopupOverlay) {
    swapClass(nlPopupOverlay, "grid", "hidden");
  }
});

nlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userEmail = nlEmailInput.value;
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(userEmail)) {
    swapClass(nlPopup, "grid", "hidden");
    swapClass(afterNlSubmitPopup, "hidden", "grid");
  } else {
    nlErrorMessage.textContent = "❌ Enter A Valid Email";
  }
});

nlEmailInput.addEventListener("keydown", () => {
  nlErrorMessage.textContent = "";
});

nlDismiss.addEventListener("click", () => {
  swapClass(nlPopupOverlay, "grid", "hidden");
  swapClass(nlPopup, "hidden", "grid");
  swapClass(afterNlSubmitPopup, "grid", "hidden");
});
