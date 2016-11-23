define(function (require, exports, module) {

    var draw = function (options, i) {
        this.options = options;
        this.index = i;
        this.dom = document.createElement("div");
        this.dom.setAttribute('index', i);
        this.dom.className = 'point';
        this.dom.style.width = this.options.width + 'px';
        this.dom.style.height = this.options.height + 'px';
        this.dom.style.left = this.options.x + 'px';
        this.dom.style.top = this.options.y + 'px';
        this.dom.setAttribute('name', this.options.name);
        this.dom.setAttribute('title', this.options.name);
        return this.dom;
    };

    module.exports = draw;
});