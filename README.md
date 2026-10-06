# JaiMo Blogs

**模块化静态博客与个人知识库模板。**  
**A modular static blog and personal knowledge base template.**

---

## 📂 项目结构 | Project Structure

```text
jaimo-blogs/
├── 📄 index.html                 # 首页 | Home page
├── 📁 pages/                     # 其他页面 | Other pages
│   └── 📄 tps.html               # TPS 页面 | TPS page
│
├── 📁 images/                    # 静态图片 | Static images
│   ├── 🖼️ avatar.png
│   └── 🖼️ background.png
│
├── 📁 js/
│   ├── 📁 core/                  # 公共核心模块 | Shared core modules
│   │   ├── 📜 navbar.js          # 导航栏 | Navigation bar
│   │   ├── 📜 wallet.js          # 钱包连接与账户状态 | Wallet connection and account state
│   │   ├── 📜 support.js         # ETH 支持功能 | ETH support / donation logic
│   │   ├── 📜 hero.js            # Hero 区域与背景 | Hero section and background
│   │   ├── 📜 contact.js         # 联系区域 | Contact section
│   │   ├── 📜 footer.js          # 页脚 | Footer
│   │   └── 📜 utils.js           # 通用工具与全局交互 | Utilities and global interactions
│   │
│   ├── 📁 components/            # 可复用内容组件 | Reusable content components
│   │   ├── 📜 articles.js        # 最新文章列表 | Latest articles list
│   │   └── 📜 sidebar.js         # 文章数据库侧边栏 | Article database sidebar
│   │
│   ├── 📁 config/                # 配置文件 | Configuration
│   │   ├── 📜 common.js          # 公共配置 | Shared site configuration
│   │   └── 📁 pages/             # 页面专属配置 | Page-specific configuration
│   │       ├── 📜 databar.js     # 文章数据库配置 | Article database configuration
│   │       ├── 📜 home.js        # 首页配置 | Home page configuration
│   │       └── 📜 tps.js         # TPS 页面配置 | TPS page configuration
│   │
│   ├── 📁 database/              # 外部数据交互 | External data integration
│   │   └── 📜 appscript.js       # Google Apps Script 邮箱订阅接口 | Google Apps Script email subscription interface
│   │
│   └── 📁 pages/                 # 页面入口逻辑 | Page entry points
│       ├── 📜 home.js            # index.html 的入口逻辑 | Entry point for index.html
│       └── 📜 tps.js             # pages/tps.html 的入口逻辑 | Entry point for pages/tps.html
│
└── 📖 README.md                  # 项目说明 | Project documentation
````

---

## 🧩 项目架构 | Architecture

本项目将**配置、公共功能、可复用组件与页面逻辑**进行分离。
This project separates **configuration, shared functionality, reusable components, and page logic**.

* `core/` — 存放所有页面共享的核心功能。
  Contains functionality shared across pages.

* `components/` — 存放可复用的内容组件。
  Contains reusable content components.

* `config/` — 存放公共配置与页面专属配置。
  Stores shared and page-specific configuration.

* `database/` — 负责与外部数据服务进行交互。
  Handles integration with external data services.

* `pages/` — 负责各个页面的初始化与组装。
  Contains the entry logic for individual pages.

这种结构可以让新的页面和内容复用现有模块，而不需要重复实现底层逻辑。
This structure allows new pages and content to reuse existing modules without duplicating the underlying implementation.

---

## 🌱 设计理念 | Design Philosophy

**Build from first principles.**

这个项目不仅是一个博客页面，也是一个对**模块化、配置分离与可复用静态网站架构**的实践。

This project is not only a blog website, but also an exploration of **modular architecture, configuration separation, and reusable static web development**.

尽可能保持简单、透明和可维护，同时避免不必要的复杂抽象。
The goal is to remain simple, transparent, and maintainable while avoiding unnecessary abstraction.
