const asset = (name) => `./assets/${name}`;
const image = (name, className = "", alt = "") =>
  `<img src="${asset(name)}" class="${className}" alt="${alt}" draggable="false">`;
const products = [
  {
    title: "Кеды Salomon",
    price: "4 000",
    photo: "d9ce7.png",
    stock: 32,
    days: 10,
    views: "286",
    viewsDelta: 12,
    contacts: 4,
    contactsDelta: 1,
    favorites: 18,
  },
  {
    title: "Кеды Asics by Tokyo",
    price: "6 990",
    photo: "22c77.png",
    stock: 3,
    days: 16,
    views: "143",
    viewsDelta: 6,
    contacts: 2,
    contactsDelta: 1,
    favorites: 9,
  },
  {
    title: "Кеды Adidas gazelle",
    price: "7 890",
    photo: "d267c.png",
    stock: 12,
    days: 20,
    views: "412",
    viewsDelta: 18,
    contacts: 7,
    contactsDelta: 2,
    favorites: 32,
  },
  {
    title: "Adidas Selly",
    price: "12 290",
    photo: "6a4c5.png",
    stock: 6,
    days: 18,
    views: "97",
    viewsDelta: 4,
    contacts: 1,
    contactsDelta: 0,
    favorites: 5,
  },
  {
    title: "Кеды Asics Street way",
    price: "8 690",
    photo: "cc554.png",
    stock: 13,
    days: 10,
    views: "208",
    viewsDelta: 9,
    contacts: 3,
    contactsDelta: 1,
    favorites: 14,
  },
  {
    title: "New balance 230",
    price: "12 800",
    photo: "c9c91.png",
    stock: 1,
    days: 9,
    views: "364",
    viewsDelta: 15,
    contacts: 5,
    contactsDelta: 1,
    favorites: 27,
  },
  {
    title: "Asics bbs",
    price: "8 690",
    photo: "971cd.png",
    stock: 17,
    days: 7,
    views: "176",
    viewsDelta: 7,
    contacts: 2,
    contactsDelta: 0,
    favorites: 11,
  },
];
const state = {
  screen: "list",
  enabled: false,
  amount: 250,
  draft: 100,
  minimum: 50,
  maximum: 1000,
  optimal: 250,
  popupOrigin: null,
};
const app = document.querySelector("#app");
let toastTimer;
let focusBeforePopup;
let focusBeforeSheet;
const warmedImages = [];
const preparedImages = new Set();
const statusbar = (time = "9:41") =>
  `<div class="statusbar" aria-hidden="true">${image("386ef.svg")}<span class="time">${time}</span></div>`;
const homebar = () => '<div class="homebar" aria-hidden="true"></div>';
const delta = (value) => (value ? ` <span class="delta">+${value}</span>` : "");
const stats = (product) =>
  `<div class="stats"><span class="stat" aria-label="${product.views} просмотров">${image("c377f.svg")}<span>${product.views}${delta(product.viewsDelta)}</span></span><span class="stat" aria-label="${product.contacts} контакта">${image("a2a6e.svg")}<span>${product.contacts}${delta(product.contactsDelta)}</span></span><span class="stat" aria-label="${product.favorites} добавлений в избранное">${image("99be9.svg")}<span>${product.favorites}</span></span></div>`;

function renderProduct(product, index) {
  const content = `${image(product.photo, "product-photo", product.title)}<div class="product-content"><div class="product-title">${product.title}</div><div class="product-price">${product.price} ₽</div><div class="product-line">Санкт-Петербург</div><div class="product-line">${product.stock} шт. в наличии</div><div class="product-line info-line">Осталось ${product.days} дней${image("8bc65.svg")}${image("43d85.svg")}</div>${stats(product)}</div>${image("6879a.svg", "edit-icon")}`;
  return index === 0
    ? `<button class="product" id="first-product" aria-label="Открыть Кеды Salomon">${content}</button>`
    : `<article class="product">${content}</article>`;
}

function renderList() {
  return `<section class="screen" id="list-screen" aria-label="Мои объявления"><header class="topbar">${statusbar("12:22")}<div class="list-nav-crop" role="heading" aria-level="1" aria-label="Мои объявления">${image("list-header.png")}</div></header><div class="scroll list-scroll" id="list-scroll"><div class="list-header-rest" aria-label="Скидки и акции, статистика, активные объявления и поиск">${image("list-header.png")}</div><div class="goods"><div class="select-all"><span class="checkbox-placeholder"><input type="checkbox" disabled aria-label="Выбрать все"></span>Выбрать все</div><div class="products">${products.map(renderProduct).join("")}</div></div></div><footer class="list-footer"><div class="publish"><div class="primary">Разместить объявление</div></div><nav class="bottom-nav" aria-label="Главное меню"><div class="nav-item">${image("ec73f.svg")}Поиск</div><div class="nav-item">${image("702f3.svg")}Избранное</div><div class="nav-item active">${image("8b270.svg")}Объявления</div><div class="nav-item">${image("f8d7f.svg")}Сообщения</div><div class="nav-item">${image("66aba.png", "nav-avatar")}Профиль</div></nav>${homebar()}</footer></section>`;
}

function switchMarkup(id, label, enabled = false) {
  return `<button type="button" class="switch" id="${id}" role="switch" aria-checked="${enabled}" aria-label="${label}">${image(enabled ? "ee264.svg" : "0acd1.svg")}</button>`;
}

function renderItem() {
  return `<section class="screen" id="item-screen" aria-label="Объявление Salomon" hidden><header class="topbar item-topbar">${statusbar()}<div class="navbar"><button class="back" id="back-to-list" aria-label="Назад к объявлениям">${image("9b08d.svg")}</button>Активно<div class="nav-actions">${image("4a1db.svg")}${image("43672.svg")}</div></div></header><div class="scroll item-scroll" id="item-scroll"><div class="item-photo">${image("d9ce7.png", "", "Кроссовки Salomon")}<span class="photo-counter">1 / 3</span></div><div class="item-stats"><span class="stat">${image("507d2.svg")}100</span><span class="stat">${image("2da1e.svg")}2</span><span class="stat">${image("9c0e3.svg")}2</span><span class="statistics-label">Статистика</span></div><div class="item-buttons"><button disabled>Поднять просмотры</button><button disabled>Запустить рассылку</button><div class="button-row"><button disabled>Забронировать</button><button disabled>Закрыть</button></div></div><section class="promo" aria-label="Привлеките покупателей"><h2>Привлеките покупателей</h2><div class="horizontal" id="promo-carousel"><article class="promo-card delivery-card"><div class="card-body" id="delivery-card" role="button" tabindex="0" aria-label="Настроить скидку на доставку"><div class="card-heading">${switchMarkup("delivery-switch", "Подключить скидку на доставку")}<span class="card-icon">${image("bead3.svg")}</span></div><div class="card-copy"><h3>Скидка на доставку</h3><p>До 2,5 раз больше<br>шансов на продажу</p></div><button class="card-action" id="delivery-amount">250 ₽</button></div><button class="commission-link" id="card-commission">–10% на комиссию ${image("ce3be.svg")}</button></article><article class="promo-card"><div class="card-body"><div class="card-heading">${switchMarkup("sale-switch", "Хватамба")}${image("sale-card-icon.png", "card-icon-export")}</div><div class="card-copy"><h3>Хватамба</h3><p>Нейросеть советует Cкорость продажи вырастает до 41% </p></div><div class="card-action">Скидка 20%</div></div></article><article class="promo-card"><div class="card-body"><div class="card-heading">${switchMarkup("quantity-switch", "Скидка за количество")}${image("quantity-card-icon.png", "card-icon-export")}</div><div class="card-copy"><h3>Скидка<br>за количество</h3><p>Выгодно купить сразу несколько товаров</p></div><div class="card-action">5% от 3 шт.</div></div></article></div></section><section class="delivery-block"><h2>Авито Доставка ${image("908fb.svg")}</h2><div class="delivery-option"><p>Доставка партнёрами Авито</p><p class="muted">Выбраны 3 способа отправки</p>${image("1d6bf.svg")}<button disabled>Настроить доставку</button></div><div class="delivery-option"><p>Доставка силами продавца</p><p class="muted">Выбрано 3 способа отправки</p>${image("1d6bf.svg")}<button disabled>Настроить доставку</button></div><p class="delivery-terms">Включая Авито Доставку с выбранными параметрами, вы соглашаетесь с условиями.</p></section></div><div class="item-home">${homebar()}</div></section>`;
}

function renderSheet() {
  return `<div class="overlay" id="discount-overlay" aria-hidden="true"><section class="sheet" id="discount-sheet" role="dialog" aria-modal="true" aria-labelledby="discount-title" tabindex="-1"><div class="sheet-scroll" id="sheet-scroll">${image("delivery-hero.png", "hero", "Скидка на доставку")}<button class="close-sheet" id="close-discount" aria-label="Закрыть настройку скидки">${image("228b7.svg")}</button><div class="sheet-content"><h1 id="discount-title">Скидка на доставку</h1><p class="sheet-description">Чем выше скидка, тем дешевле доставка<br>для покупателя</p><label class="amount-label" for="amount">Выберите сумму</label><div class="amount-box"><input id="amount" class="amount-input" type="text" inputmode="numeric" autocomplete="off" maxlength="4" value="100" aria-label="Сумма скидки, рублей"><span>₽</span><button class="clear" id="clear-amount" aria-label="Очистить сумму">${image("64152.svg")}</button></div><div class="slider-container"><div class="range-track"><div class="range-fill" id="range-fill"></div><button type="button" id="optimal-marker" class="recommendation-button" aria-label="Выбрать рекомендованную скидку 250 рублей">${image("recommendation-circle.png")}</button></div><input id="discount-range" class="range" type="range" min="50" max="1000" step="1" value="100" aria-label="Выбрать скидку на доставку"><div class="range-labels"><span>50</span><span>1 000</span></div><span class="optimal-label" id="optimal-label">${image("recommendation-ai.svg")}250</span></div><div class="guidance" id="guidance"><p class="guidance-copy" id="guidance-copy"></p><button class="guidance-action" id="sheet-commission"><span id="commission-copy">Сэкономьте на комиссии до 10%</span>${image("f09d0.svg", "help")}${image("f30d7.png", "gift")}</button></div></div></div><footer class="calculator"><div class="calculator-product">${image("d9ce7.png", "", "Кроссовки Salomon")}<div><p class="calculator-price">2 000 ₽</p><p class="calculator-title">Кроссовки Salomon</p></div></div><div class="calculator-button"><button class="primary" id="save-discount">Сохранить</button></div>${homebar()}</footer></section></div>`;
}

function renderPopup() {
  const rows = [
    ["9f608.svg", "Комиссия на этот товар составляет 200 ₽"],
    [
      "969e8.svg",
      "Когда товар купят - мы снизим нашу комиссию на 10% и спишем меньше, вы – сэкономите",
    ],
    [
      "80168.svg",
      "Условия действуют на продажу любого товара с Авито доставкой до 31 ноября",
    ],
    [
      "6d06e.svg",
      'Снижение комиссии для 1 объявления можно получить только 1 раз. Без ограничений на количество объявлений. <span class="terms-link">Полные условия</span>',
    ],
  ];
  return `<div class="popup-layer" id="commission-popup" aria-hidden="true"><section class="popup" role="dialog" aria-modal="true" aria-labelledby="commission-title" tabindex="-1"><button class="close-sheet" id="close-commission" aria-label="Закрыть информацию о комиссии">${image("228b7.svg")}</button><div class="popup-scroll"><h2 id="commission-title">Комиссия за продажу<br>станет ниже</h2>${rows.map(([icon, text]) => `<div class="commission-row">${image(icon)}<p>${text}</p></div>`).join("")}</div><footer class="popup-footer"><button id="understood">Понятно</button></footer></section></div>`;
}

function resizeApp() {
  const mobile = window.innerWidth <= 600;
  const scale = mobile
    ? window.innerWidth / 375
    : Math.min(
        1,
        (window.innerWidth - 40) / 375,
        (window.innerHeight - 40) / 812,
      );
  const height = mobile
    ? (window.visualViewport?.height || window.innerHeight) / scale
    : 812;
  app.style.height = `${height}px`;
  app.style.transform = `scale(${scale})`;
  const wrap = document.querySelector("#device-wrap");
  wrap.style.width = `${375 * scale}px`;
  wrap.style.height = `${height * scale}px`;
}

function showItem() {
  state.screen = "item";
  document.querySelector("#list-screen").hidden = true;
  document.querySelector("#item-screen").hidden = false;
  document.querySelector("#item-scroll").scrollTop = 0;
  history.pushState({ screen: "item" }, "");
}

function showList(syncHistory = true) {
  closePopup(false);
  closeDiscount(false);
  state.screen = "list";
  document.querySelector("#list-screen").hidden = false;
  document.querySelector("#item-screen").hidden = true;
  if (syncHistory && history.state?.screen === "item") history.back();
}

function showToast(text) {
  clearTimeout(toastTimer);
  const toast = document.querySelector("#toast");
  toast.textContent = text;
  toast.hidden = false;
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}

function setEnabled(enabled, notify = true) {
  state.enabled = enabled;
  const control = document.querySelector("#delivery-switch");
  control.setAttribute("aria-checked", String(enabled));
  control.querySelector("img").src = asset(enabled ? "ee264.svg" : "0acd1.svg");
  if (notify)
    showToast(
      enabled
        ? "Скидка на доставку успешно подключена"
        : "Скидка на доставку отключена",
    );
}

function openDiscount() {
  focusBeforeSheet = document.activeElement;
  state.draft = state.enabled ? state.amount : 100;
  updateDraft(state.draft);
  document.querySelector("#sheet-scroll").scrollTop = 0;
  const overlay = document.querySelector("#discount-overlay");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.querySelector("#screens").inert = true;
  document.querySelector("#discount-sheet").focus({ preventScroll: true });
  history.pushState({ screen: "item", sheet: true }, "");
}

function closeDiscount(syncHistory = true) {
  const overlay = document.querySelector("#discount-overlay");
  if (!overlay.classList.contains("open")) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.querySelector("#screens").inert = false;
  document.querySelector("#amount").blur();
  focusBeforeSheet?.focus({ preventScroll: true });
  if (syncHistory && history.state?.sheet && !history.state?.popup)
    history.back();
}

function updateDraft(value, updateInput = true) {
  state.draft = Math.min(
    state.maximum,
    Math.max(state.minimum, Number(value) || state.minimum),
  );
  if (updateInput) document.querySelector("#amount").value = state.draft;
  document.querySelector("#amount").style.width =
    `${String(updateInput ? state.draft : document.querySelector("#amount").value).length * 9}px`;
  document.querySelector("#discount-range").value = state.draft;
  const fraction =
    (state.draft - state.minimum) / (state.maximum - state.minimum);
  document.querySelector("#range-fill").style.width = `${8 + fraction * 279}px`;
  const recommendationPosition =
    8 +
    ((state.optimal - state.minimum) / (state.maximum - state.minimum)) * 279;
  document.querySelector("#optimal-marker").style.left =
    `${recommendationPosition - 22}px`;
  document.querySelector("#optimal-label").style.left =
    `${recommendationPosition - 21}px`;
  const low = state.draft < state.optimal;
  const optimal = state.draft === state.optimal;
  document.querySelector("#guidance").dataset.tone = low
    ? "low"
    : optimal
      ? "optimal"
      : "high";
  document.querySelector("#guidance-copy").textContent = low
    ? "Скидка ниже оптимальной. Рекомендуем увеличить до 250 ₽, чтобы привлечь больше покупателей"
    : optimal
      ? "Оптимально по данным нейросети.\nВыше сумма — больше покупателей получат хорошую скидку"
      : "Отлично! Для покупателей доставка будет бесплатной или с*большой скидкой";
  document.querySelector("#commission-copy").textContent =
    low || optimal
      ? "Сэкономьте на комиссии до 10%"
      : "Экономите на комиссии до 10%";
  document.querySelector("#optimal-marker").hidden = !low;
  document.querySelector("#optimal-label").hidden = !low;
}

function saveDiscount() {
  updateDraft(document.querySelector("#amount").value);
  state.amount = state.draft;
  document.querySelector("#delivery-amount").textContent =
    `${state.amount.toLocaleString("ru-RU")} ₽`;
  setEnabled(true, false);
  closeDiscount();
  showToast("Скидка на доставку успешно подключена");
}

function openPopup() {
  focusBeforePopup = document.activeElement;
  state.popupOrigin = document
    .querySelector("#discount-overlay")
    .classList.contains("open")
    ? "sheet"
    : "item";
  const popup = document.querySelector("#commission-popup");
  popup.classList.add("open");
  popup.setAttribute("aria-hidden", "false");
  document.querySelector("#screens").inert = true;
  document.querySelector("#discount-overlay").inert = true;
  popup.querySelector(".popup").focus({ preventScroll: true });
  history.pushState(
    { screen: "item", sheet: state.popupOrigin === "sheet", popup: true },
    "",
  );
}

function closePopup(syncHistory = true) {
  const popup = document.querySelector("#commission-popup");
  if (!popup.classList.contains("open")) return;
  popup.classList.remove("open");
  popup.setAttribute("aria-hidden", "true");
  document.querySelector("#discount-overlay").inert = false;
  document.querySelector("#screens").inert = document
    .querySelector("#discount-overlay")
    .classList.contains("open");
  focusBeforePopup?.focus({ preventScroll: true });
  if (syncHistory && history.state?.popup) history.back();
}

function trapFocus(event) {
  if (event.key === "Escape") {
    if (document.querySelector("#commission-popup").classList.contains("open"))
      closePopup();
    else closeDiscount();
    return;
  }
  if (event.key !== "Tab") return;
  const active =
    document.querySelector("#commission-popup.open .popup") ||
    document.querySelector("#discount-overlay.open .sheet");
  if (!active) return;
  const controls = [
    ...active.querySelectorAll('button:not(:disabled),input,[tabindex="0"]'),
  ].filter((n) => n.offsetParent !== null);
  const first = controls[0],
    last = controls[controls.length - 1];
  if (
    event.shiftKey &&
    (document.activeElement === first || document.activeElement === active)
  ) {
    event.preventDefault();
    last.focus();
  } else if (
    !event.shiftKey &&
    (document.activeElement === last || document.activeElement === active)
  ) {
    event.preventDefault();
    first.focus();
  }
}

function bindEvents() {
  document.querySelector("#first-product").addEventListener("click", showItem);
  document.querySelector("#back-to-list").addEventListener("click", showList);
  document
    .querySelector("#delivery-switch")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      setEnabled(!state.enabled);
    });
  for (const id of ["sale-switch", "quantity-switch"])
    document.querySelector(`#${id}`).disabled = true;
  document
    .querySelector("#delivery-card")
    .addEventListener("click", openDiscount);
  document
    .querySelector("#delivery-card")
    .addEventListener("keydown", (event) => {
      if (
        event.target === event.currentTarget &&
        ["Enter", " "].includes(event.key)
      ) {
        event.preventDefault();
        openDiscount();
      }
    });
  document
    .querySelector("#card-commission")
    .addEventListener("click", openPopup);
  document
    .querySelector("#sheet-commission")
    .addEventListener("click", openPopup);
  document
    .querySelector("#close-commission")
    .addEventListener("click", closePopup);
  document.querySelector("#understood").addEventListener("click", closePopup);
  document
    .querySelector("#close-discount")
    .addEventListener("click", closeDiscount);
  document
    .querySelector("#save-discount")
    .addEventListener("click", saveDiscount);
  document.querySelector("#optimal-marker").addEventListener("click", () => {
    updateDraft(state.optimal);
  });
  document
    .querySelector("#discount-range")
    .addEventListener("input", (event) => updateDraft(event.target.value));
  document.querySelector("#amount").addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
    updateDraft(event.target.value, false);
  });
  document
    .querySelector("#amount")
    .addEventListener("blur", (event) => updateDraft(event.target.value));
  document.querySelector("#amount").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  });
  document.querySelector("#clear-amount").addEventListener("click", () => {
    document.querySelector("#amount").value = "";
    updateDraft("", false);
    document.querySelector("#amount").focus();
  });
  document
    .querySelector("#discount-overlay")
    .addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeDiscount();
    });
  document
    .querySelector("#commission-popup")
    .addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closePopup();
    });
  document.addEventListener("keydown", trapFocus);
  window.addEventListener("resize", resizeApp);
  window.visualViewport?.addEventListener("resize", resizeApp);
  window.addEventListener("popstate", (event) => {
    const target = event.state;
    if (!target?.popup) closePopup(false);
    if (!target?.sheet) closeDiscount(false);
    if (target?.screen === "item") {
      document.querySelector("#list-screen").hidden = true;
      document.querySelector("#item-screen").hidden = false;
      state.screen = "item";
    } else showList(false);
  });
  const carousel = document.querySelector("#promo-carousel");
  let pointerStart;
  let suppressCarouselClick = false;
  carousel.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse")
      pointerStart = { x: event.clientX, scroll: carousel.scrollLeft };
  });
  carousel.addEventListener("pointermove", (event) => {
    if (pointerStart && event.buttons === 1) {
      if (Math.abs(pointerStart.x - event.clientX) > 6)
        suppressCarouselClick = true;
      carousel.scrollLeft =
        pointerStart.scroll + pointerStart.x - event.clientX;
    }
  });
  window.addEventListener("pointerup", () => {
    pointerStart = null;
    setTimeout(() => {
      suppressCarouselClick = false;
    }, 0);
  });
  carousel.addEventListener(
    "click",
    (event) => {
      if (suppressCarouselClick) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    true,
  );
  carousel.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX) && event.shiftKey) {
        event.preventDefault();
        carousel.scrollLeft += event.deltaY;
      }
    },
    { passive: false },
  );
}

async function preload() {
  const status = document.querySelector("#loading-status");
  const progress = document.querySelector("#progress");
  const required = await fetch("./assets.json", {
    signal: AbortSignal.timeout(20000),
  }).then((response) => {
    if (!response.ok) throw new Error("Не удалось загрузить список ресурсов");
    return response.json();
  });
  const urls = [...new Set(required.images.map((path) => `./${path}`))];
  let completed = 0;
  const jobs = urls.map((url) => async () => {
    if (!preparedImages.has(url)) {
      const img = new Image();
      img.src = url;
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(url)), 20000);
        img.onload = () => {
          clearTimeout(timer);
          resolve();
        };
        img.onerror = () => {
          clearTimeout(timer);
          reject(new Error(url));
        };
        if (img.complete && img.naturalWidth) {
          clearTimeout(timer);
          resolve();
        }
      });
      await img.decode();
      warmedImages.push(img);
      preparedImages.add(url);
    }
    completed++;
    progress.value = Math.round((completed / (urls.length + 5)) * 100);
  });
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(6, jobs.length) }, async () => {
      while (next < jobs.length) {
        const job = jobs[next++];
        await job();
      }
    }),
  );
  await Promise.all(
    [
      "400 15px Avito",
      "700 26px Avito",
      "800 24px Avito",
      "500 15px Manrope",
      "800 24px Manrope",
    ].map(async (font) => {
      await document.fonts.load(font);
      completed++;
      progress.value = Math.round((completed / (urls.length + 5)) * 100);
    }),
  );
  await document.fonts.ready;
  status.textContent = "Готово";
}

async function start() {
  const loading = document.querySelector("#loading");
  loading.hidden = false;
  document.querySelector("#retry").hidden = true;
  app.inert = true;
  try {
    await preload();
    if (!app.childElementCount) {
      app.innerHTML = `<div class="app-background" id="screens">${renderList()}${renderItem()}</div>${renderSheet()}${renderPopup()}<div id="toast" class="toast" role="status" hidden></div>`;
      bindEvents();
    }
    resizeApp();
    history.replaceState({ screen: "list" }, "");
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
    app.inert = false;
    app.setAttribute("aria-busy", "false");
    loading.hidden = true;
  } catch (error) {
    document.querySelector("#loading-status").textContent =
      "Не удалось загрузить ресурсы. Проверьте соединение и повторите попытку.";
    document.querySelector("#retry").hidden = false;
    console.error(error.message);
  }
}

document.querySelector("#retry").addEventListener("click", start);
start();
