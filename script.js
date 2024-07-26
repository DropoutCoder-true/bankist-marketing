'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header'); 
const message = document.createElement('div'); 
const nav = document.querySelector(".nav"); 

const openModal = function (e) {
  e.preventDefault(); 
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModal)); 

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Cookie message 
message.classList.add('cookie-message'); 
message.innerHTML = 'We use cookied for improved functionality and analytics, <button class="btn btn--close-cookie"> Got it! </button>'; 

header.append(message); 

document.querySelector('.btn--close-cookie')
.addEventListener('click', function(){
  message.remove(); 
})

message.style.backgroundColor = "#37383d"; 
message.style.width = "120%"; 


// Learn more scrolling section
const btnScrollTo = document.querySelector('.btn--scroll-to'); 
const section1 = document.querySelector('#section--1'); 

btnScrollTo.addEventListener('click', function(e){
  section1.scrollIntoView({behavior: 'smooth'}); 
})

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault(); 
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href'); 
    const targetedSection = document.querySelector(id); 
    targetedSection.scrollIntoView({behavior: 'smooth'});
  }
})

// Tabbed component
const tabs = document.querySelectorAll(".operations__tab"); 
const tabsContainer = document.querySelector(".operations__tab-container"); 
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function(e){
  const clicked = e.target.closest(".operations__tab"); 

  // Active Tab
  if(!clicked) return; 
  tabs.forEach(tab => tab.classList.remove("operations__tab--active")); 
  clicked.classList.add("operations__tab--active"); 
  
  // Active Tab Content
  const currentContent = document.querySelector(`.operations__content--${clicked.getAttribute("data-tab")}`); 
  tabsContent.forEach(tab => tab.classList.remove("operations__content--active")); 
  currentContent.classList.add("operations__content--active"); 
})

// Nav hover animation
const handleHover = function(e){
  // console.log(this, e.currentTarget); 
  if(e.target.classList.contains("nav__link")){
    const link = e.target; 
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo"); 
    siblings.forEach(el => {
      if(el != link){
        el.style.opacity = this; 
      }
      logo.style.opacity = this; 
    })
  }
}

nav.addEventListener("mouseover", handleHover.bind(0.5)); 
nav.addEventListener("mouseout", handleHover.bind(1)); 

// Using Intersection Observer API
const stickyNav = function(entries){
  const [entry] = entries; 
  // console.log(entry); 
  if(!entry.isIntersecting) nav.classList.add("sticky"); 
  else nav.classList.remove("sticky"); 
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, 
  threshold: 0, 
  rootMargin: "-90px" 
}); 

headerObserver.observe(header); 

// section animations
const revealSection = function(entries, observer){
  const [entry] = entries; 
  if(!entry.isIntersecting) return 
  entry.target.classList.remove("section--hidden"); 
  observer.unobserve(entry.target); 
}

const allSections = document.querySelectorAll(".section"); 

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, 
  threshold: 0, 
  rootMargin: "200px"
}); 

allSections.forEach((sec) => {
  sectionObserver.observe(sec); 
  sec.classList.add("section--hidden");
})

// lazy image loading 
const imgTargets = document.querySelectorAll("img[data-src]"); 

const revealImage = function(entries, observer){
  const [entry] = entries; 
  if(!entry.isIntersecting) return; 
  entry.target.src = entry.target.dataset.src; 
  entry.target.addEventListener("load", function(){
    entry.target.classList.remove("lazy-img"); 
  })
  observer.unobserve(entry.target); 
}

const imgObserver = new IntersectionObserver(revealImage, {
  root: null, 
  threshold: 0.14, 
  rootMargin: "200px"
})

imgTargets.forEach(img => imgObserver.observe(img)); 

// Image Slider 
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left"); 
const btnRight = document.querySelector(".slider__btn--right"); 

let currSlide = 0; 
const maxSlides = slides.length-1; 
const minSlides = slides[0]; 

// Creating dots for slider
const dotContainer = document.querySelector(".dots"); 

const createDots = function(){
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`); 
  })
}
createDots(); 

dotContainer.addEventListener("click", function(e){
  if(e.target.classList.contains("dots__dot")){ 
    const {slide} = e.target.dataset; 
    goToSlide(slide); 
    activateDot(slide); 
  } 
})

// Setting active slide and active dot 
const activateDot = function(slide){
  const dots = document.querySelectorAll(".dots__dot"); 
  dots.forEach(dot => dot.classList.remove("dots__dot--active")); 
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active"); 
}
activateDot(0); 

// Slide Functions
const goToSlide = function(slide){
  slides.forEach((sl, i) => {
    sl.style.transform = `translateX(${100 * (i - slide)}%)`
  }); 
}
goToSlide(0); 

const nextSlide = function(){
  if(currSlide === maxSlides){
    currSlide = 0; 
  } else {
    currSlide++; 
  }
  slides.forEach((s, i) => {
    s.style.transform = `translate(${100 * (i - currSlide)}%)`; 
  })
  activateDot(currSlide); 
}; 

const prevSlide = function(){
  if(currSlide === 0){
    currSlide = maxSlides; 
  } else {
    currSlide--; 
  }
  goToSlide(currSlide); 
  activateDot(currSlide); 
}

document.addEventListener("keydown", function(e){
  if(e.key === "ArrowRight") nextSlide(); 
  if(e.key === "ArrowLeft") prevSlide(); 
})

btnRight.addEventListener("click", nextSlide); 
btnLeft.addEventListener("click", prevSlide); 
