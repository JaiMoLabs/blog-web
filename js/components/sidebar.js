// ==========================================
// 左侧数据库侧边栏组件 (js/components/sidebar.js)
// ==========================================

function renderSidebar(database) {
    return `
        <div class="space-y-6">
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
    `;
}