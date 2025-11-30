
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('navbarNav');
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});
navLinks.forEach((l) => {
    l.addEventListener('click', () => { if(menuToggle.classList.contains('show')) bsCollapse.toggle() })
})

// Lógica para el Dark/Light Mode
const themeToggleBtn = document.getElementById('themeToggle');
const sunIcon = themeToggleBtn.querySelector('.fa-moon');
const moonIcon = themeToggleBtn.querySelector('.fa-sun');
const htmlElement = document.documentElement;

// Función para aplicar el tema
function applyTheme(theme) {
    htmlElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        sunIcon.classList.add('d-none');
        moonIcon.classList.remove('d-none');
    } else {
        sunIcon.classList.remove('d-none');
        moonIcon.classList.add('d-none');
    }
}

// Cargar tema guardado o establecer por defecto
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    // Si no hay tema guardado, usa la preferencia del sistema o dark por defecto
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }
}

// Listener para el botón de cambio de tema
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Esperar a que cargue el contenido
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos todas las secciones y los links del menú
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Función que se ejecuta al hacer scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Iteramos sobre cada sección para ver cuál está visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // El "- 100" es un ajuste para compensar la altura de tu navbar fija.
            // Si no lo pones, la clase active cambiará recién cuando la sección toque el borde superior.
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        // Actualizamos la clase active en el menú
        navLinks.forEach(link => {
            link.classList.remove('active'); // Primero limpiamos todos
            
            // Si el href del link coincide con la sección actual, lo activamos
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

// Typewriter Effect
        const words = ["Analista de Desarrollo de Software", "& Soporte TI"];
        let i = 0;
        
        function typeWriter() {
            const heading = document.getElementById("typewriter");
            if (!heading) return;
            const word = words[i];
            let n = 0;
            
            let interval = setInterval(() => {
                heading.innerHTML = word.substring(0, n + 1);
                n++;
                if (n === word.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        let delInterval = setInterval(() => {
                            heading.innerHTML = word.substring(0, n - 1);
                            n--;
                            if (n === 0) {
                                clearInterval(delInterval);
                                i = (i + 1) % words.length;
                                typeWriter();
                            }
                        }, 50);
                    }, 2000);
                }
            }, 100);
        }
        document.addEventListener('DOMContentLoaded', typeWriter);

        // Carousel Logic
        let slideIndex = 0;
        const slides = document.getElementsByClassName("carousel-slide");

        function showSlides() {
            if(slides.length === 0) return;
            
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            
            slides[slideIndex-1].style.display = "flex";
            setTimeout(() => slides[slideIndex-1].classList.add('active'), 10);
            
            setTimeout(showSlides, 4000); 
        }
        document.addEventListener('DOMContentLoaded', showSlides);