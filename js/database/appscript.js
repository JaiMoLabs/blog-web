// ==========================================
// 联系我们与 Google Apps Script 服务模块 (js/database/appscript.js)
// ==========================================

window.ContactModule = {
    /**
     * 渲染 Contact 板块到指定的 DOM 容器中
     * @param {Object} config 整个 SITE_CONFIG 对象
     */
    render(config) {
        const container = document.getElementById('contact-container');
        if (!container) return;

        const contact = config.contact;
        const socialLinks = config.socialLinks || [];

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
                        <button onclick="ContactModule.submitEmail()" id="submit-btn" class="bg-[#588157] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#3a5a40] transition cursor-pointer shrink-0">
                            ${contact.cards.newsletter.btnText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * 提交邮箱核心逻辑
     */
    async submitEmail() {
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

        try {
            const scriptURL = config.contact.scriptURL;
            await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            alert(config.messages.emailSuccess);
            emailInput.value = ''; 
        } catch (error) {
            console.error('Error!', error);
            alert(config.messages.emailError);
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    }
};