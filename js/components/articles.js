// ==========================================
// 右侧文章流组件 (js/components/articles.js)
// ==========================================

function renderLatestArticles(database) {
    let allArticles = [];
    database.categories.forEach(cat => {
        cat.articles.forEach(art => {
            allArticles.push({ ...art, categoryName: cat.name, categoryIcon: cat.icon });
        });
    });

    allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestArticles = allArticles.slice(0, database.latestCount);

    return `
        <div class="space-y-8">
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
                                ${escapeHtml(art.title)}
                            </a>
                        </h3>
                        <div class="text-xs text-gray-400 mb-3">${art.date}</div>
                        <p class="text-gray-600 text-sm leading-relaxed">${escapeHtml(art.summary)}</p>
                    </div>
                `).join('')}
            </div>

            <div class="text-center pt-4 text-sm text-gray-500">
                Showing ${latestArticles.length} latest updates. Explore all topics in the ${database.titleIcon} <span class="font-semibold text-gray-700">${database.title}</span> on the left.
            </div>
        </div>
    `;
}