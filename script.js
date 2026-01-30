
// ==== TYPING EFFECT ====
const roles = [
  "Desarrollador Web",
  "Programador Java",
  "Apasionado por la tecnología",
];
const rolElemento = document.querySelector(".rol");
let index = 0;

function cambiarRol() {
  rolElemento.textContent = "";
  const texto = roles[index];
  let i = 0;

  function escribir() {
    if (i < texto.length) {
      rolElemento.textContent += texto[i];
      i++;
      setTimeout(escribir, 100);
    } else {
      setTimeout(borrar, 1500);
    }
  }

  function borrar() {
    if (i > 0) {
      rolElemento.textContent = texto.substring(0, i - 1);
      i--;
      setTimeout(borrar, 60);
    } else {
      index = (index + 1) % roles.length;
      cambiarRol();
    }
  }

  escribir();
}
cambiarRol();

// ==== ANIMACIONES CON INTERSECTION OBSERVER ====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // deja de observar cuando ya es visible
      }
    });
  },
  { threshold: 0.1 }
);

// === Observar elementos estáticos (tecnologías, secciones, etc.) ===
document.querySelectorAll(".tech, section, h2, p").forEach((el) => {
  observer.observe(el);
document.querySelectorAll('.formacion-item').forEach((el) => observer.observe(el));

});
document.querySelectorAll(".formacion-item").forEach((el) => {
  observer.observe(el);
});


// ==== CARGAR PROYECTOS DESDE ARRAY LOCAL ====

// Contenedor de proyectos
const proyectosContainer = document.getElementById("proyectos-grid");

const proyectos = [
  {
    nombre: "Agitana",
    descripcion: "Aplicación destinada a facilitar la asistencia a personas con recursos limitados, permitiendo que quienes necesiten ayuda puedan contactar con nosotros de manera rápida y sencilla para recibir apoyo.",
    frontend: "Angular, HTML, CSS",
    backend: "Java",
    imagen: "assets/images/AgitanaWeb.png",
    enlaceFrontend: "https://github.com/IvanRuizNavarro47/Agitana",
    enlaceBackend: "https://github.com/IvanRuizNavarro47/Agitana_BackEnd"

  },
  {
    nombre: "Alameda TV",
    descripcion: "Plataforma de streaming de videos en línea con suscripciones a canales, chat integrado y organización del contenido mediante etiquetas y filtros.",
    frontend: "Angular, HTML, SCSS, CSS",
    backend: "PHP",
    imagen: "assets/images/AlamedaTV1.png",
    enlaceFrontend: "https://github.com/IvanRuizNavarro47/AlamedaTVFront",
    enlaceBackend: "https://github.com/IvanRuizNavarro47/AlamedaTVBack"
  },
  {
    nombre: "Berlin Pilates",
    descripcion: "Aplicación web para gestionar reservas y clientes de un estudio de pilates. Permite a los usuarios registrarse, ver horarios e instalaciones disponibles.",
    frontend: "Angular, HTML, SCSS",
    backend: "Java con Spring Boot",
    imagen: "assets/images/BerlinPilates1.png",
    enlaceFrontend: "https://github.com/IvanRuizNavarro47/berlinpilates.git",
    enlaceBackend: "https://github.com/IvanRuizNavarro47/PilatesBerlin_Backend"
  },
  {
    nombre: "Gestor de Tareas",
    descripcion: "Aplicación web para crear, modificar y eliminar tareas, con autenticación de usuarios y almacenamiento en backend.",
    frontend: "JavaScript, HTML, CSS",
    backend: "Java",
    imagen: "assets/images/Gestor de tareas1.png",
    enlaceFrontend: "https://github.com/IvanRuizNavarro47/gestor-tareas-frontend",
    enlaceBackend: "https://github.com/IvanRuizNavarro47/gestor-tareas"
  },
  {
    nombre: "Noisy Chestnut",
    descripcion: "Red social para compartir y descubrir música, con perfiles de usuario, publicaciones, comentarios y sistema de seguidores, además de eventos musicales.",
    frontend: "JavaScript, HTML, CSS",
    backend: "Java con Spring Boot",
    imagen: "assets/images/Noisy-Chestnut1.png",
    enlaceBackend: "https://github.com/IvanRuizNavarro47/noisy-chestnut"
  },
  {
    nombre: "Olimpus Store",
    descripcion: "Tienda online para venta de productos basada en la temática de la mitología, con carrito de compras y gestión de usuarios.",
    frontend: "JavaScript, HTML, CSS",
    backend: "Java",
    imagen: "assets/images/OlimpusStore.png"
  },
  {
    nombre: "Estudio Pilates Berlin",
    descripcion: "Página web corporativa para un estudio de pilates, mostrando información de clases, horarios y contacto.",
    frontend: "HTML, CSS, JavaScript",
    backend: "",
    imagen: "assets/images/PilatesBerlin1.png",
    enlaceFrontend: "https://github.com/IvanRuizNavarro47/PilatesBerlin"
  },
    {
    nombre: "Página web Salvador Navarro León",
    descripcion: "Página web realizada al escritor Salvador Navarro León, mostrando su biografía y obras literarias.",
    frontend: "Wix",
    backend: "",
    imagen: "assets/images/SalvadorNavarro.png",
    enlaceFrontend: "https://www.salvador-navarro.com/"
   },
    {
    nombre: "Prueba Minty Host 2026",
    descripcion: "Caso práctico para la prueba técnica de Minty Host 2026.",
    frontend: "Wix",
    backend: "",
    imagen: "assets/images/MintyHost2026.png",
    enlaceFrontend: "assets/images/MintyHost.png"
  }
  
];
proyectos.forEach((proyecto) => {
  const card = document.createElement("div");
  card.classList.add("proyecto-card");
  card.innerHTML = `
    <img src="${proyecto.imagen}" alt="${proyecto.nombre}" />
    <h3>${proyecto.nombre}</h3>
    <p>${proyecto.descripcion}</p>
    <p><strong>Tecnologías:</strong> Frontend: ${proyecto.frontend}${proyecto.backend ? " | Backend: " + proyecto.backend : ""}</p>
    <div class="links">
      ${proyecto.enlaceFrontend ? `<a href="${proyecto.enlaceFrontend}" target="_blank">💻 Ver Frontend</a>` : ""}
      ${proyecto.enlaceBackend ? `<a href="${proyecto.enlaceBackend}" target="_blank">💻 Ver Backend</a>` : ""}
    </div>
  `;
  proyectosContainer.appendChild(card);
  observer.observe(card);
});


// ==== ANIMACIÓN AL HACER SCROLL (PROYECTOS) ====
const observerProyectos = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerProyectos.unobserve(entry.target); // evita reanimar cada vez
      }
    });
  },
  { threshold: 0.1 }
);

// Espera a que los proyectos se carguen
document.addEventListener("DOMContentLoaded", () => {
  const proyectos = document.querySelectorAll(".proyecto-card");
  proyectos.forEach((proyecto) => observerProyectos.observe(proyecto));
});


// ==== ANIMACIÓN STACK PRINCIPAL ====
const observerStack = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerStack.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Observa cada elemento del stack
document.addEventListener("DOMContentLoaded", () => {
  const stacks = document.querySelectorAll(".stack");
  stacks.forEach((stack) => observerStack.observe(stack));
});



