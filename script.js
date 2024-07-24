'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const header = document.querySelector('.header'); 

const message = document.createElement('div'); 
message.classList.add('cookie-message'); 
message.innerHTML = 'We use cookied for improved functionality and analytics, <button class="btn btn--close-cookie"> Got it! </button>'; 

header.append(message); 

document.querySelector('.btn--close-cookie')
.addEventListener('click', function(){
  message.remove(); 
})

message.style.backgroundColor = "#37383d"; 
message.style.width = "120%"; 

const btnScrollTo = document.querySelector('.btn--scroll-to'); 
const section1 = document.querySelector('#section--1'); 

btnScrollTo.addEventListener('click', function(e){
  const sec1coords = section1.getBoundingClientRect(); 
  console.log(sec1coords); 

  console.log(e.target.getBoundingClientRect());

  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth); 

  section1.scrollIntoView({behavior: 'smooth'}); 
})

// Paginating nav links
// document.querySelectorAll('.nav__link').forEach((el) => el.addEventListener('click', function(e){
//   e.preventDefault(); 
//   const id = this.getAttribute('href'); 
//   document.querySelector(id).scrollIntoView({behavior: 'smooth'}); 
// }))

// // Dom traversing practice
// const h1 = document.querySelector('h1'); 
// console.log(h1.querySelectorAll(".highlight")); 
// console.log(h1.childNodes); 
// console.log(h1.children); 
// h1.firstElementChild.style.color = "white"; 
// h1.lastElementChild.style.color = "orange"; 

// // Going upwards: parent element
// console.log(h1.parentNode); 
// console.log(h1.parentElement); 
// h1.closest(".header").style.backgroundColor = "pink"; 

// // Going sideways
// console.log(h1.previousElementSibling); 
// console.log(h1.nextElementSibling); 
// console.log(h1.previousSibling); 
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children); 

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
  // console.log(clicked); 

  // Active Tab
  if(!clicked) return; 
  tabs.forEach(tab => tab.classList.remove("operations__tab--active")); 
  clicked.classList.add("operations__tab--active"); 

  // Active Tab Content
  const currentContent = document.querySelector(`.operations__content--${clicked.getAttribute("data-tab")}`); 
  tabsContent.forEach(tab => tab.classList.remove("operations__content--active")); 
  currentContent.classList.add("operations__content--active"); 
})
