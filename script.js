// Handle hamburger menu toggle for mobile view
document.getElementById('hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
    const skillCircles = document.querySelectorAll(".skill-circle");

    // Function to animate skill circles
    const animateSkills = (circle, percent) => {
        let currentPercent = 0;
        const step = percent / 100; // Calculate the increment step

        const interval = setInterval(() => {
            if (currentPercent >= percent) {
                clearInterval(interval);
            } else {
                currentPercent += step;
                circle.style.setProperty('--percent', currentPercent.toFixed(2));
                circle.querySelector(".inner-circle span").innerText = Math.round(currentPercent) + '%';
            }
        }, 30); // Animation speed (interval in milliseconds)
    };

    // Check if an element is in the viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Handle scroll event to trigger animation
    const handleScroll = () => {
        skillCircles.forEach(circle => {
            const percent = parseInt(circle.getAttribute("data-percent"));
            if (isInViewport(circle) && circle.getAttribute('data-animated') !== 'true') {
                animateSkills(circle, percent);
                circle.setAttribute('data-animated', 'true'); // Mark circle as animated
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on load
});

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Function to remove active class from all links
    const removeActiveClasses = () => {
        navLinks.forEach(link => link.classList.remove('active'));
    };

    // Function to add active class to the current section link
    const addActiveClass = (id) => {
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    };

    // Function to handle scroll and highlight
    const handleScroll = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 50) { // Adjust offset if needed
                currentSection = section.getAttribute('id');
            }
        });

        removeActiveClasses();
        addActiveClass(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    // Smooth scroll on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            removeActiveClasses();
            this.classList.add('active');
        });
    });
});
