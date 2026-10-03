// ==========================================
// 谷歌表格后端交互逻辑 (js/database/appscript.js)
// ==========================================

function subscribeEmailToSheet() {
    const config = window.SITE_CONFIG;
    const emailInput = document.getElementById('subscriber-email');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!emailInput || !submitBtn) return;
    
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
        alert(config.messages.emailInvalid);
        return;
    }

    const originalText = submitBtn.innerText;
    submitBtn.innerText = config.messages.emailSubmitting;
    submitBtn.disabled = true;

    // 从全局配置中安全获取 Google Apps Script URL
    const scriptURL = config.api && config.api.googleScriptURL;
    if (!scriptURL) {
        console.error("Google Apps Script URL not configured!");
        alert(config.messages.emailError);
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
        alert(config.messages.emailSuccess);
        emailInput.value = ''; 
    })
    .catch(error => {
        console.error('Error submitting email!', error);
        alert(config.messages.emailError);
    })
    .finally(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });
}