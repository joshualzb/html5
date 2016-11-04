/**
 * Created by joshu on 2016/11/04.
 */
var line = function (x1, x2, y1, y2) {

    this.dom = document.createElement('div');
    var dom1 = document.createElement('div');
    var dom2 = document.createElement('div');
    var dom3 = document.createElement('div');

    this.dom.className = 'line';
    dom1.className = "v";
    dom2.className = "h";
    dom3.className = "close";

    this.dom.appendChild(dom1);
    this.dom.appendChild(dom2);
    this.dom.appendChild(dom3);

    return this.dom;
};