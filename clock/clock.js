var dom = document.createElement('canvas');
var w = (window.innerWidth + window.innerHeight) / 5;
dom.width = w;
dom.height = w;
dom.style.border = 'solid 1px #EEE';
dom.style.position = 'absolute';
dom.style.left = ((window.innerWidth - dom.width) / 2 ) + 'px';
dom.style.top = (window.innerHeight - dom.height) / 2 + 'px';
document.body.innerHTML = '';
document.body.appendChild(dom);

var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
var pi = Math.PI;
var rem = width / 200;

function drawBackground() {
    ctx.save();

    ctx.font = (rem * 18) + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    //线条的宽度
    ctx.lineWidth = rem * 10;
    //translate() 方法重新映射画布上的 (0,0) 位置。
    ctx.translate(r, r);
    //beginPath() 方法开始一条路径，或重置当前的路径。
    ctx.beginPath();
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    // 参数	描述
    // x	圆的中心的 x 坐标。
    // y	圆的中心的 y 坐标。
    // r	圆的半径。
    // sAngle	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
    // eAngle	结束角，以弧度计。
    // counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
    // r - 5 减去边框的偏移量
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * pi, false);
    //stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。
    ctx.stroke();

    //循环数字
    hourNumbers.forEach(function (number, i) {
        //弧度（每个小时的弧度）
        //每个小时的弧度是 2*Math.PI /12
        var rad = 2 * pi / 12 * i;

        //x，y坐标
        var x = Math.cos(rad) * (r - 30 * rem), y = Math.sin(rad) * (r - 30 * rem);

        //绘制文本
        ctx.fillText(number, x, y);
    });

    //循环点
    for (var i = 0; i < 60; i++) {
        var rad = 2 * pi / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem), y = Math.sin(rad) * (r - 18 * rem);
        ctx.beginPath();//重置圆心

        if (i % 5 === 0) {
            ctx.fillStyle = '#000';
            ctx.arc(x, y, 1.8 * rem, 0, 2 * pi, false);
        } else {
            ctx.fillStyle = '#ccc';
            ctx.arc(x, y, 1.5 * rem, 0, 2 * pi, false);
        }

        ctx.fill();
    }
}

function drawHour(hour, minute) {
    ctx.save();
    ctx.beginPath();
    //旋转画布
    var hrad = 2 * pi / 12 * hour;
    var mrad = 2 * pi / 12 / 60 * minute;
    ctx.rotate(hrad + mrad);
    ctx.lineWidth = 6 * rem;
    ctx.lineCap = 'round';
    //转移中心点,设置10个偏移量
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}

function drawMinute(minute) {
    ctx.save();
    ctx.beginPath();
    //旋转画布
    ctx.rotate(2 * pi / 60 * minute);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = 'round';
    //转移中心点,设置10个偏移量
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r + 42 * rem);
    ctx.stroke();
    ctx.restore();
}

function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    //旋转画布
    ctx.rotate(2 * pi / 60 * second);
    ctx.lineWidth = 2 * rem;
    ctx.lineCap = 'round';
    ctx.fillStyle = '#c14543';
    ctx.moveTo(-2 * rem, 20 * rem);
    ctx.lineTo(2 * rem, 20 * rem);
    ctx.lineTo(rem, -r + 32 * rem);
    ctx.lineTo(-1 * rem, -r + 32 * rem);
    ctx.fill();
    ctx.restore();
}

function drawCenterPoint() {
    ctx.beginPath();
    ctx.fillStyle = '#FFF';
    ctx.arc(0, 0, 3 * rem, 0, 2 * pi, false);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawCenterPoint();
    ctx.restore();
}

function bindMouseEvent() {

    dom.onmousedown = function (e) {
        console.log(convertPoint(e.x, e.y));
        e.preventDefault();
    };

    dom.onmouseup = function (e) {
        e.preventDefault();
    };

    dom.onmouseout = function (e) {
        e.preventDefault();
    };

    dom.onmousemove = function (e) {
        e.preventDefault();
    };
}

function convertPoint(x, y) {
    var rect = dom.getBoundingClientRect();
    return {x: x - rect.left, y: y - rect.top};
}

draw();
bindMouseEvent();
setInterval(draw, 1000);