<div align="center">

# JaiMo Blogs

**A modular static blog and personal knowledge base template.**

**模块化静态博客与个人知识库模板。**

<a href="#english">English</a>  |  <a href="#中文">简体中文</a>

</div>

---

# English

## 📂 Project Structure

```text
jaimo-blogs/
├── 📄 index.html                  # Home page
├── 📁 pages/                      # Other pages
│   └── 📄 tps.html                # TPS page
│
├── 📁 images/                     # Static images
│   ├── 🖼️ avatar.png
│   └── 🖼️ background.png
│
├── 📁 js/
│   ├── 📁 core/                  # Shared core modules
│   │   ├── 📜 navbar.js          # Navigation bar
│   │   ├── 📜 wallet.js          # Wallet connection and account state
│   │   ├── 📜 support.js         # ETH support / donation logic
│   │   ├── 📜 hero.js            # Hero section and background
│   │   ├── 📜 contact.js         # Contact section
│   │   ├── 📜 footer.js          # Footer
│   │   └── 📜 utils.js           # Utilities and global interactions
│   │
│   ├── 📁 components/            # Reusable content components
│   │   ├── 📜 articles.js        # Latest articles list
│   │   └── 📜 sidebar.js         # Article database sidebar
│   │
│   ├── 📁 config/                # Configuration
│   │   ├── 📜 common.js          # Shared site configuration
│   │   └── 📁 pages/             # Page-specific configuration
│   │       ├── 📜 databar.js     # Article database configuration
│   │       ├── 📜 home.js        # Home page configuration
│   │       └── 📜 tps.js         # TPS page configuration
│   │
│   ├── 📁 database/              # External data integration
│   │   └── 📜 appscript.js       # Google Apps Script email subscription interface
│   │
│   └── 📁 pages/                 # Page entry points
│       ├── 📜 home.js            # Entry point for index.html
│       └── 📜 tps.js             # Entry point for pages/tps.html
│
└── 📖 README.md                  # Project documentation
````

---

## 🧩 Architecture

This project separates **configuration, shared functionality, reusable components, and page logic**.

* `core/` — Contains functionality shared across pages.
* `components/` — Contains reusable content components.
* `config/` — Stores shared and page-specific configuration.
* `database/` — Handles integration with external data services.
* `pages/` — Contains the entry logic for individual pages.

This structure allows new pages and content to reuse existing modules without duplicating the underlying implementation.

---

## 🌱 Design Philosophy

**Build from first principles.**

This project is not only a blog website, but also an exploration of **modular architecture, configuration separation, and reusable static web development**.

The goal is to remain simple, transparent, and maintainable while avoiding unnecessary abstraction.

---

# 中文

## 📂 项目结构

```text
jaimo-blogs/
├── 📄 index.html                  # 首页
├── 📁 pages/                      # 其他页面
│   └── 📄 tps.html                # TPS 页面
│
├── 📁 images/                     # 静态图片
│   ├── 🖼️ avatar.png
│   └── 🖼️ background.png
│
├── 📁 js/
│   ├── 📁 core/                  # 公共核心模块
│   │   ├── 📜 navbar.js          # 导航栏
│   │   ├── 📜 wallet.js          # 钱包连接与账户状态
│   │   ├── 📜 support.js         # ETH 支持功能
│   │   ├── 📜 hero.js            # Hero 区域与背景
│   │   ├── 📜 contact.js         # 联系区域
│   │   ├── 📜 footer.js          # 页脚
│   │   └── 📜 utils.js           # 通用工具与全局交互
│   │
│   ├── 📁 components/            # 可复用内容组件
│   │   ├── 📜 articles.js        # 最新文章列表
│   │   └── 📜 sidebar.js         # 文章数据库侧边栏
│   │
│   ├── 📁 config/                # 配置文件
│   │   ├── 📜 common.js          # 公共配置
│   │   └── 📁 pages/             # 页面专属配置
│   │       ├── 📜 databar.js     # 文章数据库配置
│   │       ├── 📜 home.js        # 首页配置
│   │       └── 📜 tps.js         # TPS 页面配置
│   │
│   ├── 📁 database/              # 外部数据交互
│   │   └── 📜 appscript.js       # Google Apps Script 邮箱订阅接口
│   │
│   └── 📁 pages/                 # 页面入口逻辑
│       ├── 📜 home.js            # index.html 的入口逻辑
│       └── 📜 tps.js             # pages/tps.html 的入口逻辑
│
└── 📖 README.md                  # 项目说明
```

---

## 🧩 项目架构

本项目将**配置、公共功能、可复用组件与页面逻辑**进行分离。

* `core/` — 存放所有页面共享的核心功能。
* `components/` — 存放可复用的内容组件。
* `config/` — 存放公共配置与页面专属配置。
* `database/` — 负责与外部数据服务进行交互。
* `pages/` — 负责各个页面的初始化与组装。

这种结构可以让新的页面和内容复用现有模块，而不需要重复实现底层逻辑。

---

## 🌱 设计理念

**Build from first principles.**

这个项目不仅是一个博客页面，也是一个对**模块化、配置分离与可复用静态网站架构**的实践。

尽可能保持简单、透明和可维护，同时避免不必要的复杂抽象。
