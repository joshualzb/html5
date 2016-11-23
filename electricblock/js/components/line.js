define(function (require, exports, module) {

    var draw = function (s, e) {

        console.log(s.style);

        var width = 8;

        var r = this.toN(s.offsetWidth - width) / 2;

        var x1 = this.toN(s.style.left), x2 = this.toN(e.style.left), y1 = this.toN(s.style.top), y2 = this.toN(e.style.top);

        this.line = document.createElement('div');

        this.dom1 = document.createElement('div');
        this.dom2 = document.createElement('div');
        this.dom3 = document.createElement('div');

        this.line.className = 'line';

        this.dom1.className = "h";
        this.dom2.className = "v";
        this.dom3.className = "close";

        this.line.setAttribute('name', s.getAttribute('name') + '&' + e.getAttribute('name'));

        this.dom1.style.top = (y1 + r) + 'px';
        this.dom1.style.width = Math.abs(x2 - x1) + 'px';
        this.dom1.style.height = width + 'px';

        this.dom2.style.left = x2 + r + 'px';
        this.dom2.style.width = width + 'px';
        this.dom2.style.height = Math.abs(y2 - y1) + 'px';

        this.dom3.style.top = y1 + 'px';
        this.dom3.style.left = x2 + 'px';

        if (y1 < y2) {
            this.dom2.style.top = y1 + r + 'px';
        } else if (y1 > y2) {
            this.dom2.style.top = y2 + r + 'px';
        } else {
            this.dom3.style.top = (y1  ) + 'px';
            this.dom3.style.left = (x1 + (x2 - x1) / 2) + 'px';
        }

        if (x1 < x2) {
            this.dom1.style.left = (x1 + r) + 'px';
        } else if (x1 > x2) {
            this.dom1.style.left = (x2 + r) + 'px';
        } else {
            this.dom3.style.top = (y1 + (y2 - y1) / 2) + 'px';
            this.dom3.style.left = x1 + 'px';
        }

        this.dom3.addEventListener('click', function () {
            this.parentNode.remove();
            s.className = 'point';
            e.className = 'point';
        });

        this.line.appendChild(this.dom1);
        this.line.appendChild(this.dom2);
        this.line.appendChild(this.dom3);

        return this.line;
    };

    draw.prototype.toN = function (str) {
        if (str && str.length > 0) {
            var reg = /\d+/;
            var num = str.match(reg)[0];
            return parseFloat(num);
        }
        return str;
    };

    module.exports = draw;
});