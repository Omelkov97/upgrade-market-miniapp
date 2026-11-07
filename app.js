
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

const root = document.documentElement;

function setTheme() {
  const scheme = tg?.colorScheme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.dataset.theme = scheme;
}

setTheme();
if (tg?.onEvent) tg.onEvent('themeChanged', setTheme);

const categories = [
  { id: 'all', name: 'Все', icon: '✦' },
  { id: 'market', name: 'Покупки', icon: '◈' },
  { id: 'social', name: 'Соцсети', icon: '◎' },
  { id: 'messengers', name: 'Общение', icon: '✉' },
  { id: 'banks', name: 'Банки', icon: '₽' }
];

const products = [
  {
    id: 'avito',
    name: 'Авито',
    desc: 'Покупки, продажи и объявления',
    category: 'market',
    icon: 'A',
    tone: 'blue',
    version: 'Официальный источник',
    compat: 'iPhone и iOS',
    method: 'Доступность приложения в App Store может меняться. Не удаляйте уже установленное приложение. Для новых пользователей доступен официальный сайт.',
    description: 'Авито — сервис объявлений, где можно покупать и продавать товары, искать услуги, недвижимость и автомобили.',
    url: 'https://www.avito.ru/',
    actionLabel: 'Открыть Авито'
  },
  {
    id: 'vk',
    name: 'ВКонтакте',
    desc: 'Социальная сеть, музыка и видео',
    category: 'social',
    icon: 'VK',
    tone: 'blue',
    version: 'Официальный источник',
    compat: 'iPhone и iOS',
    method: 'Проверьте доступность официального приложения в App Store. Не устанавливайте приложения-клоны. Официальный сайт доступен через Safari.',
    description: 'ВКонтакте — социальная сеть для общения, публикаций, видео, музыки и сообществ.',
    url: 'https://vk.com/',
    actionLabel: 'Открыть ВКонтакте'
  },
  {
    id: 'max',
    name: 'MAX',
    desc: 'Мессенджер для общения и звонков',
    category: 'messengers',
    icon: 'M',
    tone: 'green',
    version: 'Официальная инструкция',
    compat: 'iOS 15 и новее для приложения',
    method: 'По информации MAX, приложение сейчас недоступно в App Store. Если оно уже установлено, не удаляйте его. Для новых пользователей доступна веб-версия.',
    description: 'MAX — мессенджер для сообщений, звонков и обмена файлами. Официальная справка объясняет доступные способы использования на iPhone.',
    url: 'https://help.max.ru/help/about/ustanovka_i_registraciya_v_max/gde_i_kak_skachat_prilozhenie_max',
    actionLabel: 'Открыть инструкцию MAX'
  },
  {
    id: 'sber',
    name: 'СберБанк Онлайн',
    desc: 'Банковские услуги и платежи',
    category: 'banks',
    icon: 'С',
    tone: 'green',
    version: 'Официальная инструкция',
    compat: 'iPhone и iOS',
    method: 'Используйте только официальный портал Сбера и следуйте инструкции для iOS. Не скачивайте банковские файлы из неизвестных источников.',
    description: 'СберБанк Онлайн — приложение для управления счетами, картами и платежами. Инструкция по установке опубликована на официальном портале Сбера.',
    url: 'https://sberapps.sber.ru/instruction/android',
    actionLabel: 'Открыть инструкцию Сбера'
  },
  {
    id: 'tbank',
    name: 'Т-Банк',
    desc: 'Банк, карты и переводы',
    category: 'banks',
    icon: 'Т',
    tone: 'orange',
    version: 'Официальная инструкция',
    compat: 'iPhone и iOS',
    method: 'Т-Банк предлагает официальный способ быстрого доступа на iPhone через Safari: открыть сайт банка, нажать «Поделиться» и выбрать «На экран Домой».',
    description: 'Т-Банк — банковские услуги, карты, переводы и управление финансами. Банк публикует официальную инструкцию для iPhone.',
    url: 'https://www.tbank.ru/apps/pwa/',
    actionLabel: 'Открыть инструкцию Т-Банка'
  },
  {
    id: 'alfa',
    name: 'Альфа-Банк',
    desc: 'Банковские услуги и платежи',
    category: 'banks',
    icon: 'А',
    tone: 'orange',
    version: 'Официальная инструкция',
    compat: 'iPhone и iOS',
    method: 'Альфа-Банк предлагает владельцам iPhone использовать Альфа-Онлайн. Способы доступа и установки описаны на официальном сайте банка.',
    description: 'Альфа-Банк — управление счетами, картами и переводами. Используйте только официальные инструкции банка.',
    url: 'https://alfabank.ru/help/t/retail/debitcards/alfa-karta-mir/mobilnoe-prilozhenie-i-alfa-onlain/kak-ustanovit-mobilnoe-prilozhenie/',
    actionLabel: 'Открыть инструкцию Альфа-Банка'
  }
];

let activeCategory = 'all';
let currentTab = 'home';

const $ = id => document.getElementById(id);

function renderCategories() {
  $('categories').innerHTML = categories.map(c => `
    <button class="category ${activeCategory === c.id ? 'selected' : ''}"
      data-category="${c.id}">
      <span class="cat-icon">${c.icon}</span>
      <small>${c.name}</small>
    </button>
  `).join('');
}

function renderProducts() {
  const q = $('searchInput').value.trim().toLowerCase();

  const filtered = products.filter(p =>
    (activeCategory === 'all' || p.category === activeCategory) &&
    (`${p.name} ${p.desc}`).toLowerCase().includes(q)
  );

  $('productList').innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="app-icon ${p.tone}">${p.icon}</div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-meta">iPhone · ${p.version}</div>
      </div>
      <button class="product-action" data-product="${p.id}">
        Подробнее
      </button>
    </article>
  `).join('');

  $('emptyState').classList.toggle('hidden', filtered.length > 0);
  $('catalogTitle').textContent =
    activeCategory === 'all'
      ? 'Популярное'
      : categories.find(c => c.id === activeCategory)?.name || 'Каталог';
}

function toast(message) {
  $('toast').textContent = message;
  $('toast').classList.remove('hidden');
  setTimeout(() => $('toast').classList.add('hidden'), 2300);
}

function openOfficial(url) {
  if (tg?.openLink) {
    tg.openLink(url);
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

function openProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  $('modalContent').innerHTML = `
    <div class="detail-head">
      <div class="app-icon ${p.tone}">${p.icon}</div>
      <div>
        <div class="detail-title">${p.name}</div>
        <div class="detail-sub">${p.desc}</div>
      </div>
    </div>

    <p class="detail-copy">${p.description}</p>

    <div class="detail-label">ИСТОЧНИК</div>
    <div class="detail-value">${p.version}</div>

    <div class="detail-label">СОВМЕСТИМОСТЬ</div>
    <div class="detail-value">${p.compat}</div>

    <div class="detail-label">КАК УСТАНОВИТЬ</div>
    <div class="detail-value">${p.method}</div>

    <button class="primary-button" id="detailAction">
      ${p.actionLabel}
    </button>
  `;

  $('detailAction').onclick = () => openOfficial(p.url);
  $('modalBackdrop').classList.remove('hidden');
}

$('categories').addEventListener('click', e => {
  const b = e.target.closest('[data-category]');
  if (!b) return;

  activeCategory = b.dataset.category;
  renderCategories();
  renderProducts();
});

$('productList').addEventListener('click', e => {
  const b = e.target.closest('[data-product]');
  if (b) openProduct(b.dataset.product);
});

$('searchInput').addEventListener('input', renderProducts);

$('clearSearch').onclick = () => {
  $('searchInput').value = '';
  renderProducts();
};

$('allBtn').onclick = () => {
  activeCategory = 'all';
  renderCategories();
  renderProducts();
  $('searchInput').value = '';
};

$('modalClose').onclick = () =>
  $('modalBackdrop').classList.add('hidden');

$('modalBackdrop').addEventListener('click', e => {
  if (e.target === $('modalBackdrop')) {
    $('modalBackdrop').classList.add('hidden');
  }
});

$('profileBtn').onclick = () =>
  toast('Личный кабинет будет подключён следующим этапом.');

document.querySelectorAll('.nav-item').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.nav-item')
      .forEach(x => x.classList.remove('active'));

    b.classList.add('active');
    currentTab = b.dataset.tab;

    if (currentTab === 'home' || currentTab === 'catalog') {
      activeCategory = 'all';
      renderCategories();
      renderProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast(
        currentTab === 'orders'
          ? 'История заказов появится после подключения базы данных.'
          : 'Профиль будет подключён следующим этапом.'
      );
    }
  });
});

renderCategories();
renderProducts();
