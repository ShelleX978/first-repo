# ☕ Buy Me a Coffee - 创作者打赏页面

一个优雅、体面的创作者打赏页面，纯前端实现，开箱即用。

## ✨ 特性

- 🎨 **精致设计**：毛玻璃效果 + 动态渐变背景 + 流畅动画
- 📱 **移动优先**：完美适配 H5 移动端
- 💳 **多支付方式**：微信支付、支付宝、海外支持（BMC/PayPal/GitHub Sponsors）
- 💰 **灵活金额**：预设 6 档金额 + 自定义金额输入
- 💝 **暖心细节**：感谢弹窗、飘动爱心、触觉反馈
- 🚀 **零依赖**：纯 HTML/CSS/JS，无需任何框架
- ♿ **无障碍**：支持减少动画偏好设置

## 📁 项目结构

```
buy-me-a-coffee/
├── index.html     # 主页面
├── style.css      # 样式文件
└── script.js      # 交互逻辑
```

## 🚀 快速开始

### 1. 直接使用

将 `buy-me-a-coffee/` 目录上传到任何静态托管服务即可：

```bash
# GitHub Pages
git push origin main

# Vercel
vercel deploy ./buy-me-a-coffee

# Netlify
netlify deploy --dir=./buy-me-a-coffee
```

### 2. 本地预览

```bash
cd buy-me-a-coffee
python3 -m http.server 8080
# 访问 http://localhost:8080
```

### 3. 自定义配置

#### 修改创作者信息

编辑 `index.html` 中的 `.creator` 部分：

```html
<div class="creator-name">你的名字</div>
<p class="creator-desc">
    你的简介<br/>
    欢迎支持我 ☕
</p>
```

#### 替换收款码

将 `index.html` 中的二维码占位符替换为你的真实收款码图片（建议 300x300px PNG）：

```html
<img src="your-qrcode.png" alt="收款码" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;" />
```

#### 修改预设金额

编辑 `index.html` 中的 `.amount-grid` 部分，调整金额和 emoji：

```html
<button class="amount-btn" data-amount="20" data-label="🍵">
    <span class="amount-emoji">🍵</span>
    <span class="amount-value">¥20</span>
    <span class="amount-label">一杯奶茶</span>
</button>
```

#### 配置海外支付链接

编辑 `index.html` 中的 `.international-section` 部分，将 `href="#"` 替换为你的真实链接：

```html
<a class="intl-link bmc" href="https://www.buymeacoffee.com/yourname" target="_blank" rel="noopener">
```

## 🎨 设计亮点

### 金额设计哲学

| 金额 | 含义 | 心理暗示 |
|------|------|---------|
| ¥1 🌱 | 鼓励一下 | 低门槛，人人可参与 |
| ¥5 ☕ | 一杯咖啡 | 最常见的支持档位 |
| ¥10 🍰 | 一块蛋糕 | 主力推荐档位 |
| ¥30 🍜 | 一碗拉面 | 中等支持 |
| ¥66 🎁 | 礼物一份 | 大额支持 |
| ✨ 自定义 | 随心支持 | 满足个性化需求 |

### 文案设计原则

- ✅ **温暖亲切**：用"请我喝杯咖啡"代替"打赏"
- ✅ **平等对话**：不说"付费"，说"支持"
- ✅ **无压力**：明确告知"不影响任何功能使用"
- ❌ **拒绝道德绑架**：永远不弹窗强求

### 动画细节

- 卡片入场：弹性缓动，带缩放和上移
- 头像脉动：柔和发光呼吸效果
- 支付切换：平滑过渡，颜色渐变
- 感谢弹窗：心形跳动 + emoji 飘浮 + 震动反馈
- 背景气泡：缓慢漂浮，增加生命感

## 📱 浏览器支持

- iOS Safari 12+
- Android Chrome 80+
- 桌面 Chrome / Firefox / Safari / Edge 最新版

## 📄 许可证

基于 [MIT License](../LICENSE) 开源，版权归 ShelleX978 所有（2026）。
