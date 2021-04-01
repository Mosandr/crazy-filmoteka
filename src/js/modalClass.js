// Класс модалки с конструктором, который принимает разметку
// и настройки (кнопка закрытия в углу (есть, нет), закрытие по esc (есть нет), закрытие по нажатию в пустой области (есть нет))
// у класса есть 2 метода - show и hide


(() => {
    const modalRef = document.querySelector("[data-modal-film-card]");
  //  const modalRef = document.querySelector("[data-modal]");
  
    modalRef.addEventListener("click", () => {
  //    const expanded =
  //      modalBtnRef.getAttribute("aria-expanded") === "true" || false;
  //
      modalRef.classList.toggle("is-open");
  //    modalBtnRef.setAttribute("aria-expanded", !expanded);
  //
  //    modalRef.classList.toggle("is-open");
    });
  })();