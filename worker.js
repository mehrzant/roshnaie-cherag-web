const POSTS_URL = "https://raw.githubusercontent.com/mehrzant/roshnaie-cherag-web/main/posts.json";
const LOGO_URL = "https://raw.githubusercontent.com/mehrzant/roshnaie-cherag-web/main/logo.png";

const HTML_PAGE = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>رُژنائیں چراگ</title>
<style>
  :root {
    --bg: #111317;
    --card: #191c22;
    --card-2: #22262f;
    --text: #f3f4f6;
    --muted: #9ca3af;
    --accent: #eab308;
    --accent-text: #111317;
    --border: rgba(255,255,255,0.08);
    --nav-bg: rgba(25,28,34,0.95);
    --font-size: 18px;
    --line-height: 1.85;
  }
  body.light-theme {
    --bg: #f6f7fb;
    --card: #ffffff;
    --card-2: #eef0f6;
    --text: #16181d;
    --muted: #5b6270;
    --accent: #eab308;
    --accent-text: #111317;
    --border: rgba(0,0,0,0.08);
    --nav-bg: rgba(255,255,255,0.96);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 16px 14px 104px;
    background: var(--bg);
    color: var(--text);
    font-family: system-ui, -apple-system, sans-serif;
    transition: background 0.2s, color 0.2s;
  }
  .container { max-width: 680px; margin: 0 auto; }
  .header-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 16px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .brand-title { font-size: 22px; font-weight: 800; margin: 0 0 4px; }
  .brand-sub { font-size: 13px; color: var(--muted); margin: 0; }
  .brand-logo {
    width: 54px; height: 54px; border-radius: 50%;
    object-fit: cover; border: 2px solid var(--accent);
    background: #111317; display: flex; align-items: center;
    justify-content: center; overflow: hidden; flex-shrink: 0;
  }
  .filters-bar {
    display: flex; gap: 8px; overflow-x: auto;
    padding: 4px 2px 12px; scrollbar-width: none;
  }
  .filters-bar::-webkit-scrollbar { display: none; }
  .filter-btn {
    border: 1px solid var(--border); background: var(--card);
    color: var(--text); padding: 9px 15px; border-radius: 999px;
    font-size: 14px; font-weight: 700; white-space: nowrap; cursor: pointer;
  }
  .filter-btn.active {
    background: var(--accent); color: var(--accent-text); border-color: var(--accent);
  }
  .card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 18px; padding: 15px; margin-bottom: 14px;
  }
  .card-top {
    display: flex; justify-content: space-between; align-items: center;
    gap: 8px; margin-bottom: 10px;
  }
  .tag-badge {
    background: var(--card-2); color: var(--text);
    padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 700;
  }
  .fav-btn {
    background: var(--card-2); color: var(--text);
    border: 1px solid var(--border); padding: 6px 12px;
    border-radius: 999px; font-size: 13px; font-weight: 700; cursor: pointer;
  }
  .fav-btn.active { background: var(--accent); color: var(--accent-text); }
  .media-wrap { margin-top: 8px; }
  .post-img, .post-video {
    width: 100%; border-radius: 14px; display: block;
    max-height: 460px; object-fit: cover; background: #000;
  }
  .text-box-wrap { margin-top: 10px; }
  .top-actions {
    display: flex; justify-content: flex-start; gap: 6px;
    margin-bottom: 6px; direction: ltr;
  }
  .mini-btn {
    border: 1px solid var(--border); background: var(--card-2);
    color: var(--text); padding: 4px 10px; border-radius: 8px;
    font-size: 12px; font-weight: 700; cursor: pointer; text-decoration: none;
  }
  .photo-bio-box {
    padding: 11px 13px; border-radius: 12px;
    background: var(--card-2); font-size: calc(var(--font-size) * 0.9);
    line-height: var(--line-height); white-space: pre-line;
  }
  audio { width: 100%; margin-top: 4px; border-radius: 12px; }
  .audio-status {
    font-size: 12px; color: var(--muted); margin-top: 4px;
  }
  .audio-note-box {
    padding: 12px; border-radius: 12px;
    background: var(--card-2); font-size: var(--font-size);
    line-height: var(--line-height); white-space: pre-line;
  }
  .text-block {
    padding: 12px; border-radius: 12px;
    background: var(--card-2); font-size: var(--font-size);
    line-height: var(--line-height); white-space: pre-line;
  }
  .search-input {
    width: 100%; padding: 12px 14px; border-radius: 14px;
    border: 1px solid var(--border); background: var(--card);
    color: var(--text); font-size: 15px; margin-bottom: 12px;
  }
  .setting-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 0; border-bottom: 1px solid var(--border); gap: 10px;
  }
  .setting-row:last-child { border-bottom: none; }
  .btn {
    border: 1px solid var(--border); background: var(--card-2);
    color: var(--text); padding: 8px 14px; border-radius: 11px;
    font-size: 13px; font-weight: 700; cursor: pointer;
  }
  .btn-primary {
    background: var(--accent); color: var(--accent-text); border-color: var(--accent);
  }
  .bottom-nav {
    position: fixed; bottom: 14px; left: 50%; transform: translateX(-50%);
    width: calc(100% - 24px); max-width: 520px;
    background: var(--nav-bg); border: 1px solid var(--border);
    backdrop-filter: blur(12px); border-radius: 24px;
    padding: 8px 10px; display: flex; justify-content: space-around;
    align-items: center; z-index: 50; box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  }
  .nav-item {
    border: none; background: transparent; color: var(--muted);
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    font-size: 12px; font-weight: 700; padding: 7px 14px; border-radius: 16px; cursor: pointer;
  }
  .nav-item.active { background: var(--accent); color: var(--accent-text); }
  .empty-box {
    text-align: center; padding: 36px 16px; color: var(--muted);
    background: var(--card); border-radius: 18px; border: 1px solid var(--border);
  }
  .toast {
    position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
    background: var(--accent); color: var(--accent-text); padding: 8px 16px;
    border-radius: 999px; font-size: 13px; font-weight: 800; z-index: 100;
    opacity: 0; pointer-events: none; transition: opacity 0.2s;
  }
  .toast.show { opacity: 1; }
  .page { display: none; }
  .page.active { display: block; }
</style>
</head>
<body>
<div id="toast" class="toast"></div>
<div class="container">
  <section id="page-home" class="page active">
    <div class="header-card">
      <div>
        <h1 class="brand-title">رُژنائیں چراگ</h1>
        <p class="brand-sub">دیوان شعر، نبشتہ، تامُر و سوت</p>
      </div>
      <div class="brand-logo">
        <img id="siteLogo" alt="رُژنائیں چراگ" style="width:100%;height:100%;object-fit:cover;" onload="document.getElementById('logoSvg').style.display='none'" onerror="this.style.display='none'" />
        <svg id="logoSvg" viewBox="0 0 64 64" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 14h16l4 10H20l4-10z" stroke="#eab308" stroke-width="2.5" stroke-linejoin="round"/>
          <rect x="19" y="24" width="26" height="24" rx="10" stroke="#eab308" stroke-width="2.5"/>
          <path d="M32 29c3.5 4 4.5 7 0 11-4.5-4-3.5-7 0-11z" fill="#eab308"/>
          <path d="M18 52h28" stroke="#eab308" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <div class="filters-bar" id="filtersBar">
      <button class="filter-btn active" onclick="setFilter('ALL', this)">سرجم</button>
      <button class="filter-btn" onclick="setFilter('TAMUR', this)">تامُر</button>
      <button class="filter-btn" onclick="setFilter('AUDIO', this)">سوت ءُ گَزل</button>
      <button class="filter-btn" onclick="setFilter('IMAGE_TEXT', this)">نبشتہ ءُ اَکس</button>
    </div>
    <div id="postsList"></div>
  </section>

  <section id="page-search" class="page">
    <div class="header-card"><div><h2 class="brand-title">شوهاز</h2><p class="brand-sub">جست‌وجو در متن، برچسب و صوت‌ها</p></div></div>
    <input id="searchInput" class="search-input" type="search" placeholder="شوهاز کن..." oninput="renderSearch()" />
    <div id="searchResults"></div>
  </section>

  <section id="page-favs" class="page">
    <div class="header-card"><div><h2 class="brand-title">دوست بیتگیں شئر</h2><p class="brand-sub">پست‌های پسندیده‌شده شما</p></div></div>
    <div id="favResults"></div>
  </section>

  <section id="page-settings" class="page">
    <div class="header-card"><div><h2 class="brand-title">ردءِ بند</h2><p class="brand-sub">تنظیمات ظاهر و خوانش</p></div></div>
    <div class="card">
      <div class="setting-row">
        <span>تم روشن / تیره</span>
        <button class="btn btn-primary" onclick="toggleTheme()">تغییر تم</button>
      </div>
      <div class="setting-row">
        <span>اندازه فونت (<span id="fontSizeVal">18</span>px)</span>
        <div>
          <button class="btn" onclick="changeFontSize(-2)">A-</button>
          <button class="btn" onclick="changeFontSize(2)">A+</button>
        </div>
      </div>
      <div class="setting-row">
        <span>فاصله خطوط (<span id="lineHeightVal">1.85</span>)</span>
        <div>
          <button class="btn" onclick="changeLineHeight(-0.1)">-</button>
          <button class="btn" onclick="changeLineHeight(0.1)">+</button>
        </div>
      </div>
    </div>
  </section>
</div>

<nav class="bottom-nav">
  <button class="nav-item active" onclick="openPage('page-home', this)"><span>🏠</span><span>گِس</span></button>
  <button class="nav-item" onclick="openPage('page-search', this)"><span>🔍</span><span>شوهاز</span></button>
  <button class="nav-item" onclick="openPage('page-favs', this)"><span>🔖</span><span>دوست بیتگیں</span></button>
  <button class="nav-item" onclick="openPage('page-settings', this)"><span>⚙️</span><span>ردءِ بند</span></button>
</nav>
<script>
const STORAGE_KEY_FAVS = "roshnaie_favs_v1";
const STORAGE_KEY_THEME = "roshnaie_theme_v1";
const STORAGE_KEY_FONT = "roshnaie_font_v1";
const STORAGE_KEY_LH = "roshnaie_lh_v1";

let allPosts = [];
let currentFilter = "ALL";
let favIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_FAVS) || "[]"));

function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

function copyText(text) {
  if (!text) return;
  navigator.clipboard?.writeText(text).then(() => showToast("کپی شد")).catch(() => {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("کپی شد");
  });
}

function openPage(pageId, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId)?.classList.add("active");
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  btn?.classList.add("active");
  if (pageId === "page-search") renderSearch();
  if (pageId === "page-favs") renderFavs();
}

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn?.classList.add("active");
  renderPosts();
}

function toggleFav(id) {
  const key = String(id);
  if (favIds.has(key)) {
    favIds.delete(key);
    showToast("از علاقه‌مندی‌ها حذف شد");
  } else {
    favIds.add(key);
    showToast("به علاقه‌مندی‌ها اضافه شد");
  }
  localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify([...favIds]));
  renderPosts();
  if (document.getElementById("page-favs").classList.contains("active")) renderFavs();
  if (document.getElementById("page-search").classList.contains("active")) renderSearch();
}

function labelForCategory(cat) {
  if (cat === "TAMUR") return "تامُر";
  if (cat === "AUDIO") return "سوت ءُ گَزل";
  if (cat === "IMAGE_TEXT") return "نبشتہ ءُ اَکس";
  return cat || "پست";
}

function renderCard(post) {
  const id = String(post.id ?? post.url ?? Math.random());
  const isFav = favIds.has(id);
  const cat = post.category || "IMAGE_TEXT";
  const text = post.text || post.caption || "";
  const mediaUrl = post.media_url || post.url || "";

  let mediaHtml = "";
  if (cat === "TAMUR" && mediaUrl) {
    mediaHtml = \`<div class=\"media-wrap\"><video class="post-video" controls playsinline preload="metadata" src="${mediaUrl}"></video\></div>\`;
  } else if (cat === "AUDIO" && mediaUrl) {
    mediaHtml = \`<div class=\"media-wrap\"><audio controls preload="metadata" src="${mediaUrl}"></audio><div class="audio-status">پخش صوتی</div\></div>\`;
  } else if (mediaUrl) {
    mediaHtml = \`<div class=\"media-wrap\"><img class="post-img" loading="lazy" src="${mediaUrl}" alt="" /\></div>\`;
  }

  const textHtml = text ? \`
    <div class="text-box-wrap">
      <div class="top-actions">
        <button class="mini-btn" onclick="copyText(${JSON.stringify(text)})">کپی متن</button>
      </div>
      <div class="${cat === "IMAGE_TEXT" && mediaUrl ? "photo-bio-box" : (cat === "AUDIO" ? "audio-note-box" : "text-block")}">${text}</div>
    </div>\` : "";

  return \`
    <article class=\"card\">
      <div class="card-top">
        <span class="tag-badge">${labelForCategory(cat)}</span>
        <button class="fav-btn ${isFav ? "active" : ""}" onclick="toggleFav(${JSON.stringify(id)})">${isFav ? "★ پسندیده" : "☆ پسند"}</button>
      </div>
      ${mediaHtml}
      ${textHtml}
    </article>\`;
}

function renderPosts() {
  const list = document.getElementById("postsList");
  const filtered = currentFilter === "ALL" ? allPosts : allPosts.filter(p => (p.category || "IMAGE_TEXT") === currentFilter);
  if (!filtered.length) {
    list.innerHTML = \`<div class="empty-box">پستی در این بخش یافت نشد.</div>\`;
    return;
  }
  list.innerHTML = filtered.map(renderCard).join("");
}

function renderSearch() {
  const q = (document.getElementById("searchInput")?.value || "").trim().toLowerCase();
  const box = document.getElementById("searchResults");
  if (!q) {
    box.innerHTML = \`<div class="empty-box">کلمه‌ای برای جست‌وجو بنویسید.</div>\`;
    return;
  }
  const matches = allPosts.filter(p =>
    String(p.text || p.caption || "").toLowerCase().includes(q) ||
    String(p.category || "").toLowerCase().includes(q) ||
    labelForCategory(p.category).toLowerCase().includes(q)
  );
  box.innerHTML = matches.length ? matches.map(renderCard).join("") : \`<div class="empty-box">نتیجه‌ای پیدا نشد.</div>\`;
}

function renderFavs() {
  const box = document.getElementById("favResults");
  const favs = allPosts.filter(p => favIds.has(String(p.id ?? p.url ?? "")));
  box.innerHTML = favs.length ? favs.map(renderCard).join("") : \`<div class="empty-box">هنوز پستی را نپسندیده‌اید.</div>\`;
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  localStorage.setItem(STORAGE_KEY_THEME, document.body.classList.contains("light-theme") ? "light" : "dark");
}

function changeFontSize(delta) {
  const current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-size")) || 18;
  const next = Math.min(28, Math.max(14, current + delta));
  document.documentElement.style.setProperty("--font-size", \`${next}px\`);
  document.getElementById("fontSizeVal").textContent = next;
  localStorage.setItem(STORAGE_KEY_FONT, String(next));
}

function changeLineHeight(delta) {
  const current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--line-height")) || 1.85;
  const next = Math.min(2.6, Math.max(1.3, Number((current + delta).toFixed(2))));
  document.documentElement.style.setProperty("--line-height", String(next));
  document.getElementById("lineHeightVal").textContent = next;
  localStorage.setItem(STORAGE_KEY_LH, String(next));
}
async function loadPosts() {
  const list = document.getElementById("postsList");
  try {
    const res = await fetch(\`${POSTS_URL}?t=${Date.now()}\`, { cache: "no-store" });
    if (!res.ok) throw new Error("خطا در دریافت پست‌ها");
    const data = await res.json();
    allPosts = Array.isArray(data) ? data : (Array.isArray(data.posts) ? data.posts : []);
    renderPosts();
  } catch (err) {
    list.innerHTML = \`<div class="empty-box">خطا در بارگذاری پست‌ها: ${err.message}</div>\`;
  }
}

(function init() {
  const logoImg = document.getElementById("siteLogo");
  if (logoImg && LOGO_URL) logoImg.src = LOGO_URL;

  if (localStorage.getItem(STORAGE_KEY_THEME) === "light") {
    document.body.classList.add("light-theme");
  }
  const savedFont = localStorage.getItem(STORAGE_KEY_FONT);
  if (savedFont) {
    document.documentElement.style.setProperty("--font-size", \`${savedFont}px\`);
    const el = document.getElementById("fontSizeVal");
    if (el) el.textContent = savedFont;
  }
  const savedLh = localStorage.getItem(STORAGE_KEY_LH);
  if (savedLh) {
    document.documentElement.style.setProperty("--line-height", savedLh);
    const el = document.getElementById("lineHeightVal");
    if (el) el.textContent = savedLh;
  }

  loadPosts();
})();
</script>
</body>
</html>`;

export default {
  async fetch() {
    return new Response(HTML_PAGE, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
};

