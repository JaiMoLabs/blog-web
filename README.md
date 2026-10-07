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
├── 📄 index.html                 # Home page
├── 📁 pages/                     # Other pages
│   └── 📄 tps.html               # TPS page
│
├── 📁 images/                    # Static images
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

## ⚙️ Configuration Map

The project separates configuration from page logic and reusable components.
If you modify a configuration item, use the table below to identify the related files that may also need to be updated.

| Configuration | Config File                  | Related Files                                                               | Purpose                                                                 |
| ------------- | ---------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `meta`        | `js/config/common.js`        | `js/core/utils.js`, `js/core/hero.js`                                       | Site title, logo, background image, site name, and home link            |
| `api`         | `js/config/common.js`        | `js/database/appscript.js`                                                  | External API and Google Apps Script configuration                       |
| `navbar`      | `js/config/common.js`        | `js/core/navbar.js`                                                         | Navigation buttons, slogan, and Topics menu                             |
| `wallet`      | `js/config/common.js`        | `js/core/wallet.js`                                                         | Wallet connection, account state, and wallet-related messages           |
| `support`     | `js/config/common.js`        | `js/core/support.js`                                                        | ETH support address, amount, network settings, and transaction messages |
| `contact`     | `js/config/common.js`        | `js/core/contact.js`, `js/database/appscript.js`                            | Contact section content and email subscription settings                 |
| `footer`      | `js/config/common.js`        | `js/core/footer.js`                                                         | Footer text, columns, and links                                         |
| `socialLinks` | `js/config/common.js`        | `js/core/contact.js`                                                        | Social and identity links such as ENS, X, Bluesky, and GitHub           |
| `database`    | `js/config/pages/databar.js` | `js/components/sidebar.js`, `js/components/articles.js`, `js/pages/home.js` | Article categories, article metadata, and database navigation           |
| `home`        | `js/config/pages/home.js`    | `js/pages/home.js`                                                          | Home-page-specific display settings                                     |
| `tps`         | `js/config/pages/tps.js`     | `js/pages/tps.js`                                                           | TPS-page-specific configuration                                         |

### Configuration Principles

* **Configuration files** define content, parameters, links, and display settings.
* **Core modules** implement shared functionality and behavior.
* **Components** render reusable content structures.
* **Page entry points** assemble configuration and modules into complete pages.
* When changing a configuration item, check the corresponding **Related Files** in the table above before modifying the configuration structure itself.

---

# 中文

## 📂 项目结构

```text
jaimo-blogs/
├── 📄 index.html                 # 首页
├── 📁 pages/                     # 其他页面
│   └── 📄 tps.html               # TPS 页面
│
├── 📁 images/                    # 静态图片
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

## ⚙️ 配置地图

本项目将配置与页面逻辑、可复用组件分离。如果需要修改某项配置，可以先通过下面的表格确认对应的配置文件，以及可能需要同步调整的关联文件。

| 配置模块          | 配置文件                         | 关联文件                                                                      | 作用                             |
| ------------- | ---------------------------- | ------------------------------------------------------------------------- | ------------------------------ |
| `meta`        | `js/config/common.js`        | `js/core/utils.js`、`js/core/hero.js`                                      | 网站标题、Logo、背景图片、站点名称和首页链接       |
| `api`         | `js/config/common.js`        | `js/database/appscript.js`                                                | 外部 API 和 Google Apps Script 配置 |
| `navbar`      | `js/config/common.js`        | `js/core/navbar.js`                                                       | 顶部导航按钮、Slogan 和 Topics 菜单      |
| `wallet`      | `js/config/common.js`        | `js/core/wallet.js`                                                       | 钱包连接、账户状态及钱包相关提示信息             |
| `support`     | `js/config/common.js`        | `js/core/support.js`                                                      | ETH 赞助地址、赞助金额、网络参数及交易提示信息      |
| `contact`     | `js/config/common.js`        | `js/core/contact.js`、`js/database/appscript.js`                           | 联系区域内容及邮箱订阅配置                  |
| `footer`      | `js/config/common.js`        | `js/core/footer.js`                                                       | 页脚文字、栏目和链接                     |
| `socialLinks` | `js/config/common.js`        | `js/core/contact.js`                                                      | ENS、X、Bluesky、GitHub 等社交与身份链接  |
| `database`    | `js/config/pages/databar.js` | `js/components/sidebar.js`、`js/components/articles.js`、`js/pages/home.js` | 文章分类、文章信息及数据库导航                |
| `home`        | `js/config/pages/home.js`    | `js/pages/home.js`                                                        | 首页专属展示配置                       |
| `tps`         | `js/config/pages/tps.js`     | `js/pages/tps.js`                                                         | TPS 页面专属配置                     |

### 配置原则

* **配置文件**负责定义内容、参数、链接和展示设置。
* **核心模块**负责实现通用功能和具体行为。
* **组件模块**负责渲染可复用的内容结构。
* **页面入口**负责将配置和各个模块组合成完整页面。
* 修改某项配置时，建议先查看上表中的**关联文件**，确认是否需要同步调整相关逻辑。
