var AnalogClockMain = /** @class */ (function () {
    function AnalogClockMain() {
        this.hourHand = null;
        this.minuteHand = null;
        this.secondHand = null;
    }
    AnalogClockMain.prototype.updateClockHands = function () {
        var timeNow = new Date();
        var seconds = timeNow.getSeconds();
        var secondsDegree = ((seconds / 60) * 360) + 90;
        this.secondHand.style.transform = "rotate(" + secondsDegree + "deg)";
        var minutes = timeNow.getMinutes();
        var minutesDegree = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        this.minuteHand.style.transform = "rotate(" + minutesDegree + "deg)";
        var hours = (timeNow.getHours() % 12);
        var hoursDegree = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
        this.hourHand.style.transform = "rotate(" + hoursDegree + "deg)";
    };
    AnalogClockMain.prototype.init = function () {
        var _this = this;
        this.hourHand = document.querySelector(".hour-hand");
        this.minuteHand = document.querySelector(".minute-hand");
        this.secondHand = document.querySelector(".second-hand");
        this.updateClockHands();
        setInterval(function () { _this.updateClockHands(); }, 1000);
    };
    AnalogClockMain.prototype.handleEvent = function (ev) {
        this.init();
    };
    return AnalogClockMain;
}());
document.addEventListener("DOMContentLoaded", new AnalogClockMain());
