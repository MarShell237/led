document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('nav ul');

    toggleButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        toggleButton.innerHTML = navMenu.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });
// connexion

});document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const submitButton = document.querySelector('.btn');

    const passwordCriteria = document.getElementById('password-criteria');
    const lengthCriteria = document.getElementById('length');
    const uppercaseCriteria = document.getElementById('uppercase');
    const specialCriteria = document.getElementById('special');

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const isLongEnough = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[\W_]/.test(password);

        lengthCriteria.className = isLongEnough ? 'valid' : 'invalid';
        uppercaseCriteria.className = hasUppercase ? 'valid' : 'invalid';
        specialCriteria.className = hasSpecialChar ? 'valid' : 'invalid';

        return isLongEnough && hasUppercase && hasSpecialChar;
    }

    passwordInput.addEventListener('input', () => {
        // Affiche les critères lors de la saisie
        passwordCriteria.style.display = 'block';

        // Valide le mot de passe
        const passwordValid = validatePassword(passwordInput.value);
        submitButton.disabled = !passwordValid;
    });

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const emailValid = validateEmail(emailInput.value);
        const passwordValid = validatePassword(passwordInput.value);

        emailError.style.display = emailValid ? 'none' : 'block';
        emailError.textContent = emailValid
            ? ''
            : "L'email doit suivre le format exemple@domaine.com";

        passwordError.style.display = passwordValid ? 'none' : 'block';
        passwordError.textContent = passwordValid
            ? ''
            : 'Votre mot de passe ne respecte pas tous les critères.';

        if (emailValid && passwordValid) {
            alert('Connexion réussie !');
        }
    });
});
// inscription
document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const submitButton = document.querySelector('.btn');

    const passwordCriteria = document.getElementById('password-criteria');
    const lengthCriteria = document.getElementById('length');
    const uppercaseCriteria = document.getElementById('uppercase');
    const specialCriteria = document.getElementById('special');

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const isLongEnough = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[\W_]/.test(password);

        lengthCriteria.className = isLongEnough ? 'valid' : 'invalid';
        uppercaseCriteria.className = hasUppercase ? 'valid' : 'invalid';
        specialCriteria.className = hasSpecialChar ? 'valid' : 'invalid';

        return isLongEnough && hasUppercase && hasSpecialChar;
    }

    function validatePasswordsMatch(password, confirmPassword) {
        return password === confirmPassword;
    }

    passwordInput.addEventListener('input', () => {
        passwordCriteria.style.display = 'block';
        const passwordValid = validatePassword(passwordInput.value);
        submitButton.disabled = !(passwordValid && validatePasswordsMatch(passwordInput.value, confirmPasswordInput.value));
    });

    confirmPasswordInput.addEventListener('input', () => {
        const passwordsMatch = validatePasswordsMatch(passwordInput.value, confirmPasswordInput.value);
        confirmPasswordError.style.display = passwordsMatch ? 'none' : 'block';
        confirmPasswordError.textContent = passwordsMatch ? '' : 'Les mots de passe ne correspondent pas';
        
        const passwordValid = validatePassword(passwordInput.value);
        submitButton.disabled = !(passwordValid && passwordsMatch);
    });

    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const emailValid = validateEmail(emailInput.value);
        const passwordValid = validatePassword(passwordInput.value);
        const passwordsMatch = validatePasswordsMatch(passwordInput.value, confirmPasswordInput.value);

        usernameError.style.display = usernameInput.value ? 'none' : 'block';
        usernameError.textContent = usernameInput.value ? '' : 'Le nom d\'utilisateur est requis';

        emailError.style.display = emailValid ? 'none' : 'block';
        emailError.textContent = emailValid ? '' : 'L\'email doit suivre le format exemple@domaine.com';

        passwordError.style.display = passwordValid ? 'none' : 'block';
        passwordError.textContent = passwordValid ? '' : 'Votre mot de passe ne respecte pas tous les critères.';

        confirmPasswordError.style.display = passwordsMatch ? 'none' : 'block';
        confirmPasswordError.textContent = passwordsMatch ? '' : 'Les mots de passe ne correspondent pas';

        if (emailValid && passwordValid && passwordsMatch && usernameInput.value) {
            alert('Inscription réussie !');
        }
    });
});
