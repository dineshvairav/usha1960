// // Supabase client initialization
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://xlaadoethfvzdqvbztrl.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWFkb2V0aGZ2emRxdmJ6dHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTEwOTUsImV4cCI6MjA1NjcyNzA5NX0.7uojIqXWnND-fvQ-BQpgHR8GgdtMU5_E-XJvHXhIYVs'

// const supabase = createClient(supabaseUrl, supabaseKey)

const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');


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
    let popupTimeout = setTimeout(() => {
        const inputField = document.querySelector('.input-box input');
        if (!inputField.value) {
            wrapper.classList.remove('active-popup');
        }
    }, 10000);

    const inputField = document.querySelector('.input-box input');
    inputField.addEventListener('input', () => {
        clearTimeout(popupTimeout);
    });
});


iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});
