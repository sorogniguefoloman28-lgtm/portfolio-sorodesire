document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    const backTop = document.getElementById("backTop");
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    // Header sticky + bouton retour en haut
    const updateScroll = () => {
        const isScrolled = window.scrollY > 40;
        header.classList.toggle("sticky", isScrolled);
        backTop.classList.toggle("show", window.scrollY > 500);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    // Menu mobile
    menuToggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fermer le menu" : "Ouvrir le menu"
        );
    });

    document.querySelectorAll(".navbar a").forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        });
    });

    // Retour en haut
    backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Validation simple du formulaire
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        formMessage.className = "form-message";

        if (!name || !email || !message) {
            formMessage.textContent = "Veuillez remplir tous les champs.";
            formMessage.classList.add("error");
            return;
        }

        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailIsValid) {
            formMessage.textContent = "Veuillez saisir une adresse e-mail valide.";
            formMessage.classList.add("error");
            return;
        }

        formMessage.textContent =
            "Merci ! Votre message a bien été préparé. Pour recevoir réellement les messages, il faudra connecter le formulaire à un service ou à un serveur.";
        formMessage.classList.add("success");

        contactForm.reset();
    });
});
