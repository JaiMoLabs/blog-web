// ==========================================
// 钱包连接 (js/core/wallet.js)
// ==========================================

window.Blog = window.Blog || {};

Blog.wallet = {
    address: null,
    isConnecting: false
};

/**
 * 缩短地址：0x1234...abcd
 */
Blog.shortenAddress = function(address) {
    if (!address || address.length < 10) return address;
    return address.slice(0, 6) + '...' + address.slice(-4);
};

/**
 * 检查是否有浏览器钱包（MetaMask 等）
 */
Blog.hasEthereumProvider = function() {
    return typeof window.ethereum !== 'undefined' && window.ethereum;
};

/**
 * 更新导航栏「Connect Wallet」按钮文案
 */
Blog.updateWalletButton = function() {
    const btn = document.getElementById('connect-wallet-btn');
    if (!btn) return;

    if (Blog.wallet.address) {
        btn.innerText = Blog.shortenAddress(Blog.wallet.address);
        btn.classList.add('is-connected');
    } else {
        const text = (window.SITE_CONFIG && window.SITE_CONFIG.navbar.connectWalletBtnText)
            ? window.SITE_CONFIG.navbar.connectWalletBtnText
            : 'Connect Wallet';
        btn.innerText = text;
        btn.classList.remove('is-connected');
    }
};

/**
 * 连接钱包
 */
Blog.connectWallet = async function() {
    if (Blog.wallet.isConnecting) return;

    if (!Blog.hasEthereumProvider()) {
        Blog.showToast('未检测到钱包，请先安装 MetaMask');
        return;
    }

    try {
        Blog.wallet.isConnecting = true;
        Blog.showToast('正在连接钱包...');

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (accounts && accounts.length > 0) {
            Blog.wallet.address = accounts[0];
            Blog.updateWalletButton();
            Blog.showToast('钱包已连接');
        } else {
            Blog.showToast('未获取到钱包地址');
        }
    } catch (error) {
        console.error('connectWallet error:', error);

        // 用户拒绝授权
        if (error && (error.code === 4001 || error.code === 'ACTION_REJECTED')) {
            Blog.showToast('你取消了钱包连接');
        } else {
            Blog.showToast('连接失败，请重试');
        }
    } finally {
        Blog.wallet.isConnecting = false;
    }
};

/**
 * 页面加载时，尝试读取已连接账户（不会弹窗）
 */
Blog.tryRestoreWallet = async function() {
    if (!Blog.hasEthereumProvider()) return;

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });

        if (accounts && accounts.length > 0) {
            Blog.wallet.address = accounts[0];
            Blog.updateWalletButton();
        }
    } catch (error) {
        console.error('tryRestoreWallet error:', error);
    }
};

/**
 * 监听账户切换 / 断开
 */
Blog.bindWalletEvents = function() {
    if (!Blog.hasEthereumProvider()) return;

    // 切换账户
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts && accounts.length > 0) {
            Blog.wallet.address = accounts[0];
            Blog.updateWalletButton();
            Blog.showToast('账户已切换');
        } else {
            Blog.wallet.address = null;
            Blog.updateWalletButton();
            Blog.showToast('钱包已断开');
        }
    });
};

/**
 * 点击连接按钮时的统一处理
 * - 未连接：发起连接
 * - 已连接：复制当前地址
 */
Blog.handleWalletButtonClick = async function() {
    if (Blog.wallet.address) {
        try {
            await navigator.clipboard.writeText(Blog.wallet.address);
            Blog.showToast('地址已复制');
        } catch (e) {
            Blog.showToast('复制失败，请手动复制');
        }
        return;
    }

    await Blog.connectWallet();
};