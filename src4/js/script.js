/**
 * PbootCMS 后台登录页 - src4 主题脚本
 * 几何粒子背景 + 问候语 + 交互增强
 */

(function () {
    'use strict';

    /* ========== Canvas 几何粒子背景 ========== */
    var canvas = document.getElementById('bgCanvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var particleCount = 50;
        var w, h;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // 初始化粒子
        for (var i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        // 连线阈值
        var linkDist = 140;

        function draw() {
            ctx.clearRect(0, 0, w, h);

            // 画粒子
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];

                // 移动
                p.x += p.vx;
                p.y += p.vy;

                // 边界回弹
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                // 绘制
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(6, 182, 212, ' + p.opacity + ')';
                ctx.fill();
            }

            // 画连线
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < linkDist) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(99, 102, 241, ' + (1 - dist / linkDist) * 0.12 + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(draw);
        }

        draw();
    }

    /* ========== 问候语 ========== */
    function updateGreeting() {
        var el = document.getElementById('greeting');
        if (!el) return;

        var hour = new Date().getHours();
        var str = '';
        if (hour < 5) {
            str = '🌙 夜深了，请注意休息';
        } else if (hour < 9) {
            str = '☀️ 早上好！新的一天开始了';
        } else if (hour < 12) {
            str = '💼 上午好，祝工作顺利';
        } else if (hour < 14) {
            str = '☕ 中午好，记得休息一下';
        } else if (hour < 17) {
            str = '🚀 下午好，继续加油';
        } else if (hour < 20) {
            str = '🌆 傍晚好，今天辛苦了';
        } else {
            str = '✨ 晚上好，放松一下吧';
        }

        el.textContent = str;
    }

    updateGreeting();

    /* ========== 输入框交互 ========== */
    var fields = document.querySelectorAll('.field input');
    fields.forEach(function (input) {
        // placeholder 上移效果
        var fieldLine = input.parentElement.querySelector('.field-line');
        if (!fieldLine) return;

        input.addEventListener('focus', function () {
            fieldLine.style.width = 'calc(100% - 8px)';
            fieldLine.style.left = '4px';
        });

        input.addEventListener('blur', function () {
            if (!input.value) {
                fieldLine.style.width = '0';
                fieldLine.style.left = '50%';
            }
        });
    });

})();
