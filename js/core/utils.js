// ==========================================
// 工具与全局交互 (js/core/utils.js)
// ==========================================

/**
 * 简单转义 HTML，防止 XSS
 */
function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

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
        showToast(config.messages.copySuccess);
    }).catch(() => {
        showToast('复制失败，请手动复制');
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

/**
 * 显示全局 Toast 提示
 * @param {string} message 要显示的文字
 * @param {number} duration 显示多久（毫秒），默认 2500
 */
function showToast(message, duration = 2500) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerHTML = `<span>${message}</span>`;
    toast.classList.remove('translate-y-20', 'opacity-0');

    // 先清掉之前的定时器，防止连续点击出问题
    if (toast._timer) clearTimeout(toast._timer);

    toast._timer = setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, duration);
}