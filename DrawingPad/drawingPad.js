var DrawingPad = /** @class */ (function () {
    function DrawingPad() {
        this.canvasElem = null;
        this.canvasContext = null;
        this.drawing = false;
        this.lastX = 0.0;
        this.lastY = 0.0;
        this.hue = 0;
        this.increaseWidth = true;
    }
    DrawingPad.prototype.draw = function (ev) {
        var _a;
        if (!this.drawing)
            return;
        this.canvasContext.strokeStyle = "hsl(" + this.hue + ", 100%, 50%)";
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.lastX, this.lastY);
        this.canvasContext.lineTo(ev.offsetX, ev.offsetY);
        this.canvasContext.stroke();
        _a = [ev.offsetX, ev.offsetY], this.lastX = _a[0], this.lastY = _a[1];
        this.hue = (this.hue + 1) % 360;
        if (this.canvasContext.lineWidth > 100 || this.canvasContext.lineWidth <= 1) {
            this.increaseWidth = !this.increaseWidth;
        }
        if (this.increaseWidth) {
            this.canvasContext.lineWidth += 1;
        }
        else {
            this.canvasContext.lineWidth -= 1;
        }
    };
    DrawingPad.prototype.handleEvent = function (evt) {
        var _this = this;
        this.canvasElem = document.querySelector("#pad");
        this.canvasElem.width = window.innerWidth;
        this.canvasElem.height = window.innerHeight;
        this.canvasContext = this.canvasElem.getContext("2d");
        this.canvasContext.strokeStyle = '#BADA55';
        this.canvasContext.lineJoin = 'bevel';
        this.canvasContext.lineCap = 'round';
        this.canvasContext.lineWidth = 50;
        this.canvasContext.lineJoin;
        this.canvasElem.addEventListener("mousemove", function (ev) {
            _this.draw(ev);
        });
        this.canvasElem.addEventListener("mousedown", function (ev) {
            var _a;
            _a = [ev.offsetX, ev.offsetY], _this.lastX = _a[0], _this.lastY = _a[1];
            _this.drawing = true;
        });
        this.canvasElem.addEventListener("mouseup", function () {
            _this.drawing = false;
        });
        this.canvasElem.addEventListener("mouseout", function () {
            _this.drawing = false;
        });
    };
    return DrawingPad;
}());
document.addEventListener("DOMContentLoaded", new DrawingPad());
