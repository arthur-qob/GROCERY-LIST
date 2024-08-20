window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM Content Loaded - ✅')

    const footerBtnShow = document.querySelector('#footer-btn');
    const footerBtnHide = document.querySelector('#footer-hide-btn');
    let footerArrow = document.querySelector('#footer-btn-arrow');
    let footer = document.querySelector('footer');

    footerBtnShow.addEventListener('click', function() {
        footer.style.bottom = '0';
        footerBtnShow.id.replace('footer-btn', 'footer-hide-btn');
        footerArrow.style.transform = 'rotate(180deg)';
        footerBtnHide.style.bottom = '725px';
    });

    footerBtnHide.addEventListener('click', function() {
        footer.style.bottom = '-1000px';
        footerBtnHide.id.replace('footer-hide-btn', 'footer-btn');
        footerArrow.style.transform = 'rotate(0deg)';
        footerBtnShow.style.bottom = '20px';
    });

    // ---------------------------------------------------------------------------------------------------------------------

    const scrollBtn = document.querySelector('#scrollUp-btn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100)
            scrollBtn.classList.add('show');

        else
            scrollBtn.classList.remove('show');
    });

    // window.addEventListener('scroll', function() {
    //     const scrollPos = window.scrollY;
    //     const documentHeight = document.documentElement.scrollHeight;
    //     const footerScrollThreshold = documentHeight - window.innerHeight - 50;
    //     const footer = document.querySelector('footer');
    //     const scrollBtn = document.querySelector('#scrollUp-btn');

    //     if (scrollPos > footerScrollThreshold)
    //         footer.style.bottom = '0';
    
    //     else
    //         footer.style.bottom = '-1000px';

    //     if (scrollPos > 100)
    //         scrollBtn.classList.add('show');
        
    //     else
    //         scrollBtn.classList.remove('show');
    // });

    // ---------------------------------------------------------------------------------------------------------------------

    // const observer = new MutationObserver(function(mutations) {
    //     for(let mutation of mutations) {
    //         if(mutation.addedNodes.length) {
    //             if(document.getElementById('index-modal-item')) {
    //                 const element = document.getElementById('index-modal-item');
    //                 element.addEventListener('change', function (){
    //                     const priceField = document.getElementById('index-modal-price');
    //                     const quantityField = document.getElementById('index-modal-qtty');
                        
    //                     priceField.disabled = false;
    //                     quantityField.disabled = false;
    //                 });
    //                 observer.disconnect();
    //                 return;
    //             }

    //             else if(document.getElementById('addItems-is_meat-check')) {
    //                 const element = document.getElementById('addItems-is_meat-check');
    //                 element.addEventListener('change', function (){
    //                     const qttyField = document.getElementById('addItems-qtty');
                        
    //                     if (this.checked) {
    //                         qttyField.disabled = true;
    //                     } else {
    //                         qttyField.disabled = false;
    //                     }
    //                 });
    //                 observer.disconnect();
    //                 return;
    //             }
    //         }
    //     }
    // });

    // observer.observe(document, { childList: true, subtree: true }); 

    // ---------------------------------------------------------------------------------------------------------------------

    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.classList.remove('hidding');
        }, 100);

        setTimeout(function() {
            alert.classList.add('hidding');
            setTimeout(function() {
                alert.remove();
            }, 500);
        }, 4000);
    });
           
    // ---------------------------------------------------------------------------------------------------------------------

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const username = document.getElementsByName('user_credentials').value;
        const password = document.getElementById('password-field-1').value;
        const rememberMe = document.getElementById('lg-cb-1').checked;
    
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, rememberMe })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/dashboard';
            } else {
                alert('Login failed!');
            }
        })
        .catch(error => console.error('Error:', error));
    });    
});