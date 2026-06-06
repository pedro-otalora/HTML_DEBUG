// MENÚ HAMBURGUESA
// se ejecuta cuando todo el html está cargado
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
document.querySelectorAll('.menu-links a').forEach(link => {
  // si el link del selector es igual que la url de la página 
  if (link.href === window.location.href) {
    // añade el atributo aria-current al enlace 
    link.setAttribute('aria-current', 'page');
  }
});

// MODAL GALERÍA
// se ejecuta en cada click

// document.addEventListener("click", (e) => {
//   // si se pincha en una figura o un descenciende
//   if (e.target.closest(".galeria-figure")) {
//     // guarda la referencia del selector
//     const img = e.target
//       .closest(".galeria-figure")
//       .querySelector(".galeria-img");
//     // guarda la referencia del modal
//     const modal = e.target.closest(".galeria").querySelector(".modal-galeria");
//     // copia los atributos del selector de figure al selector modal
//     modal.querySelector(".modal-img").src = img.src;
//     modal.querySelector(".modal-img").alt = img.alt;
//     // añade clase mostrar
//     modal.classList.add("mostrar");
//     //bloquea scroll
//     document.body.style.overflow = "hidden";
//   }
//   // si pincha botón cerrar O fuera del modal
//   if (
//     e.target.classList.contains("modal-cerrar") ||
//     e.target.classList.contains("modal-galeria") 
//   ) {
//     // quita clase mostrar del modal
//     e.target.closest(".modal-galeria").classList.remove("mostrar");
//     // desbloqua scroll
//     document.body.style.overflow = "";
//   }
// });

// MODAL GALERÍA
// se ejecuta en cada click
document.addEventListener("click", (e) => {
  const figure = e.target.closest(".galeria-figure");
  
  if (figure) {
    const imgMiniatura = figure.querySelector(".galeria-img");
    const sourceWebP = figure.querySelector("source");
    
    const modal = document.querySelector(".modal-galeria");
    const modalImg = modal.querySelector(".modal-img");

    // 1. Copiamos el ALT y el SRC (como base)
    modalImg.alt = imgMiniatura.alt;
    modalImg.src = imgMiniatura.src;

    // 2. LA MAGIA: Copiamos el srcset del source al modal
    // Al hacer esto, el navegador volverá a evaluar qué tamaño 
    // necesita para el modal a pantalla completa.
    if (sourceWebP && sourceWebP.srcset) {
      modalImg.srcset = sourceWebP.srcset;
    }

    modal.classList.add("mostrar");
    document.body.style.overflow = "hidden";
  }

  // Cierre del modal (se mantiene igual)
  if (
    e.target.classList.contains("modal-cerrar") ||
    e.target.classList.contains("modal-galeria") 
  ) {
    const modal = document.querySelector(".modal-galeria");
    modal.classList.remove("mostrar");
    document.body.style.overflow = "";
    // Limpiamos el srcset al cerrar para que no parpadee la siguiente imagen
    modal.querySelector(".modal-img").srcset = "";
  }
});

