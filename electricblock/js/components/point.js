/**
 * Created by joshu on 2016/11/04.
 */
var point = function (_position, i) {

    this.position = _position;
    this.index = i;
    this.size = 20;

    this.dom = document.createElement("div");
    this.dom.setAttribute('index', i);
    this.dom.className = 'point';
    this.dom.style.width = this.size + 'px';
    this.dom.style.height = this.size + 'px';
    this.dom.style.left = this.position.x + 'px';
    this.dom.style.top = this.position.y + 'px';
    var that = this;
    this.dom.onclick = function () {
        that.onclick();
    };
    return this.dom;
};

point.prototype.onclick = function () {
    var obj = this.dom;
    if (window.hangUpPoint) {
        if (window.hangUpPoint == obj) {
            window.hangUpPoint.className = 'point';
            window.hangUpPoint = null;
        } else {
            obj.className = 'point active';
            window.hangUpPoint.className = 'point active';
            this.drawLine(window.hangUpPoint, obj);
            window.hangUpPoint = null;
        }
    } else {
        obj.className = 'point hang-up';
        window.hangUpPoint = obj;
    }
};

point.prototype.drawLine = function (s, e) {
    var x1 = s.style.left, x2 = e.style.left, y1 = s.style.top, y2 = e.style.top;
    this.dom.parentNode.appendChild(new line(x1, x2, y1, y2));
    console.log(s, e);
};

