var SlideInOnScroll = /** @class */ (function () {
    function SlideInOnScroll() {
        this.slidingImages = null;
    }
    SlideInOnScroll.prototype.updateSlidingImagesActiveStates = function () {
        for (var i = 0; i < this.slidingImages.length; i++) {
            var image = this.slidingImages[i];
            var imageYAmountVisible = (window.scrollY + window.innerHeight) - image.offsetTop;
            var halfShown = false;
            var scrolledPast = false;
            if (imageYAmountVisible >= (image.height / 2)) {
                halfShown = true;
            }
            if ((image.offsetTop + image.height) < window.scrollY) {
                scrolledPast = true;
            }
            if (halfShown && !scrolledPast) {
                image.classList.add("active");
            }
            else {
                image.classList.remove("active");
            }
        }
    };
    SlideInOnScroll.prototype.scrollingDebounceHelperFunction = function (updaterFunction, debounceTime) {
        if (debounceTime === void 0) { debounceTime = 300; }
        var timerHandle;
        return function () {
            clearTimeout(timerHandle);
            timerHandle = setTimeout(updaterFunction, debounceTime);
        };
    };
    SlideInOnScroll.prototype.handleEvent = function (evt) {
        var _this = this;
        this.slidingImages = document.querySelectorAll(".slide-in");
        var updaterFunction = (function () { _this.updateSlidingImagesActiveStates(); });
        window.addEventListener("scroll", this.scrollingDebounceHelperFunction(updaterFunction));
    };
    return SlideInOnScroll;
}());
document.addEventListener("DOMContentLoaded", new SlideInOnScroll());
//# sourceMappingURL=slideInOnScroll.js.map