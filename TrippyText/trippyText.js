var TrippyText = /** @class */ (function () {
    function TrippyText() {
        this.textContainer = null;
        this.mainText = null;
        this.drift = 15; // px
    }
    TrippyText.prototype.driftTextShadow = function (mouseEv) {
        // Use object decomposition sytatic sugar to marshal out some values
        var _a = this.textContainer, baseWidth = _a.offsetWidth, baseHeight = _a.offsetHeight;
        var mouseX = mouseEv.offsetX, mouseY = mouseEv.offsetY;
        if (mouseEv.target == this.mainText) {
            this.mainText.style.textShadow = "";
        }
        else {
            var xDrift = Math.round((mouseX / baseWidth * this.drift) - (this.drift / 2));
            var yDrift = Math.round((mouseY / baseHeight * this.drift) - (this.drift / 2));
            this.mainText.style.textShadow = "\n                " + xDrift + "px " + yDrift + "px 0 rgba(255, 0, 255, 0.7),\n                " + -xDrift + "px " + yDrift + "px 0 rgba(0, 255, 255, 0.7),\n                " + xDrift + "px " + -yDrift + "px 0 rgba(0, 255, 0, 0.7),\n                " + -xDrift + "px " + -yDrift + "px 0 rgba(0, 0, 255, 0.7)\n            ";
            // console.log(this.mainText.style.textShadow);
        }
    };
    TrippyText.prototype.handleEvent = function (ev) {
        var _this = this;
        this.textContainer = document.querySelector(".main-container");
        this.mainText = document.querySelector(".main-container h1");
        this.textContainer.addEventListener("mousemove", function (mouseEv) {
            _this.driftTextShadow(mouseEv);
        });
    };
    return TrippyText;
}());
document.addEventListener("DOMContentLoaded", new TrippyText());
