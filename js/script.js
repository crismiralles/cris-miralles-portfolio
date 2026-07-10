// Aquí iremos añadiendo las animaciones (scroll reveal, hover, etc.)
// paso a paso, a medida que montemos cada sección.

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     EFECTO TYPEWRITER — "welcome to my portfolio"
     Solo existe en index.html, así que comprobamos que los
     elementos existan antes de ejecutar nada (evita errores
     en el resto de páginas, que comparten este mismo script.js).
     ========================================================== */
  const typewriterText = "welcome to my portfolio";
  const textEl = document.getElementById("typewriter-text");
  const cursorEl = document.getElementById("typewriter-cursor");

  if (textEl && cursorEl) {
    let charIndex = 0;

    function typeNextChar() {
      if (charIndex < typewriterText.length) {
        textEl.textContent += typewriterText.charAt(charIndex);
        charIndex++;
        // pequeña variación aleatoria en el tiempo entre letras,
        // para que no se vea mecánico
        const delay = 40 + Math.random() * 60;
        setTimeout(typeNextChar, delay);
      } else {
        // Terminó de escribir: paramos el cursor
        cursorEl.classList.add("stopped");
        revealNavLinks();
      }
    }

    // Pequeña pausa antes de empezar a escribir, para que no arranque
    // de golpe nada más cargar la página
    setTimeout(typeNextChar, 400);
  }

  /* ==========================================================
     CASCADA DE APARICIÓN DEL MENÚ
     Se llama justo cuando termina el typewriter.
     ========================================================== */
  function revealNavLinks() {
    const links = document.querySelectorAll(".home-nav-link");
    links.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add("is-visible");
      }, index * 150);
    });
  }

  /* ==========================================================
     ACORDEÓN DE PROYECTOS (ux/ui design)
     Bootstrap se encarga de mostrar/ocultar el bloque; aquí solo
     cambiamos el texto "ver más" / "ver menos" y la clase visual
     de la portada según el estado del collapse.
     ========================================================== */
  document.querySelectorAll(".project-details").forEach((detailsEl) => {
    const cover = document.querySelector(`[data-bs-target="#${detailsEl.id}"]`);
    const label = cover.querySelector(".project-toggle-label");

    detailsEl.addEventListener("show.bs.collapse", () => {
      cover.classList.add("is-open");
      label.innerHTML = 'ver menos <span class="arrow">→</span>';
    });

    detailsEl.addEventListener("hide.bs.collapse", () => {
      cover.classList.remove("is-open");
      label.innerHTML = 'ver más <span class="arrow">→</span>';
    });
  });

  /* ==========================================================
     FADE-IN EN CASCADA — about.html
     Solo existe .about-content en esa página, así que si no
     hay ningún elemento no pasa nada (querySelectorAll vacío).
     ========================================================== */
  document.querySelectorAll(".about-content .fade-in-up").forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("is-visible");
    }, 200 + index * 150);
  });

  /* ==========================================================
     SECUENCIAS DE IMÁGENES TIPO GIF
     Recorre en bucle las imágenes numeradas de una carpeta
     (ej. pc-1.jpg, pc-2.jpg, pc-3.jpg...) cambiando el src
     directamente, sin transición, como un gif real.
     Solo se reproducen al pasar el ratón por encima (si no,
     ver tres a la vez cambiando solas resulta mareante);
     el resto del tiempo se quedan quietas en la primera imagen.
     ========================================================== */
  document.querySelectorAll(".image-sequence").forEach((el) => {
    const img = el.querySelector(".image-sequence-img");
    const folder = el.dataset.folder;
    const prefix = el.dataset.prefix;
    const frames = parseInt(el.dataset.frames, 10);
    const ext = el.dataset.ext || "jpg";
    const fps = parseFloat(el.dataset.fps) || 2;

    if (!img || !folder || !prefix || !frames) return;

    // Construimos la lista de rutas: carpeta/prefijo-1.ext, carpeta/prefijo-2.ext...
    const frameUrls = [];
    for (let i = 1; i <= frames; i++) {
      frameUrls.push(`${folder}/${prefix}-${i}.${ext}`);
    }

    // Precargamos las imágenes para que no haya parpadeo al reproducirse
    frameUrls.forEach((url) => {
      const preload = new Image();
      preload.src = url;
    });

    let currentFrame = 0;
    let intervalId = null;

    function startPlaying() {
      if (intervalId) return; // ya está reproduciéndose
      el.classList.add("is-playing");
      intervalId = setInterval(() => {
        currentFrame = (currentFrame + 1) % frameUrls.length;
        img.src = frameUrls[currentFrame];
      }, 1000 / fps);
    }

    function stopPlaying() {
      clearInterval(intervalId);
      intervalId = null;
      currentFrame = 0;
      img.src = frameUrls[0]; // vuelve a la primera imagen al detener
      el.classList.remove("is-playing");
    }

    el.addEventListener("mouseenter", startPlaying);
    el.addEventListener("mouseleave", stopPlaying);

    // En táctil no hay hover: cada toque alterna entre reproducir y parar
    el.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (intervalId) {
        stopPlaying();
      } else {
        startPlaying();
      }
    }, { passive: false });
  });

});
