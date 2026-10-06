// ==========================================
// 文章数据库配置 / Article database configuration
// ==========================================

window.DATABAR_CONFIG = {
    database: {
        // 数据库标题与分类列表 / Database title and category list
        title: "Database",
        titleIcon: "🌱",
        categories: [
            {
                // 分类名称与图标 / Category name and icon
                name: "Topics",
                icon: "📊",
                articles: [
                    {
                        // 文章唯一标识 / Unique article identifier
                        id: "token-price-simulation",
                        title: "Token Price Simulation",
                        date: "2026/10/10",
                        tag: "Topics",
                        url: "https://github.com/jaimoeth/topics/blob/main/token-price-simulation.ipynb",
                        summary: "From fundamental assumptions to the derivation of Stochastic Differential Equations (SDEs). The complete process of mathematical modeling and quantitative simulation for token price generation functions."
                    }
                ]
            },
            {
                name: "Python",
                icon: "🐍",
                articles: [
                    {
                        id: "basics-english",
                        title: "Basics - English",
                        date: "2026/10/12",
                        tag: "Python",
                        url: "https://github.com/jaimoeth/python/blob/main/basics-english.ipynb",
                        summary: "These open-source study notes are based on the MIT 6.0001 course taught by Dr. Ana Bell and other professors. They are shared under the CC-BY-NC-SA license."
                    },
                    {
                        id: "basics-chinese",
                        title: "Basics - Chinese",
                        date: "2026/10/11",
                        tag: "Python",
                        url: "https://github.com/jaimoeth/python/blob/main/basics-chinese.ipynb",
                        summary: "这份开源学习笔记基于 Ana Bell 博士等教授讲授的 MIT 6.0001 课程整理而成。本笔记采用 CC-BY-NC-SA 许可协议进行分享。"
                    }
                ]
            },
            {
                name: "Products",
                icon: "🔬",
                articles: [
                    {
                        id: "blog-website",
                        title: "Blog Website",
                        date: "2026/10/03",
                        tag: "Products",
                        url: "https://github.com/JaiMoLabs/blog-web",
                        summary: "An open-source template for Web3 static blogs and personal knowledge bases, showcasing decentralized web practices."
                    },
                    {
                        id: "text-website",
                        title: "Text Website",
                        date: "2026/10/15",
                        tag: "Products",
                        url: "https://github.com/JaiMoLabs/text-web",
                        summary: "An open-source template for Web3 static blog content pages, designed to be used with open-source blog content."
                    }
                ]
            }
        ]
    }
};