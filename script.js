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


// ==== CARGAR PROYECTOS DESDE GITHUB ====
const username = "IvanRuizNavarro47";
const proyectosContainer = document.getElementById("proyectos-grid");

async function cargarRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    );
    if (!res.ok) throw new Error("Error en la respuesta de GitHub");

    const repos = await res.json();
    const proyectos = repos.filter((repo) => !repo.fork && !repo.private);

    proyectosContainer.innerHTML = "";

    proyectos.forEach((repo) => {
      const lenguaje = repo.language || "Lenguaje no detectado";
      const card = document.createElement("div");
      card.classList.add("proyecto");
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p class="lenguajes"><strong>Tecnologías:</strong> ${lenguaje}</p>
        <div class="links">
          <a href="${repo.html_url}" target="_blank">💻 Ver código</a>
          ${
            repo.homepage
              ? `<a href="${repo.homepage}" target="_blank">🌐 Ver demo</a>`
              : ""
          }
        </div>
      `;
      proyectosContainer.appendChild(card);
      observer.observe(card); // 👈 ahora también los observa dinámicamente
    });
  } catch (error) {
    console.error(error);
    proyectosContainer.innerHTML =
      "<p>No se pudieron cargar los proyectos 😔</p>";
  }
}

cargarRepos();
