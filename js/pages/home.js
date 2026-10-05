// ==========================================
// 首页主逻辑入口 (js/pages/home.js)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    if (!window.SITE_CONFIG || !window.PAGE_CONFIG) {
        console.error("Configurations not found!");
        return;
    }
    
    const commonConfig = window.SITE_CONFIG;
    const pageConfig = window.PAGE_CONFIG;
    
    // 合并数据库配置
    const mergedDatabase = {
        ...commonConfig.database,
        ...pageConfig.database
    };
    
    // 1. 初始化网页基础元信息
    initDocumentMeta(commonConfig.meta);
    
    // 2. 渲染公共外设模块
    renderNavbar(commonConfig);
    renderHero(commonConfig);
    
    // 3. 渲染主干内容
    const mainContainer = document.getElementById("main-container");
    if (mainContainer) {
        mainContainer.innerHTML = `
            <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div class="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
                    ${renderSidebar(mergedDatabase)}
                </div>
                <div class="lg:col-span-8 space-y-8">
                    ${renderLatestArticles(mergedDatabase)}
                </div>
            </div>
        `;
    }
    
    // 4. 渲染联系我们与底部

    // 渲染独立的 Contact 板块（由 appscript.js 提供）
    if (window.ContactModule) {
        window.ContactModule.render(config);
    }
    
    renderFooter(commonConfig);
    
    // 5. 绑定全局交互事件
    initGlobalEvents();
});