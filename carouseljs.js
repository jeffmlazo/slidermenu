const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const dotIndicatorBox = document.querySelector(".dot-indicator-box");
const dotBtn = Array.from(dotIndicatorBox.children);
const slideWidth = slides[0].getBoundingClientRect().width;

/***FUNCTIONS***/
// Arrange the slides to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

// Move slide function
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
};

// Move dot indicator function
const moveToDot = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
};

// Show or Hide arrow buttons function
const showHideArrow = (targetIndex, prevBtn, nextBtn, slides) => {
  if (targetIndex === 0) {
    prevBtn.classList.add("is-disabled");
    nextBtn.classList.remove("is-disabled");
  } else if (targetIndex === slides.length - 1) {
    nextBtn.classList.add("is-disabled");
    prevBtn.classList.remove("is-disabled");
  } else {
    nextBtn.classList.remove("is-disabled");
    prevBtn.classList.remove("is-disabled");
  }
};

// Change image using click events
let ctr = 0;
let time = 3000; //3 seconds
function changeImg() {
  if (ctr === 0) {
    // console.log('No Click');
    ctr++;
  } else if (ctr < slides.length) {
    // console.log('click ' + ctr);
    ctr++;
    nextBtn.click();
  } else {
    // console.log('reset');
    ctr = 0;
    dotIndicatorBox.querySelector("button:first-child").click();
  }

  setTimeout("changeImg()", time);
}

/***CLICK EVENTS***/
// Move previous slide click event
prevBtn.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotIndicatorBox.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevSlideIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  moveToDot(currentDot, prevDot);
  showHideArrow(prevSlideIndex, prevBtn, nextBtn, slides);
});

// Move next slide click event
nextBtn.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotIndicatorBox.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextSlideIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  moveToDot(currentDot, nextDot);
  showHideArrow(nextSlideIndex, prevBtn, nextBtn, slides);
});

// Move slide in dot indicator click event
dotIndicatorBox.addEventListener("click", e => {
  const targetDot = e.target.closest("button");

  // Check the dot indicator if it wasn't click if true exit function
  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotIndicatorBox.querySelector(".current-slide");
  const targetIndex = dotBtn.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  moveToDot(currentDot, targetDot);
  showHideArrow(targetIndex, prevBtn, nextBtn, slides);
});

// Load autoplay carousel
window.onload = e => {
  changeImg();
};
