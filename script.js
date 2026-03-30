document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Responsive Navigation Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Language & Theme logic
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle  = document.getElementById('lang-toggle');
    const body = document.body;
    let isTypingActive = true;

    // Load Theme Preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });

    // Translations for Typing text
    const typeDict = {
        tr: ["Software Engineer", "Full-Stack Developer", "Yazılım Mühendisi"],
        en: ["Software Engineer", "Full-Stack Developer", "Bug Hunter"]
    };

    let currentLang = localStorage.getItem('lang') || 'tr';
    let textArray = typeDict[currentLang];

    function updateLanguageDOM(lang) {
        document.querySelectorAll('.lang-text').forEach(el => {
            if (el.getAttribute(`data-${lang}`)) {
                el.innerText = el.getAttribute(`data-${lang}`);
            }
        });
        langToggle.innerText = lang === 'tr' ? 'EN' : 'TR';
        textArray = typeDict[lang];
    }

    if (currentLang === 'en') {
        updateLanguageDOM('en');
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'tr' ? 'en' : 'tr';
        localStorage.setItem('lang', currentLang);
        updateLanguageDOM(currentLang);
    });

    // Typing Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (!isTypingActive) return;
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (!isTypingActive) return;
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // Scroll Reveal
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal();
});
