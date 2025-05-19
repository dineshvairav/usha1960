const hamburger = document.querySelector('.hamburger');
 const navMenu = document.querySelector('.nav-menu');
 

 hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
 });
 

 document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
 }));
 

 document.addEventListener('click', (event) => {
  const isClickInsideMenu = navMenu.contains(event.target) || hamburger.contains(event.target);
  if (!isClickInsideMenu && navMenu.classList.contains('active')) {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  }
 });
 

 const wrapper = document.querySelector('.wrapper');
 const loginLink = document.querySelector('.login-link');
 const registerLink = document.querySelector('.register-link');
 const btnPopup = document.querySelector('.btn-sign');
 const iconClose = document.querySelector('.icon-close');
 

 registerLink.addEventListener('click', () => {
  wrapper.classList.add('active');
 });
 

 loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
 });
 

 btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
  const popupLine = document.createElement('div');
  popupLine.classList.add('popup-line');
  popupLine.textContent = 'This is a popup line!';
  document.body.appendChild(popupLine);
 });
 

 iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
 });