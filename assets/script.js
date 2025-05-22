// Import the Supabase client instance from auth.js
// Ensure the path to auth.js is correct relative to script.js
// If auth.js is in the root and script.js is in assets/, the path might be '../auth.js'
import { supabase } from './auth.js'; // Adjust path if auth.js is not in the parent directory

document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.wrapper.form-container');
    const iconClose = document.querySelector('.icon-close');
    const btnSignInHeader = document.querySelector('#signInBtnHeader'); // Main "Sign In" button in header
    const logoutBtnHeader = document.querySelector('#logoutBtnHeader');
    const userInfoDisplay = document.querySelector('#userInfo');
    const globalMessage = document.getElementById('globalMessage');

    const loginFormCard = document.querySelector('.form-card.login');
    const registerFormCard = document.querySelector('.form-card.register');
    const registerLinkInLogin = document.querySelector('.form-card.login .register-link');
    const loginLinkInRegister = document.querySelector('.form-card.register .login-link');

    // Forms
    const loginFormSupabase = document.getElementById('loginFormSupabase');
    const registerFormSupabase = document.getElementById('registerFormSupabase');

    // --- Utility to show global messages ---
    function showGlobalMessage(message, type = 'info', duration = 3000) {
        if (!globalMessage) return;
        globalMessage.textContent = message;
        globalMessage.style.backgroundColor = type === 'error' ? '#d9534f' : (type === 'success' ? '#5cb85c' : '#333');
        globalMessage.style.display = 'block';
        setTimeout(() => {
            globalMessage.style.display = 'none';
        }, duration);
    }

    // --- Popup visibility functions ---
    function openPopup(formToShow = 'login') {
        if (!wrapper) return;
        wrapper.classList.add('active-popup');
        if (formToShow === 'login') {
            if (loginFormCard) loginFormCard.classList.add('active-form');
            if (registerFormCard) registerFormCard.classList.remove('active-form');
        } else if (formToShow === 'register') {
            if (registerFormCard) registerFormCard.classList.add('active-form');
            if (loginFormCard) loginFormCard.classList.remove('active-form');
        }
    }

    function closePopup() {
        if (!wrapper) return;
        wrapper.classList.remove('active-popup');
        // It's good practice to also ensure no form is 'active-form' when popup is closed
        if (loginFormCard) loginFormCard.classList.remove('active-form');
        if (registerFormCard) registerFormCard.classList.remove('active-form');
    }

    // --- Event Listeners for Popup Controls ---
    if (btnSignInHeader) {
        btnSignInHeader.addEventListener('click', () => openPopup('login'));
    }
    if (iconClose) {
        iconClose.addEventListener('click', closePopup);
    }
    if (wrapper) { // Click outside popup to close
        wrapper.addEventListener('click', (event) => {
            if (event.target === wrapper) {
                closePopup();
            }
        });
    }
    if (registerLinkInLogin) {
        registerLinkInLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginFormCard) loginFormCard.classList.remove('active-form');
            if (registerFormCard) registerFormCard.classList.add('active-form');
            // If your CSS uses .wrapper.active for slide: wrapper.classList.add('active');
        });
    }
    if (loginLinkInRegister) {
        loginLinkInRegister.addEventListener('click', (e) => {
            e.preventDefault();
            if (registerFormCard) registerFormCard.classList.remove('active-form');
            if (loginFormCard) loginFormCard.classList.add('active-form');
            // If your CSS uses .wrapper.active for slide: wrapper.classList.remove('active');
        });
    }

    // --- Supabase Authentication ---
    if (supabase) { // Proceed only if Supabase client is initialized
        // Handle Login
        if (loginFormSupabase) {
            loginFormSupabase.addEventListener('submit', async (event) => {
                event.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;

                showGlobalMessage('Logging in...', 'info', 1500);
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    showGlobalMessage(`Login failed: ${error.message}`, 'error');
                    console.error('Login error:', error);
                } else {
                    showGlobalMessage('Login successful!', 'success');
                    console.log('Logged in user:', data.user);
                    closePopup(); // Close popup on successful login
                    // UI update will be handled by onAuthStateChange
                }
            });
        }

        // Handle Registration
        if (registerFormSupabase) {
            registerFormSupabase.addEventListener('submit', async (event) => {
                event.preventDefault();
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                // const username = document.getElementById('registerUsername').value; // Optional
                const agreeTerms = document.getElementById('registerAgreeTerms').checked;

                if (!agreeTerms) {
                    showGlobalMessage('You must agree to the terms and conditions.', 'error');
                    return;
                }
                 if (password.length < 6) {
                    showGlobalMessage('Password must be at least 6 characters.', 'error');
                    return;
                }

                showGlobalMessage('Registering...', 'info', 1500);
                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    // You can add user metadata here if needed:
                    // options: {
                    //   data: { username: username, full_name: 'Some Name' }
                    // }
                });

                if (error) {
                    showGlobalMessage(`Registration failed: ${error.message}`, 'error');
                    console.error('Registration error:', error);
                } else {
                     if (data.session === null && data.user) {
                        // User created, email confirmation likely needed
                        showGlobalMessage('Registration successful! Please check your email to confirm your account.', 'success', 5000);
                    } else if (data.session && data.user) {
                        // User created and session active (e.g., auto-confirmation enabled)
                        showGlobalMessage('Registration successful and logged in!', 'success');
                        closePopup();
                    } else {
                        // Fallback, perhaps user already exists but is unconfirmed
                        showGlobalMessage('Registration submitted. If you are a new user, please check your email.', 'info', 5000);
                    }
                    console.log('Registered user data:', data);
                }
            });
        }

        // Handle Logout
        if (logoutBtnHeader) {
            logoutBtnHeader.addEventListener('click', async () => {
                showGlobalMessage('Logging out...', 'info', 1500);
                const { error } = await supabase.auth.signOut();
                if (error) {
                    showGlobalMessage(`Logout failed: ${error.message}`, 'error');
                    console.error('Logout error:', error);
                } else {
                    showGlobalMessage('Logged out successfully.', 'success');
                    // UI update will be handled by onAuthStateChange
                }
            });
        }

        // --- Manage UI based on Auth State ---
        supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session);
            if (session) {
                // User is logged in
                if (userInfoDisplay) {
                    userInfoDisplay.textContent = `Logged in as: ${session.user.email}`;
                    userInfoDisplay.classList.remove('hidden');
                }
                if (btnSignInHeader) btnSignInHeader.classList.add('hidden');
                if (logoutBtnHeader) logoutBtnHeader.classList.remove('hidden');
                if (wrapper && wrapper.classList.contains('active-popup')) { // Close popup if user logs in
                    closePopup();
                }
            } else {
                // User is logged out
                if (userInfoDisplay) {
                    userInfoDisplay.textContent = '';
                    userInfoDisplay.classList.add('hidden');
                }
                if (btnSignInHeader) btnSignInHeader.classList.remove('hidden');
                if (logoutBtnHeader) logoutBtnHeader.classList.add('hidden');
            }
        });

        // Check initial session state when the page loads
        // This is important if the user was already logged in
        async function checkInitialSession() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                console.log('Initial session found:', session);
                if (userInfoDisplay) {
                    userInfoDisplay.textContent = `Logged in as: ${session.user.email}`;
                    userInfoDisplay.classList.remove('hidden');
                }
                if (btnSignInHeader) btnSignInHeader.classList.add('hidden');
                if (logoutBtnHeader) logoutBtnHeader.classList.remove('hidden');
            } else {
                console.log('No initial session.');
                if (userInfoDisplay) userInfoDisplay.classList.add('hidden');
                if (btnSignInHeader) btnSignInHeader.classList.remove('hidden');
                if (logoutBtnHeader) logoutBtnHeader.classList.add('hidden');
            }
        }
        checkInitialSession();

    } else {
        console.error("Supabase client is not available in script.js. Auth features will not work.");
        showGlobalMessage("Application Error: Cannot connect to services.", "error", 0);
    }


    // --- Hamburger Menu Logic (Your existing logic) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("no-scroll"); // Example for scroll lock
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            if (hamburger.classList.contains("active")) { // Only if menu is open
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("no-scroll");
            }
        }));
    }
});
