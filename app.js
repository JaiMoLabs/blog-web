// ==========================================
// 2. 底层组件与渲染引擎 (app.js)
// 统一逻辑层，只负责读取 config 数据并渲染，不含硬编码业务文本
// ==========================================

// ================= 主入口 =================
document.addEventListener("DOMContentLoaded", () => {
    if (!window.SITE_CONFIG) {
        console.error("SITE_CONFIG not found!");
        return;
    }
    const config = window.SITE_CONFIG;
    
    // 初始化网页基础属性 (Title, Favicon)
    initDocumentMeta(config.meta);
    
    // 渲染各个页面模块
    renderNavbar(config);
    renderHero(config.hero);
    renderMainContent(config.database);
    renderContactSection(config);
    renderFooter(config);
    
    // 绑定全局交互事件
    initGlobalEvents();
});

// ================= 模块渲染器 =================

function initDocumentMeta(meta) {
    document.title = meta.title;
    const faviconLink = document.getElementById('favicon');
    if (faviconLink && meta.logoImg) {
        faviconLink.href = meta.logoImg;
    }
}

function renderNavbar(config) {
    const container = document.getElementById('navbar-container');
    if (!container) return;
    
    container.innerHTML = `
        <header class="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-[#d8e2dc] px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-6">
                <a href="${config.meta.homeLink}" class="flex items-center gap-3 group">
                    <div class="w-9 h-9 rounded-lg overflow-hidden bg-[#588157] flex items-center justify-center shadow-sm shrink-0">
                        <img src="${config.meta.logoImg}" alt="${config.meta.siteName}" class="w-full h-full object-cover">
                    </div>
                    <span class="font-bold text-lg tracking-tight text-[#2b2d42]">${config.meta.siteName}</span>
                </a>

                <div class="relative">
                    <button id="topicsBtn" onclick="toggleTopicsMenu()" class="text-xs font-medium px-3.5 py-2 rounded-lg border border-[#d8e2dc] text-[#2b2d42] hover:bg-[#f4f7f4] transition flex items-center gap-1.5 cursor-pointer shadow-sm">
                        ${config.navbar.topicsBtnText} <span class="text-[10px]">▾</span>
                    </button>
                    <div id="topicsDropdown" class="hidden absolute left-0 mt-2 w-48 bg-white border border-[#d8e2dc] rounded-xl shadow-lg py-2 z-50">
                        ${config.navbar.topicsMenu.map(item => {
                            // 智能判断：如果是以 http 开头的链接，就添加 target="_blank" 在新标签页打开
                            const isExternal = item.link.startsWith('http');
                            const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        
                            return `<a href="${item.link}"${targetAttr} class="block px-4 py-2 text-sm text-center hover:bg-[#f4f7f4] text-gray-700 transition">${item.name}</a>`;
                        }).join('')}
                    </div>
                </div>
            </div>

            <div class="hidden md:block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                ${config.navbar.slogan}
            </div>

            <div class="flex items-center gap-3">
                <button onclick="copyWalletAddress()" class="text-xs font-medium px-3.5 py-2 rounded-lg border border-[#588157] text-[#588157] hover:bg-[#588157] hover:text-white transition cursor-pointer">
                    ${config.navbar.supportBtnText}
                </button>
                <button onclick="alert('${config.messages.walletComingSoon}')" class="text-xs font-medium px-4 py-2 rounded-lg bg-[#588157] text-white hover:bg-[#3a5a40] shadow-sm transition cursor-pointer">
                    ${config.navbar.connectWalletBtnText}
                </button>
            </div>
        </header>
    `;
}

function renderHero(hero) {
    const heroContainer = document.getElementById("hero-container");
    if(!heroContainer) return;

    heroContainer.innerHTML = `
        <div class="relative w-full h-[420px] bg-cover bg-center flex items-center -mt-8" style="background-image: url('${hero.backgroundImage}');">
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="relative max-w-7xl mx-auto px-6 w-full">
                <div class="max-w-lg text-left">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-green-900 mb-3 drop-shadow-sm">${hero.title}</h1>
                    <p class="text-lg md:text-xl text-green-800 font-medium drop-shadow-sm">${hero.subtitle}</p>
                </div>
            </div>
        </div>
    `;
}

function renderMainContent(database) {
    const mainContainer = document.getElementById("main-container");
    if(!mainContainer) return;

    let allArticles = [];
    database.categories.forEach(cat => {
        cat.articles.forEach(art => {
            allArticles.push({ ...art, categoryName: cat.name, categoryIcon: cat.icon });
        });
    });

    allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestArticles = allArticles.slice(0, database.latestCount);

    mainContainer.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <!-- 左侧粘性导航栏 -->
            <div class="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
                <div class="flex items-center space-x-2 text-green-800 font-bold text-xl mb-4">
                    <span>${database.titleIcon}</span>
                    <span>${database.title}</span>
                </div>
                <div class="space-y-6">
                    ${database.categories.map(cat => `
                        <div class="space-y-2">
                            <div class="flex items-center space-x-2 text-gray-900 font-semibold text-base">
                                <span>${cat.icon}</span>
                                <span>${cat.name}</span>
                            </div>
                            <div class="pl-6 space-y-1.5 border-l border-gray-100 ml-2">
                                ${cat.articles.map(art => `
                                    <div class="py-0.5">
                                        <a href="${art.url || '#'}" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-600 hover:text-green-700 transition-colors inline-block">
                                            · ${art.title}
                                        </a>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 右侧最新文章流 -->
            <div class="lg:col-span-8 space-y-8">
                <div class="flex items-center space-x-2 text-green-800 font-bold text-xl mb-2">
                    <span>${database.latestIcon}</span>
                    <span>${database.latestTitle}</span>
                </div>

                <div class="space-y-6">
                    ${latestArticles.map(art => `
                        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs">
                            <div class="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md mb-3">
                                ${art.tag}
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-1">
                                <a href="${art.url || '#'}" target="_blank" rel="noopener noreferrer" class="hover:text-green-700 transition-colors">
                                    ${art.title}
                                </a>
                            </h3>
                            <div class="text-xs text-gray-400 mb-3">${art.date}</div>
                            <p class="text-gray-600 text-sm leading-relaxed">${art.summary}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="text-center pt-4 text-sm text-gray-500">
                    Showing ${latestArticles.length} latest updates. Explore all topics in the ${database.titleIcon} <span class="font-semibold text-gray-700">${database.title}</span> on the left.
                </div>
            </div>
        </div>
    `;
}

function renderContactSection(config) {
    const container = document.getElementById('contact-container');
    if (!container) return;

    const contact = config.contact;
    const socialLinks = config.socialLinks;

    const getUrl = (name) => {
        const item = socialLinks.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
        return item ? item.url : '#';
    };

    container.innerHTML = `
        <div class="max-w-3xl mb-6">
            <h2 class="text-3xl font-bold tracking-tight text-[#2b2d42]">${contact.title}</h2>
            <p class="text-gray-600 mt-2 text-base">${contact.subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="bg-white border border-[#d8e2dc] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold text-[#588157]">${contact.cards.support.title}</h3>
                    <p class="text-sm text-gray-600 mt-2">${contact.cards.support.desc}</p>
                </div>
                <div class="mt-8">
                    <a href="${getUrl('GitHub')}" target="_blank" class="inline-block bg-[#f4f7f4] border border-[#d8e2dc] text-[#2b2d42] text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#d8e2dc] transition">
                        ${contact.cards.support.btnText}
                    </a>
                </div>
            </div>

            <div class="bg-white border border-[#d8e2dc] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold text-[#2b2d42]">${contact.cards.twitter.title}</h3>
                    <p class="text-sm text-gray-600 mt-2">${contact.cards.twitter.desc}</p>
                </div>
                <div class="mt-8">
                    <a href="${getUrl('X')}" target="_blank" class="inline-block bg-[#f4f7f4] border border-[#d8e2dc] text-[#2b2d42] text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#d8e2dc] transition">
                        ${contact.cards.twitter.btnText}
                    </a>
                </div>
            </div>

            <div class="bg-white border border-[#d8e2dc] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold text-[#588157]">${contact.cards.newsletter.title}</h3>
                    <p class="text-sm text-gray-600 mt-2">${contact.cards.newsletter.desc}</p>
                </div>
                <div class="mt-6 flex gap-2">
                    <input type="email" id="subscriber-email" placeholder="${contact.cards.newsletter.placeholder}" class="bg-[#f4f7f4] border border-[#d8e2dc] text-xs rounded-xl px-3 py-2.5 w-full focus:outline-none focus:border-[#588157]">
                    <button onclick="submitEmail()" id="submit-btn" class="bg-[#588157] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#3a5a40] transition cursor-pointer shrink-0">
                        ${contact.cards.newsletter.btnText}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderFooter(config) {
    const container = document.getElementById('footer-container');
    if (!container) return;
    const footer = config.footer;

    const totalCols = 2 + footer.columns.length;
    let styleTag = document.getElementById('dynamic-footer-style');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-footer-style';
        document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
        @media (min-width: 768px) {
            .dynamic-footer-grid { grid-template-columns: repeat(${totalCols}, minmax(0, 1fr)) !important; }
        }
    `;

    container.innerHTML = `
        <footer class="bg-white border-t border-[#d8e2dc] mt-20">
            <div class="max-w-7xl mx-auto px-6 py-12">
                <div class="grid grid-cols-1 dynamic-footer-grid gap-8 items-start">
                    <div class="md:col-span-2 space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg overflow-hidden bg-[#588157] flex items-center justify-center shadow-sm shrink-0">
                                <img src="${config.meta.logoImg}" alt="${config.meta.siteName}" class="w-full h-full object-cover">
                            </div>
                            <span class="font-bold text-base text-[#2b2d42]">${config.meta.siteName}</span>
                        </div>
                        <p class="text-xs text-gray-500">${footer.copyright}</p>
                    </div>

                    ${footer.columns.map(col => `
                        <div>
                            <h4 class="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-3">${col.title}</h4>
                            <ul class="space-y-2 text-xs text-gray-600">
                                ${col.links.map(link => `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer" class="hover:text-[#588157] transition">${link.name}</a></li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>

                <div class="mt-12 pt-6 border-t border-[#d8e2dc] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span class="text-xs text-gray-400">${footer.tagline}</span>
                    <div class="flex items-center gap-5 text-gray-600">
                        ${config.socialLinks.map(social => `
                            <a href="${social.url}" target="_blank" title="${social.name}" class="hover:text-[#588157] transition flex items-center justify-center w-6 h-6">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">${social.svg}</svg>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// ================= 交互与事件处理器 =================

function submitEmail() {
    const config = window.SITE_CONFIG;
    const emailInput = document.getElementById('subscriber-email');
    const submitBtn = document.getElementById('submit-btn');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
        alert(config.messages.emailInvalid);
        return;
    }

    const originalText = submitBtn.innerText;
    submitBtn.innerText = config.messages.emailSubmitting;
    submitBtn.disabled = true;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxV1CMbO_pJ-zK0jxnS7VJqOue4AkPyCK7aiN_9A2rsLMtu6_FRgcxoVKuXIBV0Z4ar0A/exec';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    })
    .then(() => {
        alert(config.messages.emailSuccess);
        emailInput.value = ''; 
    })
    .catch(error => {
        console.error('Error!', error);
        alert(config.messages.emailError);
    })
    .finally(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });
}

function toggleTopicsMenu() {
    const menu = document.getElementById('topicsDropdown');
    if (menu) menu.classList.toggle('hidden');
}

function copyWalletAddress() {
    const config = window.SITE_CONFIG;
    navigator.clipboard.writeText(config.meta.walletAddress).then(() => {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.innerHTML = `<span>${config.messages.copySuccess}</span>`;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 2500);
        }
    });
}

function initGlobalEvents() {
    window.addEventListener('click', function(e) {
        const btn = document.getElementById('topicsBtn');
        const menu = document.getElementById('topicsDropdown');
        if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
}