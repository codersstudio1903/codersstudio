slideIndex = 0;

function showSlides(n = null) {
    slides = document.getElementsByClassName("homeSlides");
    dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if(n !== null){
        slideIndex = n;
    }
    else{
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    clearTimeout(slideTimer);
    slideTimer = setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Handle dot click
function currentSlide(n) {
    showSlides(n);
}

// Handle next/previous controls
function plusSlides(n) {
    if (slideIndex >= slides.length) { slideIndex = 0 }
    showSlides(slideIndex + n);
}
function minusSlides(n) {
    if (slideIndex == 1) { slideIndex = 5 }
    showSlides(slideIndex + n);
}


showSlides();

// Add click listeners to dots
dots = document.getElementsByClassName("dot");
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => {
        currentSlide(i + 1);
    });
}

function goToCourse(courseId) {
    selectNavItem(document.getElementById('courses'));

    // AFTER loading, scroll to the specific course
    setTimeout(() => {
        const courseSection = document.getElementById(courseId);
        if (courseSection) {
            courseSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100); // Small delay to make sure content is rendered
}