// ==========================================
// 钱包连接 (js/core/wallet.js)
// ==========================================

window.Blog = window.Blog || {};

Blog.wallet = {
    address: null,
    ensName: null,
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
 * 检查是否有浏览器钱包
 */
Blog.hasEthereumProvider = function() {
    return typeof window.ethereum !== 'undefined' && window.ethereum;
};

/**
 * 更新导航栏按钮文案
 * 优先显示 ENS，没有则显示短地址
 */
Blog.updateWalletButton = function() {
    const btn = document.getElementById('connect-wallet-btn');
    if (!btn) return;

    if (Blog.wallet.address) {
        const display = Blog.wallet.ensName
            ? Blog.wallet.ensName
            : Blog.shortenAddress(Blog.wallet.address);

        btn.innerText = display;
        btn.title = Blog.wallet.address; // 鼠标悬停看完整地址
        btn.classList.add('is-connected');
    } else {
        const text = (window.SITE_CONFIG && window.SITE_CONFIG.navbar.connectWalletBtnText)
            ? window.SITE_CONFIG.navbar.connectWalletBtnText
            : 'Connect Wallet';
        btn.innerText = text;
        btn.title = '';
        btn.classList.remove('is-connected');
    }
};

/**
 * 反向解析 ENS：地址 -> 域名
 * 成功返回 "xxx.eth"，失败/没有返回 null
 */
Blog.resolveEnsName = async function(address) {
    if (!address) return null;

    // 没加载到 ethers 就跳过
    if (typeof ethers === 'undefined') {
        console.warn('ethers.js 未加载，跳过 ENS 解析');
        return null;
    }

    try {
        // 优先用钱包自己的 provider（更贴近用户当前网络）
        // 若失败，再退回公共 RPC
        let provider;

        if (Blog.hasEthereumProvider()) {
            provider = new ethers.BrowserProvider(window.ethereum);
        } else {
            provider = ethers.getDefaultProvider('mainnet');
        }

        const name = await provider.lookupAddress(address);

        // lookupAddress 可能返回 null
        if (!name) return null;

        // 再正向验证一次，避免假解析
        const resolved = await provider.resolveName(name);
        if (resolved && resolved.toLowerCase() === address.toLowerCase()) {
            return name;
        }

        return null;
    } catch (error) {
        console.warn('ENS resolve failed:', error);
        return null;
    }
};

/**
 * 设置当前钱包地址，并尝试解析 ENS
 */
Blog.setWalletAccount = async function(address) {
    Blog.wallet.address = address || null;
    Blog.wallet.ensName = null;

    // 先立刻显示短地址，避免等待 ENS 时按钮空白
    Blog.updateWalletButton();

    if (!address) return;

    const ensName = await Blog.resolveEnsName(address);
    // 防止解析完成时用户已经切换/断开账户
    if (Blog.wallet.address && Blog.wallet.address.toLowerCase() === address.toLowerCase()) {
        Blog.wallet.ensName = ensName;
        Blog.updateWalletButton();
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
            await Blog.setWalletAccount(accounts[0]);
            if (Blog.wallet.ensName) {
                Blog.showToast('已连接：' + Blog.wallet.ensName);
            } else {
                Blog.showToast('钱包已连接');
            }
        } else {
            Blog.showToast('未获取到钱包地址');
        }
    } catch (error) {
        console.error('connectWallet error:', error);

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
 * 页面加载时恢复已连接账户（不弹窗）
 */
Blog.tryRestoreWallet = async function() {
    if (!Blog.hasEthereumProvider()) return;

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });

        if (accounts && accounts.length > 0) {
            await Blog.setWalletAccount(accounts[0]);
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

    window.ethereum.on('accountsChanged', async (accounts) => {
        if (accounts && accounts.length > 0) {
            await Blog.setWalletAccount(accounts[0]);
            Blog.showToast(Blog.wallet.ensName ? ('已切换到 ' + Blog.wallet.ensName) : '账户已切换');
        } else {
            await Blog.setWalletAccount(null);
            Blog.showToast('钱包已断开');
        }
    });
};

/**
 * 点击按钮：
 * - 未连接：连接
 * - 已连接：复制地址
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