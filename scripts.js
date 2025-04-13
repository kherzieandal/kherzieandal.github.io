// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
            });
        }

        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }
    });
});

// Highlight active nav links based on scroll position
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    let scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.add("active");
        } else {
            document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.remove("active");
        }
    });
});
