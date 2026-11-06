const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const root = document.documentElement;
function setTheme() {
  const scheme = tg?.colorScheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.dataset.theme = scheme;
}
setTheme();
if (tg?.onEvent) tg.onEvent('themeChanged', setTheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', setTheme);

const categories = [
  {id:'all',name:'Все',icon:'✦'},
  {id:'photo',name:'Фото',icon:'◈'},
  {id:'tools',name:'Утилиты',icon:'⌘'},
  {id:'games',name:'Игры',icon:'▣'}
];
const products = [
  {id:'sample-photo',name:'Photo Studio',desc:'Инструменты для работы с фото',category:'photo',icon:'✧',tone:'',price:'Демо-карточка',version:'1.0',compat:'Уточняется',method:'Будет указан после проверки',description:'Демонстрационная карточка каталога. Перед публикацией добавьте приложение, права на распространение, совместимость и проверенный способ установки.'},
  {id:'sample-tools',name:'Smart Tools',desc:'Полезные инструменты на каждый день',category:'tools',icon:'⌘',tone:'green',price:'Демо-карточка',version:'1.0',compat:'Уточняется',method:'Будет указан после проверки',description:'Демонстрационная карточка. Здесь будет полное описание, условия лицензии и инструкция.'},
  {id:'sample-game',name:'Arcade Pack',desc:'Подборка небольших игр',category:'games',icon:'▣',tone:'orange',price:'Демо-карточка',version:'1.0',compat:'Уточняется',method:'Будет указан после проверки',description:'Демонстрационная карточка. Не является предложением к покупке реального приложения.'},
  {id:'sample-media',name:'Media Toolkit',desc:'Работа с аудио и видео',category:'tools',icon:'♫',tone:'blue',price:'Демо-карточка',version:'1.0',compat:'Уточняется',method:'Будет указан после проверки',description:'Демонстрационная карточка. Наполните её проверенными сведениями перед публикацией.'}
];
let activeCategory='all';
let currentTab='home';
const $=id=>document.getElementById(id);
function renderCategories(){
  $('categories').innerHTML=categories.map(c=>`<button class="category ${activeCategory===c.id?'selected':''}" data-category="${c.id}"><span class="cat-icon">${c.icon}</span><small>${c.name}</small></button>`).join('');
}
function renderProducts(){
  const q=$('searchInput').value.trim().toLowerCase();
  const filtered=products.filter(p=>(activeCategory==='all'||p.category===activeCategory)&&(`${p.name} ${p.desc}`).toLowerCase().includes(q));
  $('productList').innerHTML=filtered.map(p=>`<article class="product-card"><div class="app-icon ${p.tone}">${p.icon}</div><div class="product-info"><div class="product-name">${p.name}</div><div class="product-desc">${p.desc}</div><div class="product-meta">iPhone · ${p.version}</div></div><button class="product-action" data-product="${p.id}">Подробнее</button></article>`).join('');
  $('emptyState').classList.toggle('hidden',filtered.length>0);
  $('catalogTitle').textContent=activeCategory==='all'?'Популярное':categories.find(c=>c.id===activeCategory)?.name||'Каталог';
}
function toast(message){$('toast').textContent=message;$('toast').classList.remove('hidden');setTimeout(()=>$('toast').classList.add('hidden'),2300)}
function openProduct(id){
 const p=products.find(x=>x.id===id);if(!p)return;
 $('modalContent').innerHTML=`<div class="detail-head"><div class="app-icon ${p.tone}">${p.icon}</div><div><div class="detail-title">${p.name}</div><div class="detail-sub">${p.desc}</div></div></div><p class="detail-copy">${p.description}</p><div class="detail-label">ВЕРСИЯ</div><div class="detail-value">${p.version}</div><div class="detail-label">СОВМЕСТИМОСТЬ</div><div class="detail-value">${p.compat}</div><div class="detail-label">СПОСОБ УСТАНОВКИ</div><div class="detail-value">${p.method}</div><button class="primary-button" id="detailAction">Скоро в каталоге</button>`;
 $('detailAction').onclick=()=>toast('Это демонстрационная карточка. Покупка пока не подключена.');
 $('modalBackdrop').classList.remove('hidden');
}
$('categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;renderCategories();renderProducts();});
$('productList').addEventListener('click',e=>{const b=e.target.closest('[data-product]');if(b)openProduct(b.dataset.product);});
$('searchInput').addEventListener('input',renderProducts);
$('clearSearch').onclick=()=>{$('searchInput').value='';renderProducts();};
$('allBtn').onclick=()=>{activeCategory='all';renderCategories();renderProducts();$('searchInput').value='';};
$('modalClose').onclick=()=>$('modalBackdrop').classList.add('hidden');
$('modalBackdrop').addEventListener('click',e=>{if(e.target===$('modalBackdrop'))$('modalBackdrop').classList.add('hidden');});
$('profileBtn').onclick=()=>toast('Личный кабинет будет подключён следующим этапом.');
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));b.classList.add('active');currentTab=b.dataset.tab;if(currentTab==='home'||currentTab==='catalog'){activeCategory='all';renderCategories();renderProducts();window.scrollTo({top:0,behavior:'smooth'});}else toast(currentTab==='orders'?'История заказов появится после подключения базы данных.':'Профиль будет подключён следующим этапом.');}));
renderCategories();renderProducts();
