(function () {
    'use strict';

    const state = {
        selectedAmount: 10,
        selectedLabel: '🍰',
        paymentMethod: 'wechat'
    };

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const amountGrid = $('#amountGrid');
    const customInputWrap = $('#customInputWrap');
    const customAmountInput = $('#customAmount');
    const paymentTabs = $$('.payment-tab');
    const qrSection = $('#qrSection');
    const internationalSection = $('#internationalSection');
    const wechatHint = $('.qr-hint');
    const copyBtn = $('#copyBtn');
    const saveBtn = $('#saveBtn');
    const thankYouOverlay = $('#thankYouOverlay');
    const closeBtn = $('#closeBtn');
    const floatingEmojis = $('#floatingEmojis');

    const paymentHints = {
        wechat: '截图保存二维码<br/>用微信扫描付款',
        alipay: '截图保存二维码<br/>用支付宝扫描付款'
    };

    function selectAmount(btn) {
        $$('.amount-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const amount = btn.dataset.amount;
        state.selectedLabel = btn.dataset.label;

        if (amount === 'custom') {
            customInputWrap.style.display = 'flex';
            customAmountInput.focus();
            state.selectedAmount = null;
        } else {
            customInputWrap.style.display = 'none';
            state.selectedAmount = parseFloat(amount);
            triggerThankYou();
        }
    }

    amountGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.amount-btn');
        if (btn) selectAmount(btn);
    });

    customAmountInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (val > 0) {
            state.selectedAmount = val;
        }
    });

    customAmountInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && state.selectedAmount && state.selectedAmount > 0) {
            triggerThankYou();
        }
    });

    function switchPaymentMethod(tab) {
        paymentTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const method = tab.dataset.method;
        state.paymentMethod = method;

        if (method === 'international') {
            qrSection.style.display = 'none';
            internationalSection.style.display = 'flex';
        } else {
            qrSection.style.display = 'flex';
            internationalSection.style.display = 'none';
            wechatHint.innerHTML = paymentHints[method];
        }
    }

    paymentTabs.forEach(tab => {
        tab.addEventListener('click', () => switchPaymentMethod(tab));
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            z-index: 9999;
            animation: toastIn 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 1500);
    }

    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
        @keyframes toastIn {
            from { opacity: 0; transform: translate(-50%, -40%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }
    `;
    document.head.appendChild(toastStyle);

    copyBtn.addEventListener('click', () => {
        const method = state.paymentMethod;
        const amount = state.selectedAmount || 10;
        const label = state.selectedLabel;
        const text = `${label} 支持你 ¥${amount}，感谢你的创作！`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('已复制感谢语到剪贴板');
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    });

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showToast('已复制感谢语到剪贴板');
        } catch {
            showToast('复制失败，请手动复制');
        }
        document.body.removeChild(ta);
    }

    saveBtn.addEventListener('click', () => {
        showToast('长按二维码即可保存到相册');
    });

    function triggerThankYou() {
        thankYouOverlay.classList.add('show');
        spawnFloatingEmojis();
        playHeartHaptic();
    }

    closeBtn.addEventListener('click', () => {
        thankYouOverlay.classList.remove('show');
    });

    thankYouOverlay.addEventListener('click', (e) => {
        if (e.target === thankYouOverlay) {
            thankYouOverlay.classList.remove('show');
        }
    });

    function spawnFloatingEmojis() {
        const emojis = ['❤️', '💖', '💕', '✨', '🌟', '☕', '🎉', '🎊', '💝'];
        const container = floatingEmojis;
        const rect = container.getBoundingClientRect();

        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const span = document.createElement('span');
                span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                const x = Math.random() * (rect.width - 40) + 20;
                const y = rect.height - 30;
                span.style.left = x + 'px';
                span.style.top = y + 'px';
                span.style.fontSize = (18 + Math.random() * 16) + 'px';
                container.appendChild(span);

                setTimeout(() => span.remove(), 3000);
            }, i * 80);
        }
    }

    function playHeartHaptic() {
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && thankYouOverlay.classList.contains('show')) {
            thankYouOverlay.classList.remove('show');
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .qr-pattern:hover { cursor: pointer; }
    `;
    document.head.appendChild(style);

})();
