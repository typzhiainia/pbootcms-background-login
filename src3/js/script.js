/**
 * PbootCMS 后台登录页 - src3 主题脚本
 */

(function () {
    'use strict';

    // 预加载动画
    window.addEventListener('load', function () {
        var preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(function () {
                preloader.classList.add('fade-out');
                // 移除 DOM 元素，防止遮挡
                setTimeout(function () {
                    if (preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                }, 500);
            }, 400);
        }
    });

    // 时间段问候语
    function updateGreeting() {
        var hour = new Date().getHours();
        var greetingEl = document.getElementById('greeting');
        if (!greetingEl) return;

        var str = '';
        if (hour < 5) {
            str = '夜深了，早点休息 🌙';
        } else if (hour < 9) {
            str = '早上好！新的一天 ☀️';
        } else if (hour < 12) {
            str = '上午好，工作顺利 📋';
        } else if (hour < 14) {
            str = '中午好，别忘了吃饭 🍜';
        } else if (hour < 17) {
            str = '下午好，加油 💪';
        } else if (hour < 20) {
            str = '傍晚好，辛苦了 🌆';
        } else {
            str = '晚上好，注意休息 🌃';
        }

        greetingEl.textContent = str;
    }

    // 页面加载时更新问候语
    updateGreeting();

    // 输入框聚焦时高亮对应图标
    var inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(function (input) {
        input.addEventListener('focus', function () {
            var icon = this.parentElement.querySelector('.input-icon');
            if (icon) {
                icon.style.color = '#667eea';
            }
        });
        input.addEventListener('blur', function () {
            var icon = this.parentElement.querySelector('.input-icon');
            if (icon) {
                icon.style.color = '';
            }
        });
    });

})();
