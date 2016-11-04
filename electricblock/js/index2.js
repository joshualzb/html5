/**
 * Created by joshu on 2016/11/04.
 */
var circuit = function () {
    this.palette = $('#palette');
    this.rects = [
        {x: 10, y: 10}, {x: 120, y: 120}
    ];
    this.points = [];
    var that = this;
    this.rects.forEach(function (rect, i) {
        that.points.push(new point(rect, i));
    });
};

circuit.prototype.init = function () {
    this.drawPoints();
    window.hangUpPoint = null;
};

circuit.prototype.drawPoints = function () {
    var that = this;
    that.points.forEach(function (p) {
        that.palette.append(p);
    });
};

new circuit().init();