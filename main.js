/*
  Main javascript file contains client side functionality for all interactive features on the main page
  Dependencies Used: Axios (A tool to fetch external data from an API or the file system, Alternative to the Native Fetch API)
*/
import axios from "axios";

// A utility function to fetch data using Axios
async function fetchData(url) {
  try {
    const res = await axios.get(url);
    if (res.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    return res.data;
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error.message);
    }
    return null;
  }
}

// Sliding Carousel Functionality (Main Page -> City, Place of Interest and State sections)

// Reusable Functions for Carousel Sections
function renderSlide(currentSlide, slideElements) {
  slideElements.forEach((slide, index) => {
    slide.style.transform = `translateX(${120 * (index - currentSlide)}%)`;
  });
}

function resetDots(dots) {
  dots.forEach((dot) => {
    dot.classList.remove("bg-slate-900");
    dot.classList.add("bg-slate-300");
  });
}

function updateDot(currentSlide, type) {
  const dot = document.querySelector(
    `[data-${type}-dot='${currentSlide + 1}']`
  );
  dot.classList.remove("bg-slate-300");
  dot.classList.add("bg-slate-900");
}

function addDotsEvent(dots, SlideProp, slides, type) {
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      resetDots(dots);
      dot.classList.remove("bg-slate-300");
      dot.classList.add("bg-slate-900");
      const currentDot = dot.getAttribute(`data-${type}-dot`);
      SlideProp.currentSlide = currentDot - 1;
      renderSlide(SlideProp.currentSlide, slides);
    });
  });
}

// City Section Carousel Functionality
const citySlideContainer = document.querySelector("#city-slide-container");
const citySlides = document.querySelectorAll("[data-city-slide]");
const citySlideDots = document.querySelectorAll("[data-city-dot]");

if (citySlideContainer) {
  const Slide = {
    currentSlide: 0,
    maxSlide: citySlides.length - 1,
  };

  renderSlide(Slide.currentSlide, citySlides);

  const btnSlideLeft = document.querySelector("#city-slide-left");
  const btnSlideRight = document.querySelector("#city-slide-right");
  btnSlideLeft.addEventListener("click", () => {
    if (Slide.currentSlide === 0) {
      Slide.currentSlide = Slide.maxSlide;
    } else {
      Slide.currentSlide--;
    }
    resetDots(citySlideDots);
    updateDot(Slide.currentSlide, "city");
    renderSlide(Slide.currentSlide, citySlides);
  });
  btnSlideRight.addEventListener("click", () => {
    if (Slide.currentSlide === Slide.maxSlide) {
      Slide.currentSlide = 0;
    } else {
      Slide.currentSlide++;
    }
    resetDots(citySlideDots);
    updateDot(Slide.currentSlide, "city");
    renderSlide(Slide.currentSlide, citySlides);
  });

  addDotsEvent(citySlideDots, Slide, citySlides, "city");
}

// Place Of Interest Section Carousel Functionaility
const placeSlideContainer = document.querySelector("#place-slide-container");
const placeSlides = document.querySelectorAll("[data-place-slide]");
const placeSlideDots = document.querySelectorAll("[data-place-dot]");

if (placeSlideContainer) {
  const Slide = {
    currentSlide: 0,
    maxSlide: placeSlides.length - 1,
  };

  renderSlide(Slide.currentSlide, placeSlides);

  const btnSlideLeft = document.querySelector("#place-slide-left");
  const btnSlideRight = document.querySelector("#place-slide-right");
  btnSlideLeft.addEventListener("click", () => {
    if (Slide.currentSlide === 0) {
      Slide.currentSlide = Slide.maxSlide;
    } else {
      Slide.currentSlide--;
    }
    resetDots(placeSlideDots);
    updateDot(Slide.currentSlide, "place");
    renderSlide(Slide.currentSlide, placeSlides);
  });
  btnSlideRight.addEventListener("click", () => {
    if (Slide.currentSlide === Slide.maxSlide) {
      Slide.currentSlide = 0;
    } else {
      Slide.currentSlide++;
    }
    resetDots(placeSlideDots);
    updateDot(Slide.currentSlide, "place");
    renderSlide(Slide.currentSlide, placeSlides);
  });

  addDotsEvent(placeSlideDots, Slide, placeSlides, "place");
}

// Simulating Dynamic Data being Inserted when user hovers over specific cities/place of interest
// A Card Element showcasing an image, name, description and button gets dynamically updated using mock data to enhance user experience
// Corresponding mock data originates from "/data/cities.json" or "/data/placeOfInterest.json"
let pathname = "";
if (window.location.pathname.includes("travel-my")) {
  pathname = "/travel-my";
}
const btnCities = document.querySelectorAll("[data-city]");
const cityName = document.querySelector("#city-name");
const cityDesc = document.querySelector("#city-desc");
const cityButton = document.querySelector("#city-button");
const cityImage = document.querySelector("#city-image");

const cityCardElements = {
  name: cityName,
  desc: cityDesc,
  button: cityButton,
  image: cityImage,
};

async function initCitiesData() {
  const CitiesData = await fetchData(pathname + "/data/cities.json");
  if (btnCities) {
    btnCities.forEach((button) => {
      addHoverEffect(
        btnCities,
        button,
        CitiesData.cities,
        cityCardElements,
        "city"
      );
    });
  }
}

const btnPlaces = document.querySelectorAll("[data-place]");
const placeName = document.querySelector("#place-name");
const placeDesc = document.querySelector("#place-desc");
const placeButton = document.querySelector("#place-button");
const placeImage = document.querySelector("#place-image");

const placeCardElements = {
  name: placeName,
  desc: placeDesc,
  button: placeButton,
  image: placeImage,
};

async function initPlacesData() {
  const placesData = await fetchData(pathname + "/data/placeOfInterest.json");
  if (btnPlaces) {
    btnPlaces.forEach((button) => {
      addHoverEffect(
        btnPlaces,
        button,
        placesData.places,
        placeCardElements,
        "place"
      );
    });
  }
}

function clearHoverEffect(elements) {
  elements.forEach((element) => {
    element.classList.remove("selected");
    element.classList.add("not-selected");
    const sanitisedString = element.innerText.replace(new RegExp("➡", "g"), "");
    element.innerText = sanitisedString;
  });
}

function addHoverEffect(allButtons, button, data, cardElements, type) {
  button.addEventListener("pointerover", () => {
    clearHoverEffect(allButtons);
    button.classList.remove("not-selected");
    button.classList.add("selected");
    button.append(" ➡");
    const codename = button.getAttribute(`data-${type}`);
    changeCardText(codename, data, cardElements);
  });
}

function changeCardText(codename, data, cardElements) {
  const dataSelected = data.find((element) => {
    return element.codename === codename;
  });
  cardElements.name.innerText = dataSelected.fullname;
  cardElements.desc.innerText = dataSelected.short;
  cardElements.button.innerText = `Visit ${dataSelected.fullname} ➡`;
  cardElements.button.setAttribute("data-main", dataSelected.codename);
  cardElements.image.setAttribute("src", pathname + dataSelected.imageUrl);
}

initCitiesData();
initPlacesData();

// State Section Carousel Functionality
const stateSlideContainer = document.querySelector("#state-slide-container");
const stateSlides = document.querySelectorAll("[data-state-slide]");
const stateSlideDots = document.querySelectorAll("[data-state-dot]");

if (stateSlideContainer) {
  const Slide = {
    currentSlide: 0,
    maxSlide: stateSlides.length - 1,
  };

  renderSlide(Slide.currentSlide, stateSlides);

  const btnSlideLeft = document.querySelector("#state-slide-left");
  const btnSlideRight = document.querySelector("#state-slide-right");
  btnSlideLeft.addEventListener("click", () => {
    if (Slide.currentSlide === 0) {
      Slide.currentSlide = Slide.maxSlide;
    } else {
      Slide.currentSlide--;
    }
    resetDots(stateSlideDots);
    updateDot(Slide.currentSlide, "state");
    renderSlide(Slide.currentSlide, stateSlides);
  });
  btnSlideRight.addEventListener("click", () => {
    if (Slide.currentSlide === Slide.maxSlide) {
      Slide.currentSlide = 0;
    } else {
      Slide.currentSlide++;
    }
    resetDots(stateSlideDots);
    updateDot(Slide.currentSlide, "state");
    renderSlide(Slide.currentSlide, stateSlides);
  });

  addDotsEvent(stateSlideDots, Slide, stateSlides, "state");
}

// KL Page Example

cityButton.addEventListener("click", (e) => {
  const city = e.target.getAttribute("data-main");
  if (city === "kuala-lumpur") {
    location.href = pathname + "/kl/";
  }
});

btnCities.forEach((button) => {
  button.addEventListener("click", (e) => {
    const city = e.target.getAttribute("data-city");
    if (city === "kuala-lumpur") {
      location.href = pathname + "/kl/";
    }
  });
});

// Petronas Twin Towers Page Example

placeButton.addEventListener("click", (e) => {
  const place = e.target.getAttribute("data-main");
  if (place === "petronas-twin-towers") {
    location.href = pathname + "/petronas_twin_towers/";
  }
});

btnPlaces.forEach((button) => {
  button.addEventListener("click", (e) => {
    const place = e.target.getAttribute("data-place");
    if (place === "petronas-twin-towers") {
      location.href = pathname + "/petronas_twin_towers/";
    }
  });
});
