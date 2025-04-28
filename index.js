let slideIndex;
let pageUrl;

let i;
let slides;
let dots;
let slideTimer; // Timer reference

// Links
const links = {
    facebook: "https://www.facebook.com/coderstudio.19",
    instagram: "https://www.instagram.com/coderstudio.19",
    youtube: "https://www.youtube.com/@CodersStudio19",
    linkedin: "https://www.linkedin.com/in/codersstudio/",
    whatsappDesktop: "https://web.whatsapp.com/send?phone=918851193731",
    whatsappMobile: "https://wa.me/918851193731"
}; 

// let screenWidthPx;
// let screenHeightPx;
// let SW;
// let SH;
// let menuWidth;
// let brandWidth;
// let navItemsWidth;
// let visibleElementWidth;

// function sizeScreen(){
//     screenWidthPx = (screen.width);
//     screenHeightPx = screen.height;

//     SW = screenWidthPx * 0.01;
//     SH = screenHeightPx * 0.01;

//     document.getElementById('header').style.width = (100 * SW) + 'px';
//     document.getElementById('header').style.height = (10 * SH) + 'px';

//     document.body.style.width = (100 * SW) + 'px';
//     document.body.style.height = (100 * SH) + 'px';

//     document.getElementById('mainContent').style.width = (100 * SW) + 'px';
//     document.getElementById('mainContent').style.height = (90 * SH) + 'px';

//     menuWidth = document.getElementById('menu').offsetWidth;
//     brandWidth = document.getElementById('brand').offsetWidth;
//     navItemsWidth = document.getElementById('navItems').offsetWidth;

//     // Check which element is visible and calculate based on its width
//     if (screenWidthPx < 767) {
//         document.getElementById('menu').style.display = 'block';
//         document.getElementById('navItems').style.display = 'none';

//         visibleElementWidth = document.getElementById('menu').offsetWidth;
//         console.log('menu');
//     } 
//     else if (screenWidthPx > 767) {
//         document.getElementById('menu').style.display = 'none';
//         document.getElementById('navItems').style.display = 'flex';

//         visibleElementWidth = document.getElementById('navItems').offsetWidth;
//         console.log('navItems');
//     }

//     // console.log(screenWidthPx);
//     // console.log(visibleElementWidth);
//     // console.log(brandWidth);

//     document.getElementById('navMenu').style.marginLeft = (screenWidthPx - visibleElementWidth - brandWidth) + 'px';
// }

function toggleMenu() {
    const dropMenu = document.getElementById('dropMenu');
    dropMenu.classList.toggle('hidden'); // Toggle the 'hidden' class
}

function selectNavItem(element) {
    // Remove 'selected' class from all nav items 
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('selected');
    });

    // Add 'selected' class to clicked item 
    element.classList.add('selected');

    // Close the menu if it's open
    const dropMenu = document.getElementById('dropMenu');
    if (!dropMenu.classList.contains('hidden')) {
        dropMenu.classList.add('hidden');
    }

    if ((element.id === 'home') || (element.id === 'homeDrop')) {
        pageUrl = 'home/home.html';
    }

    else if ((element.id === 'about') || (element.id === 'aboutDrop')) {
        pageUrl = 'about/about.html';
    }
    else if ((element.id === 'courses') || (element.id === 'coursesDrop')) {
        pageUrl = 'courses/courses.html';
    }
    
    else if ((element.id === 'book') || (element.id === 'bookDrop')) {
        pageUrl = 'book/book.html';
    }
    else if ((element.id === 'contact') || (element.id === 'contactDrop')) {
        pageUrl = 'contact/contact.html';
    }
    // console.log(pageUrl);
    fetch(pageUrl).then(response => response.text()).then(html => {
        document.getElementById('mainContent').innerHTML = html;

        // Remove any previously added scripts with data-content-script attribute 
        document.querySelectorAll('script[data-content-script]').forEach(script => {
            script.remove();
        });

        // Find all script tags in the loaded HTML 
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const scripts = tempDiv.querySelectorAll('script');

        // Execute each script 
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.setAttribute('data-content-script', 'true');

            // Tag the script for future removal 
            if (script.src) {
                newScript.src = script.src; 	// For external scripts 
            }
            else {
                newScript.textContent = script.textContent; // For inline scripts 
            }
            document.body.appendChild(newScript);
        });
    })
        .catch(error => console.error('Error loading page:', error));
}

// Close dropMenu if clicked outside
document.addEventListener('click', function (event) {
    const menuButton = document.getElementById('menuButton');
    const dropMenu = document.getElementById('dropMenu');

    if (!menuButton.contains(event.target) && !dropMenu.contains(event.target)) {
        if (!dropMenu.classList.contains('hidden')) {
            dropMenu.classList.add('hidden');
        }
    }
});


//navbar default selection 
document.addEventListener('DOMContentLoaded', () => {

    // Load 'home.html' by default 
    // sizeScreen();

    const defaultNavItem = document.getElementById('home');
    selectNavItem(defaultNavItem);
}); 

screen.orientation.addEventListener("change", function (e) {
    // Do something on change
    // sizeScreen();
    console.log(e);
});

screen.addEventListener("change", function (e) {
    // Do something on change
    // sizeScreen();
    console.log(e);
});

screen.addEventListener("change", (event) => {
    console.log(event);
 });