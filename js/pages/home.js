// ==========================================
// 首页主逻辑入口 (js/pages/home.js)
// ==========================================

window.Blog = window.Blog || {};

document.addEventListener("DOMContentLoaded", () => {
    if (!window.SITE_CONFIG || !window.DATABAR_CONFIG || !window.PAGE_CONFIG) {
        console.error("Configurations not found!");
        return;
    }
    
    const commonConfig = window.SITE_CONFIG;
    const databarConfig = window.DATABAR_CONFIG;
    const pageConfig = window.PAGE_CONFIG;
    
    const mergedDatabase = {
        ...databarConfig.database,
        ...(pageConfig.database || {})
    };
    
    // 1. 初始化网页基础元信息
    Blog.initDocumentMeta(commonConfig.meta);
    
    // 2. 渲染公共外设模块
    Blog.renderNavbar(commonConfig);
    Blog.renderHero(commonConfig);
    
    // 3. 渲染主干内容
    const mainContainer = document.getElementById("main-container");
    if (mainContainer) {
        mainContainer.innerHTML = `
            <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div class="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
                    ${Blog.renderSidebar(mergedDatabase)}
                </div>
                <div class="lg:col-span-8 space-y-8">
                    ${Blog.renderLatestArticles(mergedDatabase)}
                </div>
            </div>
        `;
    }
    
    // 4. 渲染联系我们与底部
    Blog.renderContactSection(commonConfig);
    Blog.renderFooter(commonConfig);
    
    // 5. 绑定全局交互事件
    Blog.initGlobalEvents();

    // 6. 钱包：恢复已连接状态 + 监听账户变化
    Blog.tryRestoreWallet();
    Blog.bindWalletEvents();
});