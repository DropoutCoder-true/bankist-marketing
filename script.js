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

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

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
  console.log(this, e.currentTarget); 
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