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


 iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
 });
