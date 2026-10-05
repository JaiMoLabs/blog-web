## 📂 项目目录结构

```text
blog-web/
├── 📄 index.html                  # 首页
├── 📁 pages/                      # 其他页面
│   └── 📄 tps.html
│
├── 📁 images/
│   ├── 🖼️ avatar.png
│   └── 🖼️ background.png
│
├── 📁 js/
│   ├── 📁 core/                   # 公共核心 | 通用功能
│   │   ├── 📜 navbar.js           # 顶部导航
│   │   ├── 📜 hero.js             # 顶部背景
│   │   ├── 📜 contact.js          # 联系我们
│   │   ├── 📜 footer.js           # 底部
│   │   └── 📜 utils.js            # Toast、复制地址、通用事件等
│   │
│   ├── 📁 components/             # 可复用内容块 | 按需加载
│   │   ├── 📜 articles.js         # 右侧最新文章列表栏目
│   │   └── 📜 sidebar.js          # 左侧文章数据库导航栏目
│   │
│   ├── 📁 config/
│   │   ├── 📜 common.js           # 公共配置
│   │   └── 📁 pages/              # 页面专属配置 | 可选
│   │       ├── 📜 databar.js      # 左侧文章数据库导航配置
│   │       ├── 📜 home.js         # 主页面单独配置
│   │       └── 📜 tps.js
│   │
│   ├── 📁 database/               # 后端数据库
│   │   └── 📜 appscript.js        # Google Apps Script 后端连接存储
│   │
│   └── 📁 pages/                  # 页面入口
│       ├── 📜 home.js             # 对应 index.html
│       └── 📜 tps.js              # 对应 pages/tps.js
│
└── 📖 README.md