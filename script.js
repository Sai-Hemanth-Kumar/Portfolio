// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const isDark = document.body.classList.contains('dark-mode');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = isDark ? '#181818' : 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = isDark ? '#181818' : '#fff';
    }
});

// Add animation to skill tags
const skillTags = document.querySelectorAll('.skill-tags span');
skillTags.forEach(tag => {
    tag.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    tag.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Image modal logic for expandable images
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('imgModalImg');
const modalClose = document.getElementById('imgModalClose');

// Open modal on image click
Array.from(document.querySelectorAll('.expandable-img')).forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('show');
        modalImg.src = this.getAttribute('data-img') || this.src;
        modalImg.alt = this.alt || 'Expanded Image';
    });
});

// Close modal on X click
modalClose.addEventListener('click', function() {
    modal.classList.remove('show');
    modalImg.src = '';
});

// Close modal on outside click
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('show');
        modalImg.src = '';
    }
});

// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    document.querySelector('.navbar').style.backgroundColor = '#181818';
} else {
    document.querySelector('.navbar').style.backgroundColor = '#fff';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const navbar = document.querySelector('.navbar');
    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
        navbar.style.backgroundColor = '#181818';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
        navbar.style.backgroundColor = '#fff';
    }
});

// Contact Form Success Popup for Formspree
const contactForm = document.getElementById('contactForm');
const successPopup = document.getElementById('successPopup');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const action = contactForm.getAttribute('action');
        const response = await fetch(action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            // Show animated popup
            if (successPopup) {
                successPopup.classList.add('show');
                setTimeout(() => {
                    successPopup.classList.remove('show');
                }, 3000);
            }
            contactForm.reset();
        } else {
            alert('Oops! There was a problem submitting your form. Please try again.');
        }
    });
} 