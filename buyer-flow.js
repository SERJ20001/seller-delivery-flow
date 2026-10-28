window.buyerFlow = (() => {
  const book = { title: "Стивен Кинг — Оно", price: 650, seller: "Ольга" };
  let image;
  let homebar;
  let statusbar;
  let navigate;
  let back;
  let activeLayer = null;
  let previousFocus;
  let messageDraft = "";
  const money = (value) =>
    new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(value);
  const picture = (name, className = "", alt = "") =>
    image(name, className, alt);
  const closeButton = (id, label) =>
    `<button type="button" class="buyer-close" id="${id}" aria-label="${label}">${picture("buyer-228b7.svg")}</button>`;
  const bookHeader = () =>
    `<header class="book-header">${statusbar("12:22")}<div class="book-navbar"><button id="book-back" class="buyer-icon-button" aria-label="На главную">${picture("buyer-f3433.svg")}</button><div class="book-header-actions">${picture("buyer-22487.svg")}${picture("buyer-07732.svg")}${picture("buyer-1f5ed.svg")}</div></div></header>`;
  function renderBook() {
    return `<section class="screen" id="book-screen" aria-label="Книга Стивен Кинг — Оно" hidden>${bookHeader()}<div id="book-scroll" class="scroll book-scroll"><div class="book-photos" id="book-photos"><div class="book-photo">${picture("buyer-fa942.png", "", "Обложка книги Стивена Кинга «Оно»")}<span class="book-photo-count" id="book-photo-count">1 из 2</span></div><div class="book-photo">${picture("buyer-c0f72.png", "", "Второе фото книги «Оно»")}</div></div><div class="book-badges"><span class="book-ribbon">${picture("buyer-8078b.svg", "ribbon-left")}<span>Скидка на доставку</span>${picture("buyer-080f3.svg")}</span><span class="book-ribbon book-ribbon-gray">${picture("buyer-4d56b.svg", "ribbon-left")}<span>Книга</span>${picture("buyer-c8516.svg")}</span></div><div class="book-main-info"><p class="book-price">${money(book.price)} ₽</p><div class="book-chips"><div class="book-delivery-anchor"><button class="book-chip" id="book-delivery-chip">${picture("buyer-56e5d.svg")}Только Авито Доставка</button><div id="book-tooltip" class="book-tooltip" role="status" hidden>${picture("buyer-f3f14.svg", "book-tooltip-arrow")}<p>Продавец принимает оплату за этот товар только через Авито: так безопаснее</p><button id="book-tooltip-close" aria-label="Закрыть подсказку">${picture("buyer-63ea5.svg")}</button></div></div><span class="book-chip">Хорошее состояние</span><span class="book-chip">${picture("buyer-abc61.svg")}От ${money(book.price / 4)} ₽ × 4</span><span class="book-chip">${picture("buyer-af5a2.svg")}4,9 · 36 отзывов</span></div><h1>${book.title}</h1><p class="book-stock">В наличии: 1 книга</p><p class="book-category">Художественная литература</p></div><section class="book-section book-delivery-section" id="book-delivery-section"><h2>Способ получения</h2><p>Скидка продавца — доставка от 0 ₽</p><div class="book-delivery-options"><div><small class="book-green">Лучшая цена</small><span>Пункт выдачи</span><strong>0 ₽, 2–3 дня</strong></div><div><small class="book-purple">С доставкой до двери</small><span>Курьер</span><strong>От 99 ₽, 2–3 дня</strong></div><div><small class="book-purple">Самовывоз</small><span>С онлайн-оплатой</span><strong>0 ₽</strong></div></div></section><section class="book-installment"><button class="book-installment-help" disabled aria-label="Информация о рассрочке">${picture("buyer-26a30.svg")}</button><h2><span id="book-monthly">${money(book.price / 4)}</span> ₽ × <span id="book-months-title">4 месяца</span></h2><p>Первый платёж — через 30 дней<br>после получения заказа</p><div class="book-months" role="group" aria-label="Количество платежей"><button data-months="4" aria-pressed="true">4 мес.</button><button data-months="5" aria-pressed="false">5 мес.</button><button data-months="6" aria-pressed="false">6 мес.</button></div><div class="book-payment-schedule"><div><b>0 ₽</b><span>Сегодня</span></div><div><b id="book-payment-count">Дальше 4 платежа ежемесячно</b><span>Всего — ${money(book.price)} ₽</span></div></div><button class="buyer-black" disabled>Купить с доставкой в рассрочку</button></section><section class="book-section book-seller"><h2>${book.seller}<span> в сети</span></h2><div class="book-seller-rating">${picture("buyer-0635e.svg")}${picture("buyer-0635e.svg")}${picture("buyer-0635e.svg")}${picture("buyer-0635e.svg")}${picture("buyer-0635e.svg")}<span>4,9 · 36 отзывов</span></div><p>Отвечает в течение часа</p><div class="book-contact-buttons"><button id="book-call">Позвонить</button><button id="book-write">Написать</button></div></section><section class="book-section book-address"><p>Москва, м. Перово · 7 минут пешком</p><p>Зелёный проспект</p><span>Показать на карте</span></section><section class="book-section book-characteristics"><h2>Характеристики</h2><dl><div><dt>Состояние:</dt><dd>Хорошее</dd></div><div><dt>Автор:</dt><dd>Стивен Кинг</dd></div><div><dt>Издательство:</dt><dd>АСТ</dd></div><div><dt>Жанр:</dt><dd>Ужасы, мистика</dd></div><div><dt>Язык:</dt><dd>Русский</dd></div><div><dt>Переплёт:</dt><dd>Твёрдый</dd></div></dl><h2>Описание</h2><p>«Оно» — роман Стивена Кинга о городе Дерри, детской дружбе и противостоянии злу, которое возвращается спустя годы.</p><p>Бумажная книга в твёрдом переплёте, издательство АСТ. Страницы на месте, без пометок. Есть небольшие следы чтения на обложке.</p><p>Отправлю Авито Доставкой. Перед отправкой упакую в картон.</p></section><section class="book-section book-ask"><h2>Спросите у продавца</h2><button id="book-ask-message">Здравствуйте! Ещё продаётся?</button><div><button data-question="Когда сможете отправить?">Когда отправите?</button><button data-question="Есть ли пометки на страницах?">Есть пометки?</button></div></section></div><footer class="book-footer"><div><button class="buyer-purple" disabled>Купить с доставкой</button><button class="buyer-purple" disabled>В корзину</button></div>${homebar()}</footer></section>`;
  }
  function renderChat() {
    return `<section class="screen buyer-chat" id="chat-screen" aria-label="Чат с продавцом книги" hidden><header class="chat-header">${statusbar("10:00")}<div class="chat-navbar"><button class="buyer-icon-button" id="chat-back" aria-label="Назад к книге">${picture("buyer-22686.svg")}</button><div class="chat-photo">${picture("buyer-fa942.png", "", "Книга «Оно»")}</div><div class="chat-person"><strong>${book.seller}${picture("buyer-cc327.svg")}</strong><span>${book.title} · <b>${money(book.price)} ₽</b></span></div><div class="chat-header-actions">${picture("buyer-b3b73.svg")}${picture("buyer-6de0f.svg")}</div></div></header><div class="chat-body" id="chat-body"><div id="chat-empty" class="chat-empty">${picture("buyer-85252.png", "chat-empty-image")}<h2>Продавец принимает заказы через Авито</h2><p>Есть Авито Доставка и самовывоз с онлайн-оплатой. Договориться о покупке в другом сервисе не получится</p><button class="buyer-purple" disabled>Купить с доставкой</button></div><div id="chat-messages" class="chat-messages" role="log" aria-live="polite"></div></div><footer class="chat-footer"><div class="chat-suggestions"><strong>Спросите у продавца</strong><div><button data-chat-question="Когда сможете отправить?">Когда сможете отправить?</button><button data-chat-question="Есть ли дефекты?">Есть ли дефекты?</button><button data-chat-question="Что входит в комплект?">Что входит в комплект?</button></div></div><form id="chat-form" class="chat-form"><button class="chat-attach" type="button" disabled aria-label="Прикрепить файл">${picture("buyer-5e5b9.svg")}</button><input id="chat-message" type="text" autocomplete="off" maxlength="1000" placeholder="Сообщение" aria-label="Сообщение"><button id="chat-send" type="submit" disabled>Отправить</button></form>${homebar()}</footer></section>`;
  }
  function renderScreens(helpers) {
    ({ image, homebar, statusbar } = helpers);
    return renderBook() + renderChat();
  }
  function renderLayers() {
    return `<div class="buyer-layer" id="buyer-delivery-layer" aria-hidden="true"><section class="buyer-sheet buyer-delivery-sheet" role="dialog" aria-modal="true" aria-labelledby="buyer-delivery-title" tabindex="-1"><div class="buyer-handle" aria-hidden="true"></div>${closeButton("buyer-delivery-close", "Закрыть информацию о доставке")}<div class="buyer-sheet-scroll">${picture("buyer-df8cc.png", "buyer-delivery-art")}<div class="buyer-sheet-copy"><h2 id="buyer-delivery-title">Только Авито Доставка и самовывоз с онлайн-оплатой</h2><p>Оформляйте и оплачивайте заказ на Авито. Так безопаснее:</p><p>— Защищаем ваши деньги. Продавец получит их, только когда проверите покупку.</p><p>— Приходим на помощь, если с товаром что-то случается в пути.</p><p>— Не даём отправлять сомнительные ссылки и скрываем настоящие номера телефонов.</p></div></div><footer class="buyer-sheet-footer"><button id="buyer-delivery-understood" class="buyer-black">Хорошо</button>${homebar()}</footer></section></div><div class="buyer-layer" id="buyer-call-layer" aria-hidden="true"><section class="buyer-sheet buyer-call-sheet" role="dialog" aria-modal="true" aria-labelledby="buyer-call-title" tabindex="-1"><div class="buyer-handle" aria-hidden="true"></div>${closeButton("buyer-call-close", "Закрыть предупреждение о звонке")}<div class="buyer-call-copy">${picture("buyer-call-art.png", "buyer-call-art")}<h2 id="buyer-call-title">Товар можно оплатить только через Авито</h2><p>Если договоритесь о покупке, оформляйте доставку или самовывоз с онлайн-оплатой.</p></div><footer class="buyer-call-footer"><button class="buyer-success" disabled>Позвонить через Авито</button><button class="buyer-secondary" id="buyer-call-buy">Перейти к покупке</button>${homebar()}</footer></section></div>`;
  }
  function hideTooltip() {
    document.querySelector("#book-tooltip").hidden = true;
  }
  function enterBook({ showTooltip = true } = {}) {
    document.querySelector("#book-tooltip").hidden = !showTooltip;
    if (showTooltip) document.querySelector("#book-scroll").scrollTop = 0;
  }
  function enterChat() {
    const input = document.querySelector("#chat-message");
    input.value = messageDraft;
    document.querySelector("#chat-send").disabled = !input.value.trim();
    messageDraft = "";
  }
  function openLayer(kind) {
    hideTooltip();
    previousFocus = document.activeElement;
    activeLayer = kind;
    const layer = document.querySelector(`#buyer-${kind}-layer`);
    layer.classList.add("open");
    layer.setAttribute("aria-hidden", "false");
    document.querySelector("#screens").inert = true;
    layer.querySelector(".buyer-sheet").focus({ preventScroll: true });
    history.pushState({ screen: "book", buyerLayer: kind }, "");
  }
  function closeLayer(syncHistory = true) {
    if (!activeLayer) return false;
    const layer = document.querySelector(`#buyer-${activeLayer}-layer`);
    layer.classList.remove("open");
    layer.setAttribute("aria-hidden", "true");
    activeLayer = null;
    document.querySelector("#screens").inert = false;
    previousFocus?.focus({ preventScroll: true });
    if (syncHistory && history.state?.buyerLayer) history.back();
    return true;
  }
  function openChat(question = "") {
    hideTooltip();
    messageDraft = question;
    navigate("chat");
  }
  function sendMessage(event) {
    event.preventDefault();
    const input = document.querySelector("#chat-message");
    const text = input.value.trim();
    if (!text) return;
    const bubble = document.createElement("p");
    bubble.className = "chat-bubble";
    bubble.textContent = text;
    document.querySelector("#chat-messages").appendChild(bubble);
    document.querySelector("#chat-empty").hidden = true;
    input.value = "";
    document.querySelector("#chat-send").disabled = true;
    document.querySelector("#chat-body").scrollTop =
      document.querySelector("#chat-body").scrollHeight;
  }
  function bind(callbacks) {
    ({ navigate, back } = callbacks);
    document
      .querySelector("#book-back")
      .addEventListener("click", () => back("home"));
    document
      .querySelector("#chat-back")
      .addEventListener("click", () => back("book"));
    document
      .querySelector("#book-write")
      .addEventListener("click", () => openChat());
    document
      .querySelector("#book-call")
      .addEventListener("click", () => openLayer("call"));
    document
      .querySelector("#book-delivery-chip")
      .addEventListener("click", () => openLayer("delivery"));
    document
      .querySelector("#book-tooltip-close")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        hideTooltip();
      });
    for (const id of [
      "buyer-delivery-close",
      "buyer-delivery-understood",
      "buyer-call-close",
    ]) {
      document
        .querySelector(`#${id}`)
        .addEventListener("click", () => closeLayer());
    }
    document.querySelector("#buyer-call-buy").addEventListener("click", () => {
      closeLayer();
      document
        .querySelector("#book-delivery-section")
        .scrollIntoView({ block: "center" });
    });
    document.querySelectorAll(".buyer-layer").forEach((layer) =>
      layer.addEventListener("click", (event) => {
        if (event.target === layer) closeLayer();
      }),
    );
    document
      .querySelector("#book-scroll")
      .addEventListener("pointerdown", (event) => {
        if (!event.target.closest("#book-tooltip")) hideTooltip();
      });
    document
      .querySelector("#book-ask-message")
      .addEventListener("click", () =>
        openChat("Здравствуйте! Ещё продаётся?"),
      );
    document
      .querySelectorAll("[data-question]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          openChat(button.dataset.question),
        ),
      );
    document.querySelectorAll("[data-chat-question]").forEach((button) =>
      button.addEventListener("click", () => {
        const input = document.querySelector("#chat-message");
        input.value = button.dataset.chatQuestion;
        document.querySelector("#chat-send").disabled = false;
        input.focus();
      }),
    );
    document
      .querySelector("#chat-message")
      .addEventListener("input", (event) => {
        document.querySelector("#chat-send").disabled =
          !event.target.value.trim();
      });
    document
      .querySelector("#chat-form")
      .addEventListener("submit", sendMessage);
    document.querySelectorAll("[data-months]").forEach((button) =>
      button.addEventListener("click", () => {
        const months = Number(button.dataset.months);
        document
          .querySelectorAll("[data-months]")
          .forEach((item) =>
            item.setAttribute("aria-pressed", String(item === button)),
          );
        document.querySelector("#book-monthly").textContent = money(
          book.price / months,
        );
        document.querySelector("#book-months-title").textContent =
          `${months} ${months === 4 ? "месяца" : "месяцев"}`;
        document.querySelector("#book-payment-count").textContent =
          `Дальше ${months} платежей ежемесячно`;
      }),
    );
    document
      .querySelector("#book-photos")
      .addEventListener("scroll", (event) => {
        document.querySelector("#book-photo-count").textContent =
          event.target.scrollLeft > 50 ? "2 из 2" : "1 из 2";
      });
    document.addEventListener(
      "keydown",
      (event) => {
        if (!activeLayer) return;
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopImmediatePropagation();
          closeLayer();
          return;
        }
        if (event.key !== "Tab") return;
        const sheet = document.querySelector(
          `#buyer-${activeLayer}-layer .buyer-sheet`,
        );
        const buttons = [...sheet.querySelectorAll("button:not(:disabled)")];
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first || document.activeElement === sheet)
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last || document.activeElement === sheet)
        ) {
          event.preventDefault();
          first.focus();
        }
      },
      true,
    );
  }
  return {
    renderScreens,
    renderLayers,
    bind,
    enterBook,
    enterChat,
    closeLayer,
    getActiveLayer: () => activeLayer,
    book,
  };
})();
