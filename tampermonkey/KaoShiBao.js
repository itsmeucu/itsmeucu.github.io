// ==UserScript==
// @name         考试宝答案解析自动展开
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  自动显示考试宝练习模式的完整答案解析，去除所有干扰元素，阻止数据上报
// @author       陈小可
// @match        https://www.zaixiankaoshi.com/online/*
// @grant        unsafeWindow
// @run-at       document-start
// @icon         https://resource-cdn.kaoshibao.com/pc/favicon.ico?1
// @updateURL    https://blog.ucu520.top/tampermonkey/KaoShiBao.js
// @downloadURL  https://blog.ucu520.top/tampermonkey/KaoShiBao.js
// @supportURL   https://blog.ucu520.top/
// @homepageURL  https://blog.ucu520.top/
// ==/UserScript==

(function() {
    'use strict';

    // ==================== 拦截网络请求 ====================

    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        this._url = url;
        this._method = method;

        if (typeof url === 'string') {
            const blockedDomains = [
                'dev-httplog.kaoshibao.com',
                'httplog.kaoshibao.com',
                'log.kaoshibao.com',
                'analytics',
                'tracking',
                'collect',
                'report'
            ];

            for (let domain of blockedDomains) {
                if (url.includes(domain)) {
                    console.log('已拦截XHR请求:', url);
                    this._blocked = true;
                    return;
                }
            }
        }

        return originalXHROpen.apply(this, [method, url, ...args]);
    };

    XMLHttpRequest.prototype.send = function(body) {
        if (this._blocked) {
            console.log('已阻止发送数据到:', this._url);
            return;
        }
        return originalXHRSend.apply(this, [body]);
    };

    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (typeof url === 'string') {
            const blockedDomains = [
                'dev-httplog.kaoshibao.com',
                'httplog.kaoshibao.com',
                'log.kaoshibao.com',
                'analytics',
                'tracking',
                'collect',
                'report'
            ];

            for (let domain of blockedDomains) {
                if (url.includes(domain)) {
                    console.log('已拦截Fetch请求:', url);
                    return Promise.resolve(new Response('', { status: 200, statusText: 'OK' }));
                }
            }
        }

        return originalFetch.apply(this, [url, options]);
    };

    const originalSendBeacon = Navigator.prototype.sendBeacon;
    Navigator.prototype.sendBeacon = function(url, data) {
        if (typeof url === 'string') {
            const blockedDomains = [
                'dev-httplog.kaoshibao.com',
                'httplog.kaoshibao.com',
                'log.kaoshibao.com',
                'analytics',
                'tracking'
            ];

            for (let domain of blockedDomains) {
                if (url.includes(domain)) {
                    console.log('已拦截Beacon请求:', url);
                    return true;
                }
            }
        }

        return originalSendBeacon.apply(this, [url, data]);
    };

    const originalImageSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
        set: function(value) {
            if (typeof value === 'string') {
                const blockedDomains = [
                    'dev-httplog.kaoshibao.com',
                    'httplog.kaoshibao.com',
                    'log.kaoshibao.com',
                    'analytics',
                    'tracking',
                    'collect'
                ];

                for (let domain of blockedDomains) {
                    if (value.includes(domain)) {
                        console.log('已拦截Image请求:', value);
                        return;
                    }
                }
            }
            originalImageSrc.set.call(this, value);
        },
        get: function() {
            return originalImageSrc.get.call(this);
        }
    });

    // ==================== 允许自由复制 ====================

    function enableCopy() {
        // 方法1：通过XPath解锁题目区域
        const xpath = '//*[@id="body"]/div[2]/div[1]/div[2]/div[1]/div/div[1]/div/div[1]/div';
        const xpathResult = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const questionElement = xpathResult.singleNodeValue;

        if (questionElement) {
            questionElement.style.userSelect = 'text';
            questionElement.style.webkitUserSelect = 'text';
            questionElement.style.MozUserSelect = 'text';
            questionElement.style.msUserSelect = 'text';
            questionElement.style.pointerEvents = 'auto';
            questionElement.oncopy = null;
            questionElement.oncut = null;
            questionElement.onselectstart = null;
            questionElement.oncontextmenu = null;
            console.log('✅ 题目区域已解锁复制');
        }

        // 方法2：全局解锁（确保整个页面都可以复制）
        document.body.style.userSelect = 'text';
        document.body.style.webkitUserSelect = 'text';
        document.body.style.MozUserSelect = 'text';
        document.body.style.msUserSelect = 'text';
        document.body.oncopy = null;
        document.body.oncut = null;
        document.body.onselectstart = null;
        document.body.oncontextmenu = null;

        // 方法3：解除所有元素的限制
        document.querySelectorAll('*').forEach(el => {
            el.style.userSelect = 'text';
            el.style.webkitUserSelect = 'text';
            el.style.MozUserSelect = 'text';
            el.style.msUserSelect = 'text';
            el.oncopy = null;
            el.oncut = null;
            el.onselectstart = null;
            el.oncontextmenu = null;
        });

        // 方法4：解除事件监听器
        const events = ['copy', 'cut', 'contextmenu', 'selectstart', 'dragstart'];
        events.forEach(event => {
            document.addEventListener(event, function(e) {
                e.stopPropagation();
            }, true);
        });
    }

    // ==================== 页面处理 ====================

    function processPage() {
        // 1. 展开答案解析
        document.querySelectorAll('.analysis-mask').forEach(el => el.remove());
        document.querySelectorAll('.answer-analysis-row.hide-height').forEach(el => {
            el.classList.remove('hide-height');
            el.style.maxHeight = 'none';
            el.style.overflow = 'visible';
        });
        document.querySelectorAll('.check-all-btn-row').forEach(el => el.remove());

        // 2. 隐藏深度解题
        document.querySelectorAll('.deepseek-row').forEach(el => el.remove());

        // 3. 隐藏 VIP 权益
        document.querySelectorAll('.vip-quanyi').forEach(el => el.remove());

        // 4. 隐藏试用次数、难度、来源
        document.querySelectorAll('.point-row').forEach(el => el.remove());
        document.querySelectorAll('.answer-box-detail > div[style*="color: rgb(153, 153, 153)"]').forEach(el => el.remove());

        // 5. 通过文本内容匹配
        document.querySelectorAll('.answer-box-detail > div').forEach(div => {
            const text = div.textContent || '';
            if (text.includes('可试用次数') || text.includes('剩余') || text.includes('难') || text.includes('来源')) {
                if (div.classList.contains('point-row') || text.includes('次')) {
                    div.style.display = 'none';
                }
            }
        });

        // 6. 删除页脚
        const footer = document.querySelector('.new-footer');
        if (footer) footer.remove();

        // 7. 调整父容器
        document.querySelectorAll('section').forEach(s => {
            s.style.paddingBottom = '0px';
            s.style.marginBottom = '0px';
        });

        // 8. 允许复制
        enableCopy();
    }

    // 注入CSS
    const style = document.createElement('style');
    style.textContent = `
        .analysis-mask,
        .check-all-btn-row,
        .deepseek-row,
        .point-row,
        .vip-quanyi,
        footer.new-footer,
        .new-footer,
        .answer-box-detail > div[style*="color: rgb(153, 153, 153)"] {
            display: none !important;
        }
        .answer-analysis-row.hide-height {
            max-height: none !important;
            overflow: visible !important;
        }

        /* 允许自由复制 */
        * {
            user-select: text !important;
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
        }
    `;

    if (document.head) {
        document.head.appendChild(style);
    } else {
        document.documentElement.appendChild(style);
    }

    // 监听DOM变化
    const observer = new MutationObserver(() => processPage());

    window.addEventListener('DOMContentLoaded', () => {
        processPage();
        observer.observe(document.body, {
            childList: true, subtree: true, attributes: true
        });
    });

    // 页面加载后执行
    window.addEventListener('load', () => setTimeout(processPage, 500));
    if (document.readyState === 'complete') processPage();

    console.log('✅ 考试宝助手已启用：答案展开 + 数据拦截 + 自由复制');
})();
