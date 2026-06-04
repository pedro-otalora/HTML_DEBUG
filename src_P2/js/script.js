// MENÚ HAMBURGUESA
document.addEventListener("DOMContentLoaded", function () {
  // guarda la referencia de los selectores del botón y lista de enlaces
  const menuBtn = document.querySelector(".menu-movil-toggle");
  const menuLista = document.querySelector(".menu-links");

  // se ejecuta cuando se pincha en el botón hamburguesa
  menuBtn.addEventListener("click", function (e) {
    // que el evento del click no pase a document
    e.stopPropagation();
    // añade o quita la subclase para cambiar el display la lista
    menuLista.classList.toggle("menu-open");
  });

  // se ejecuta al pinchar fuera del botón
  document.addEventListener("click", function () {
    // quita la subclase para volver al display none
    menuLista.classList.remove("menu-open");
  });
});

// PASA LA PÁGINA ACTUAL A aria-current
// ejecuta en cada elemento de la lista del menú
document.querySelectorAll(".menu-links a").forEach((link) => {
  // si el link del selector es igual que la url de la página
  if (link.href === window.location.href) {
    // añade el atributo aria-current al enlace
    link.setAttribute("aria-current", "page");
  }
});

// MODAL GALERÍA
document.addEventListener("click", (e) => {
  const figure = e.target.closest(".galeria-figure");

  if (figure) {
    const imgMiniatura = figure.querySelector(".galeria-img");
    const sourceWebP = figure.querySelector("source");
    const modal = document.querySelector(".modal-galeria");
    const modalImg = modal.querySelector(".modal-img");

    // se agrupan los cambios asíncronamente en el próximo frame de animación
    requestAnimationFrame(() => {
      modalImg.alt = imgMiniatura.alt;
      modalImg.sizes = "90vw";

      if (sourceWebP && sourceWebP.srcset) {
        modalImg.srcset = sourceWebP.srcset;
      }

      modalImg.src = imgMiniatura.src;
      modal.classList.add("mostrar");
      document.body.style.overflow = "hidden"; // El cambio de scroll entra limpio
    });
  }

  // cierra el modal al hacer click en la X o fuera de la imagen
  if (
    e.target.classList.contains("modal-cerrar") ||
    e.target.classList.contains("modal-galeria")
  ) {
    const modal = document.querySelector(".modal-galeria");
    const modalImg = modal.querySelector(".modal-img");

    requestAnimationFrame(() => {
      modal.classList.remove("mostrar");
      document.body.style.overflow = ""; // Restaura la barra de scroll de forma segura
      modalImg.srcset = "";
      modalImg.sizes = "";
    });
  }
});


// CARGA EL VIDEO DESDE LA FACHADA DE VÍDEO
document.addEventListener('DOMContentLoaded', () => {
  const videoFacade = document.getElementById('videoFacade');

  if (videoFacade) {
    videoFacade.addEventListener('click', function() {
      // obtiene el ID limpio
      const videoId = this.getAttribute('data-video-id');
      
      // crea el elemento iframe dinámicamente
      const iframe = document.createElement('iframe');
      
      // construye la URL estándar de inserción de forma limpia
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      
      iframe.setAttribute('src', embedUrl);
      iframe.setAttribute('title', 'Reproductor de vídeo de YouTube');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', 'true');
      
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      
      // vacía el contenedor
      this.innerHTML = '';
      this.appendChild(iframe);
    });
  }
});