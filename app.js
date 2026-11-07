
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
    iconUrl: 'https://www.google.com/s2/favicons?domain=avito.ru&sz=128',
    version: 'Официальный сайт',
    sourceLabel: 'Официальный сайт',
    compat: 'iPhone и iOS',
    method: 'Откройте официальный сайт Авито в Safari. Доступность приложения в App Store может меняться. Не устанавливайте приложения-клоны.',
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
    iconUrl: 'https://www.google.com/s2/favicons?domain=vk.com&sz=128',
    version: 'Официальный сайт',
    sourceLabel: 'Официальный сайт',
    compat: 'iPhone и iOS',
    method: 'Проверьте доступность официального приложения в App Store. Если оно недоступно, используйте официальный сайт через Safari. Не устанавливайте приложения-клоны.',
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
    iconUrl: 'https://www.google.com/s2/favicons?domain=max.ru&sz=128',
    version: 'Официальная инструкция',
    sourceLabel: 'Официальная справка',
    compat: 'iOS 15 и новее',
    method: 'Приложение MAX сейчас недоступно в App Store. Если оно уже установлено, не удаляйте его: повторная установка может быть невозможна. Для новых пользователей доступна веб-версия web.max.ru. Её можно добавить на экран «Домой» через Safari.',
    description: 'MAX — мессенджер для сообщений, звонков и обмена файлами. На iPhone можно пользоваться официальной веб-версией.',
    url: 'https://help.max.ru/help/about/ustanovka_i_registraciya_v_max/gde_i_kak_skachat_prilozhenie_max',
    actionLabel: 'Открыть инструкцию MAX'
  },
  {
    id: 'sber',
    name: 'СберБанк Онлайн',
    desc: 'Банковские услуги и платежи',
    category: 'banks',
    icon: 'С',
    iconUrl: 'https://www.google.com/s2/favicons?domain=sber.ru&sz=128',
    version: 'Официальная инструкция',
    sourceLabel: 'Официальная справка',
    compat: 'iPhone и iOS',
    method: 'Официальный портал Сбера предлагает владельцам iPhone пользоваться веб-версией через Safari или обратиться в отделение для установки приложения. Если приложение уже установлено, не удаляйте его без необходимости.',
    description: 'СберБанк Онлайн — сервис для управления счетами, картами и платежами. Используйте только официальный сайт банка и его инструкции.',
    url: 'https://apps.sber.ru/apps/sberbank-online/help/',
    actionLabel: 'Открыть инструкцию Сбера'
  },
  {
    id: 'tbank',
    name: 'Т-Банк',
    desc: 'Банк, карты и переводы',
    category: 'banks',
    icon: 'Т',
    iconUrl: 'https://www.google.com/s2/favicons?domain=tbank.ru&sz=128',
    version: 'Официальная инструкция',
    sourceLabel: 'Официальная справка',
    compat: 'iPhone и iOS',
    method: 'Т-Банк предлагает официальный способ быстрого доступа на iPhone через Safari: откройте сайт банка, нажмите «Поделиться» и выберите «На экран Домой».',
    description: 'Т-Банк — банковские услуги, карты, переводы и управление финансами. Банк публикует официальные инструкции для iPhone.',
    url: 'https://www.tbank.ru/apps/pwa/',
    actionLabel: 'Открыть инструкцию Т-Банка'
  },
  {
    id: 'alfa',
    name: 'Альфа-Банк',
    desc: 'Банковские услуги и платежи',
    category: 'banks',
    icon: 'А',
    iconUrl: 'https://www.google.com/s2/favicons?domain=alfabank.ru&sz=128',
    version: 'Официальная инструкция',
    sourceLabel: 'Официальная справка',
    compat: 'iPhone и iOS',
    method: 'Альфа-Банк предлагает владельцам iPhone использовать Альфа-Онлайн. Актуальные способы доступа и установки описаны на официальном сайте банка.',
    description: 'Альфа-Банк — управление счетами, картами и переводами. Используйте только официальные инструкции банка.',
    url: 'https://alfabank.ru/help/t/retail/debitcards/alfa-karta-mir/mobilnoe-prilozhenie-i-alfa-onlain/kak-ustanovit-mobilnoe-prilozhenie/',
    actionLabel: 'Открыть инструкцию Альфа-Банка'
  }
];

let activeCategory = 'all';
let currentTab = 'home';

const $ = id => document.getElementById(id);

function renderIcon(product) {
  return `
    <div class="app-icon">
      <img
        src="${product.iconUrl}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"
      >
      <span style="display:none;width:100%;height:100%;place-items:center;font-weight:800">
        ${product.icon}
      </span>
    </div>
  `;
}

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
      ${renderIcon(p)}
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-meta">iPhone · ${p.version}</div>
        <div class="official-label">✓ ${p.sourceLabel}</div>
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

  setTimeout(() => {
    $('toast').classList.add('hidden');
  }, 2300);
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
      ${renderIcon(p)}
      <div>
        <div class="detail-title">${p.name}</div>
        <div class="detail-sub">${p.desc}</div>
      </div>
    </div>

    <div class="official-label">✓ ${p.sourceLabel}</div>

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
      $('searchInput').value = '';
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
