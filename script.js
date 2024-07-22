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

// Practice

const header = document.querySelector('.header'); 
// const allSections = document.querySelectorAll('.section'); 
// console.log(allSections); 

// document.getElementById('section--1'); 
// const allButtons = document.getElementsByTagName('button'); 
// console.log(allButtons); 

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

  console.log(e.target.getBoundingClientRect()); // shows coordinates of the element

  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth); 

  // Scrolling
  // window.scrollTo({
  //   left: sec1coords.left + window.pageXOffset, 
  //   top: sec1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({behavior: 'smooth'}); 
})
