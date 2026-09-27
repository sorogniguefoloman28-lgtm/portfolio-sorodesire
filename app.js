
/* =========================================================
   PORTFOLIO SORODESIRE
   JavaScript principal
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Fermer le menu après avoir cliqué sur un lien */

    const links = navLinks.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   MODE SOMBRE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("dark-mode")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            localStorage.setItem("theme", "dark");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            localStorage.setItem("theme", "light");

        }

    });

}


/* =========================================================
   RESTAURER LE THÈME
========================================================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {

        const icon = themeToggle.querySelector("i");

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }

}


/* =========================================================
   HEADER AU DÉFILEMENT
========================================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 10px 35px rgba(0, 0, 0, 0.18)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* =========================================================
   LIEN ACTIF DANS LA NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


/* =========================================================
   BOUTON RETOUR EN HAUT
========================================================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   ANIMATION DES ÉLÉMENTS AU DÉFILEMENT
========================================================= */

const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .timeline-item, .about-content, .about-image, .why-content, .why-image, .contact-info, .contact-form"
);


const animationObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach(element => {

    element.classList.add("animate-on-scroll");

    animationObserver.observe(element);

});


/* =========================================================
   ANIMATION DES BARRES DE COMPÉTENCES
========================================================= */

const skillBars = document.querySelectorAll(".skill-bar span");

const skillObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const bar = entry.target;

                const width = bar.style.width;

                bar.style.width = "0%";

                setTimeout(() => {

                    bar.style.width = width;

                }, 200);

                observer.unobserve(bar);

            }

        });

    },
    {
        threshold: 0.5
    }
);


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =========================================================
   FORMULAIRE DE CONTACT
========================================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !email || !subject || !message) {

            alert(
                "Veuillez remplir tous les champs du formulaire."
            );

            return;

        }


        /*
         * Pour l'instant, le formulaire ouvre le logiciel
         * de messagerie de l'utilisateur.
         */

        const destination =
            "sorodesire208@gmail.com";


        const mailSubject =
            encodeURIComponent(
                subject + " — Portfolio SORODESIRE"
            );


        const mailBody =
            encodeURIComponent(
                "Nom : " + name +
                "\nEmail : " + email +
                "\n\nMessage :\n" + message
            );


        window.location.href =
            `mailto:${destination}?subject=${mailSubject}&body=${mailBody}`;

    });

}


/* =========================================================
   ANIMATION DES CHIFFRES / COMPTEURS
========================================================= */

const counters = document.querySelectorAll("[data-counter]");

function animateCounter(element) {

    const target =
        parseInt(element.dataset.counter);

    let current = 0;

    const duration = 1500;

    const increment =
        target / (duration / 20);


    const counter = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(counter);

        }

        element.textContent =
            Math.floor(current);

    }, 20);

}


if (counters.length > 0) {

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.7
        }
    );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/* =========================================================
   ANNÉE AUTOMATIQUE DU FOOTER
========================================================= */

const footerYear =
    document.querySelector(".footer-bottom p");

if (footerYear) {

    const currentYear =
        new Date().getFullYear();

    footerYear.innerHTML =
        `© ${currentYear} SORODESIRE. Tous droits réservés.`;

}


/* =========================================================
   PROTECTION CONTRE LES LIENS #
========================================================= */

const emptyLinks =
    document.querySelectorAll('a[href="#"]');

emptyLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

    });

});


/* =========================================================
   MESSAGE DE DÉMARRAGE
========================================================= */

console.log(
    "Portfolio SORODESIRE chargé avec succès 🚀"
);
```

### ⚠️ Ajoute aussi ceci à la fin de ton `style.css`

Le JavaScript utilise les classes `.animate-on-scroll` et `.visible`. Ajoute ce petit bloc :

```css
/* =========================================================
   ANIMATIONS JAVASCRIPT
========================================================= */

.animate-on-scroll {
    opacity: 0;
    transform: translateY(35px);
    transition:
        opacity 0.7s ease,
        transform 0.7s ease;
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}



