document.querySelector(".switchIMG").addEventListener("click", changeIMG);
function changeIMG(event) {
  if (
    event.target.classList.contains("ImageSmall1") ||
    event.target.classList.contains("ImageSmall2") ||
    event.target.classList.contains("ImageSmall3")
  ) {
    const smallImageSrc = event.target.src;

    document.querySelector(".mainImage").src = smallImageSrc;
  }
}
