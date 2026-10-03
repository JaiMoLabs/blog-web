// ==========================================
// 工具与全局交互 (js/core/utils.js)
// ==========================================

function initDocumentMeta(meta) {
    document.title = meta.title;
    const faviconLink = document.getElementById('favicon');
    if (faviconLink && meta.logoImg) {
        faviconLink.href = meta.logoImg;
    }
}

function toggleTopicsMenu() {
    const menu = document.getElementById('topicsDropdown');
    if (menu) menu.classList.toggle('hidden');
}

function copyWalletAddress() {
    const config = window.SITE_CONFIG;
    const walletAddr = config.navbar.walletAddress; 
    
    navigator.clipboard.writeText(walletAddr).then(() => {
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