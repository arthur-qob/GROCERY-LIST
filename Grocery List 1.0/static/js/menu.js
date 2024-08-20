function login() {
    var btn = document.querySelector('#btn');
    var login = document.querySelector('#login');
    var signin = document.querySelector('#signin');
    var form_box = document.querySelector('.form-box');

    // window.scrollTo(0, 0);
    
    btn.style.left = "0";
    // btn.style.animation = "animation: gradientSwitch1 1s";
    login.style.left = "60px";
    signin.style.left = "500px";
    form_box.style.width = "450px";
    form_box.style.height = "500px";
};

// ---------------------------------------------------------------------------------------------------------------------

function signin() {
    var btn = document.querySelector('#btn');
    var login = document.querySelector('#login');
    var signin = document.querySelector('#signin');
    var form_box = document.querySelector('.form-box');

    // window.scrollTo(0, 65);

    btn.style.left = "110px";
    // btn.style.animation = "animation: gradientSwitch2 1s";
    login.style.left = "-500px";
    signin.style.left = "30px";
    form_box.style.width = "550px";
    form_box.style.height = "650px";
    formatSignInPage();
};

// ---------------------------------------------------------------------------------------------------------------------

function showPassword(index) {
    var password_field = document.querySelector(`#password-field-${index}`);
    var eye_icon = document.querySelector(`#eye-icon-${index}`);

    if (password_field != null && eye_icon != null) {
        if (password_field.type === 'password') {
            password_field.type = 'text';
            eye_icon.className = 'fa-solid fa-eye eye-icon';
        }
        
        else {
            password_field.type = 'password';
            eye_icon.className = 'fa-solid fa-eye-slash eye-icon';
        }
    }

    else {
        console.log('Password field or eye icon not found');
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    function formatSignInPage() {   
        const currentYear = new Date().getFullYear();
        const yearSelector = document.querySelector('.year-selector');
        
        yearSelector.innerHTML = "<option value='Year'>Year</option>";
        
        for (let i = currentYear; i >= (currentYear - 100); --i) {
            const option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            yearSelector.add(option);
        }
        
        document.querySelector('.month-selector').addEventListener('change', function () {
            const daySelector = document.querySelector('.day-selector');
            
            const selectedMonth = parseInt(this.value);
            
            daySelector.innerHTML = "<option value='Day'>Day</option>";
            
            const daysInMonth = new Date(currentYear, selectedMonth, 0).getDate();
            
            for (let i = 1; i <= daysInMonth; ++i) {
                const option = document.createElement('option');
                option.value = i;
                option.innerHTML = i;
                daySelector.add(option);
            }
        });
    };
});