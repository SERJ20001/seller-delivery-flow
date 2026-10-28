(() => {
  const recommendations = [
    {
      title: "Наушники Marshall",
      price: "10 500",
      photo: "home-headphones.png",
      location: "Перово, до 5 мин.",
      posted: "Сегодня, 10:15",
    },
    {
      title: "Стивен Кинг — Оно",
      price: "650",
      photo: "home-book-flag.png",
      location: "Перово, до 5 мин.",
      posted: "Сегодня, 09:40",
      route: "book",
    },
    {
      title: "Ковёр в шахматную клетку",
      price: "3 500",
      photo: "home-chess.png",
      location: "Сокол, до 10 мин.",
      posted: "Сегодня, 09:25",
    },
    {
      title: "Городской велосипед",
      price: "15 500",
      photo: "home-bicycle.png",
      location: "Авиамоторная",
      posted: "Вчера, 18:30",
    },
    {
      title: "Вязаная шапка",
      price: "700",
      photo: "home-hat.png",
      location: "Измайловская",
      posted: "Сегодня, 08:50",
    },
    {
      title: "Деревянный столик",
      price: "3 200",
      photo: "home-table.png",
      location: "Новогиреево",
      posted: "Вчера, 20:10",
    },
  ];

  function renderRecommendation(product, image) {
    const content = `${image(product.photo, "home-product-photo", product.title)}<div class="home-product-heading"><h2 class="home-product-title">${product.title}</h2>${image("home-favorite.svg", "home-product-favorite")}</div><p class="home-product-price">${product.price} ₽</p><p class="home-product-location">${product.location}</p><p class="home-product-posted">${product.posted}</p>`;
    return product.route === "book"
      ? `<button type="button" class="home-product" id="home-book" aria-label="Открыть книгу Стивен Кинг — Оно, 650 рублей">${content}</button>`
      : `<article class="home-product">${content}</article>`;
  }

  function render({ image }) {
    return `<section class="screen home-screen" id="home-screen" aria-label="Главная Авито"><div class="scroll home-scroll" id="home-scroll"><div class="home-header">${image("home-header.png", "home-header-art", "Авито. Поиск в Москве. Скидки от продавцов")}</div><div class="home-categories" aria-label="Категории товаров">${image("home-categories.png", "home-categories-art", "Авто, недвижимость, работа, услуги, электроника, для дома и дачи")}</div><section class="home-recommendations" aria-label="Рекомендации для вас"><div class="home-grid">${recommendations.map((product) => renderRecommendation(product, image)).join("")}</div></section></div><footer class="home-footer"><nav class="home-nav" aria-label="Главное меню"><button type="button" class="home-nav-item home-nav-current" id="home-search" aria-current="page">${image("home-search-active.svg")}<span>Поиск</span></button><div class="home-nav-item">${image("702f3.svg")}<span>Избранное</span></div><button type="button" class="home-nav-item" id="home-list" aria-label="Перейти в Мои объявления">${image("home-ads.svg")}<span>Объявления</span></button><div class="home-nav-item">${image("f8d7f.svg")}<span>Сообщения</span></div><div class="home-nav-item">${image("66aba.png", "home-nav-avatar")}<span>Профиль</span></div></nav></footer></section>`;
  }

  function bind({ navigate }) {
    document.querySelector("#home-book").addEventListener("click", () => {
      navigate("book");
    });
    document.querySelector("#home-list").addEventListener("click", () => {
      navigate("list");
    });
    document.querySelector("#home-search").addEventListener("click", () => {
      document.querySelector("#home-scroll").scrollTo({ top: 0 });
    });
  }

  window.homeFlow = { render, bind };
})();
