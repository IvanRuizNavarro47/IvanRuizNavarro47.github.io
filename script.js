// ===== EFECTO DE TEXTO DINÁMICO EN LA SECCIÓN INICIO =====
const texto = ["Desarrollador Web", "Programador Java", "Apasionado por el diseño"];
let i = 0;
let j = 0;
let borrando = false;
const velocidad = 120; // velocidad de escritura
const pausa = 1800; // pausa antes de borrar
const textoElemento = document.createElement("span");

const h2 = document.querySelector(".hero h2");
if (h2) {
  h2.appendChild(document.createElement("br"));
  h2.appendChild(textoElemento);
}

function escribir() {
  const palabra = texto[i];

  if (!borrando) {
    textoElemento.textContent = palabra.substring(0, j + 1);
    j++;

    if (j === palabra.length) {
      borrando = true;
      setTimeout(escribir, pausa);
      return;
    }
  } else {
    textoElemento.textContent = palabra.substring(0, j - 1);
    j--;

    if (j === 0) {
      borrando = false;
      i = (i + 1) % texto.length;
    }
  }

  setTimeout(escribir, velocidad);
}

escribir();

// ===== EFECTO DE SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  enlace.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(enlace.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== ANIMACIÓN AL HACER SCROLL (fade-in) =====
const elementos = document.querySelectorAll("section");

function mostrarElementos() {
  const ventanaAltura = window.innerHeight;

  elementos.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < ventanaAltura - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", mostrarElementos);

document.querySelectorAll("section").forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.8s ease";
});

mostrarElementos();

// ===== CARGAR TODOS LOS REPOSITORIOS DE GITHUB =====
const githubUser = "IvanRuizNavarro47";
const reposContainer = document.querySelector(".project-container");

async function fetchRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100`);
    const repos = await response.json();

    // Ordenar por fecha de actualización (más recientes primero)
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    reposContainer.innerHTML = "";

    repos.forEach(repo => {
      const nombre = repo.name.toLowerCase();
      const descripcion = repo.description ? repo.description.toLowerCase() : "";

      // 🔹 Filtros para excluir repositorios
      if (nombre.includes("no-publicado") || nombre.includes("nopublicado")) return;
      if (descripcion.includes("no publicado") || descripcion.includes("privado")) return;

      // Crear tarjeta
      const card = document.createElement("div");
      card.className = "project-card";

      const lenguaje = repo.language ? `<span class="lenguaje">${repo.language}</span>` : "";

      card.innerHTML = `
        <h3>${repo.name}</h3>
        ${lenguaje}
        <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
      `;

      reposContainer.appendChild(card);
    });

    // ❌ Eliminamos el bloque del proyecto manual "no publicado"
    // Si algún día quieres mostrarlo, puedes volver a añadirlo aquí

    if (reposContainer.innerHTML.trim() === "") {
      reposContainer.innerHTML = "<p>No se encontraron repositorios públicos.</p>";
    }

  } catch (error) {
    console.error("Error al cargar repositorios:", error);
    reposContainer.innerHTML = "<p>No se pudieron cargar los repositorios.</p>";
  }
}

fetchRepos();
