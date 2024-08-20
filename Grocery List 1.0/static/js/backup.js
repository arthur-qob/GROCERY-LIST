function login() {
    var btn = document.querySelector('#btn');
    var login = document.querySelector('#login');
    var signin = document.querySelector('#signin');
    var form_box = document.querySelector('.form-box');
    
    btn.style.left = "0";
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

    btn.style.left = "110px";
    login.style.left = "-500px";
    signin.style.left = "30px";
    form_box.style.width = "550px";
    form_box.style.height = "650px";
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

// ---------------------------------------------------------------------------------------------------------------------

// function hideLoadingScreen() {
    
// }

function showLoadingScreen() {
    var loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
}

// Check if the document is already loaded
if (document.readyState === 'loading') {
    // It's still loading, wait for the DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', hideLoadingScreen, function() {
        window.scrollTo(0, 0);
        
        // ---------------------------------------------------------------------------------------------------------------------
        
        window.addEventListener('scroll', function() {
            var scrollPos = window.scrollY;
            var documentHeight = document.documentElement.scrollHeight;
            var scrollThreshold = documentHeight - window.innerHeight - 50;
            var footer = document.querySelector('footer');

            if (scrollPos > scrollThreshold)
                footer.style.bottom = '0';
        
            else
                footer.style.bottom = '-1000px';
        });
        
        // ---------------------------------------------------------------------------------------------------------------------
        
        current_year = new Date().getFullYear();
        year_selector = document.querySelector('.year-selector');
        
        year_selector.innerHTML = "<option value = 'Year'>Year</option>";
        
        for (var i = current_year; i >= (current_year - 100); --i) {
            var option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            year_selector.add(option);
        }
        
        document.querySelector('.month-selector').addEventListener('change', function () {
            var day_selector = document.querySelector('.day-selector');
            
            selected_month = parseInt(this.value);
            // current_year = new Date().getFullYear();
            
            // console.log(selected_month);
            // console.log(current_year);
            
            day_selector.innerHTML = "<option value = 'Day'>Day</option>";
            
            days_in_month = new Date(current_year, selected_month, 0).getDate();
            
            for (var i = 1; i <= days_in_month; ++i) {
                var option = document.createElement('option');
                option.value = i;
                option.innerHTML = i;
                day_selector.add(option);
            }
        });
        
        // ---------------------------------------------------------------------------------------------------------------------
        
        document.getElementsById('index-modal-item').addEventListener('change', function (){
            var price_field = document.getElementsById('index-modal-price');
            var quantity_field = document.getElementsById('index-modal-qtty');
            
            
            
            price_field.disabled = false;
            quantity_field.disabled = false;
        });
        
        // ---------------------------------------------------------------------------------------------------------------------
        
        var is_meat_checkbox = document.getElementById('addItems-is_meat-check')
        is_meat_checkbox.addEventListener('change', function (){
            var qtty_field = document.getElementById('addItems-qtty');
            
            if (is_meat_checkbox.checked) 
            qtty_field.disabled = true;
        
        else
        qtty_field.disabled = false;
});

// setTimeout(() => {
    //     $('#alert').alert('close')
    // }, 5000)
    
    // ---------------------------------------------------------------------------------------------------------------------

        // var password_fields = document.getElementsByClassName('password-field');
        // var password_fields_array = Array.from(password_fields);
        // var eye_icons = document.getElementsByClassName('eye-icon');
        // var eye_icons_array = Array.from(eye_icons);
        
        // for (var i = 0, k = 0; i < password_fields_array.length && k < eye_icons_array.length; ++i, ++k) {
            //     password_fields_array[i].id = `password-field-${i}`;
            //     var eye_icon = eye_icons_array[k].id = `eye-icon-${k}`;
            
            //     eye_icon.onclick = function (index) {
                //         return function () {
                    //             showPassword(index);
                    //         };
                    //     }(k);
                    // }
                });
} else {
    // The DOMContentLoaded event has already fired, hide the loading screen immediately
    hideLoadingScreen();
}