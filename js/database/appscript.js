// ==========================================
// 谷歌表格后端交互逻辑 (js/database/appscript.js)
// ==========================================

window.Blog = window.Blog || {};

Blog.subscribeEmailToSheet = function() {
    const config = window.SITE_CONFIG;
    const emailInput = document.getElementById('subscriber-email');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!emailInput || !submitBtn) return;
    
    const email = emailInput.value.trim();

    // 更靠谱一点的邮箱检查
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        Blog.showToast(config.messages.emailInvalid);
        return;
    }

    const originalText = submitBtn.innerText;
    submitBtn.innerText = config.messages.emailSubmitting;
    submitBtn.disabled = true;

    const scriptURL = config.api && config.api.googleScriptURL;
    if (!scriptURL) {
        console.error("Google Apps Script URL not configured!");
        Blog.showToast(config.messages.emailError);
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
        return;
    }

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    })
    .then(() => {
        Blog.showToast(config.messages.emailSuccess);
        emailInput.value = '';
    })
    .catch(error => {
        console.error('Error submitting email!', error);
        Blog.showToast(config.messages.emailError);
    })
    .finally(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });
};