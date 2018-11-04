var CustomVideoPlayer = /** @class */ (function () {
    function CustomVideoPlayer() {
        this.video = null;
        this.videoProgress = null;
        this.videoProgressFilled = null;
        this.playPauseButton = null;
        this.skipBackButton = null;
        this.skipForwardButton = null;
        this.volumeSlider = null;
        this.playbackRateSlider = null;
    }
    CustomVideoPlayer.prototype.togglePlayPause = function () {
        if (this.video.paused) {
            this.playPauseButton.innerHTML = '❚❚';
            this.video.play();
        }
        else {
            this.playPauseButton.innerHTML = '►';
            this.video.pause();
        }
    };
    CustomVideoPlayer.prototype.updateProgressFill = function () {
        var percentage = (this.video.currentTime / this.video.duration) * 100;
        this.videoProgressFilled.style.flexBasis = percentage + "%";
    };
    CustomVideoPlayer.prototype.skip = function (amount) {
        this.video.currentTime += amount;
    };
    CustomVideoPlayer.prototype.changeVideoRangeAttribute = function (sliderData) {
        this.video[sliderData.name] = sliderData.value;
    };
    CustomVideoPlayer.prototype.handleProgressJump = function (ev) {
        var jumpTo = (ev.offsetX / this.videoProgress.offsetWidth) * this.video.duration;
        this.video.currentTime = jumpTo;
    };
    CustomVideoPlayer.prototype.handleEvent = function (evt) {
        var _this = this;
        this.video = document.querySelector(".viewer");
        this.videoProgress = document.querySelector(".video-progress");
        this.videoProgressFilled = document.querySelector(".video-progress-filled");
        this.playPauseButton = document.querySelector(".play-pause-button");
        this.skipBackButton = document.querySelector(".skip-back-button");
        this.skipForwardButton = document.querySelector(".skip-forward-button");
        this.volumeSlider = document.querySelector(".volume-slider");
        this.playbackRateSlider = document.querySelector(".playback-rate-slider");
        this.video.addEventListener("click", function () { _this.togglePlayPause(); });
        this.video.addEventListener("timeupdate", function () { _this.updateProgressFill(); });
        this.playPauseButton.addEventListener("click", function () { _this.togglePlayPause(); });
        this.skipBackButton.addEventListener("click", function () { _this.skip(parseInt(_this.skipBackButton.dataset.skip)); });
        this.skipForwardButton.addEventListener("click", function () { _this.skip(parseInt(_this.skipForwardButton.dataset.skip)); });
        this.volumeSlider.addEventListener("change", function () { _this.changeVideoRangeAttribute(_this.volumeSlider); });
        this.playbackRateSlider.addEventListener("change", function () { _this.changeVideoRangeAttribute(_this.playbackRateSlider); });
        this.videoProgress.addEventListener("click", function (ev) { _this.handleProgressJump(ev); });
    };
    return CustomVideoPlayer;
}());
document.addEventListener("DOMContentLoaded", new CustomVideoPlayer());
//# sourceMappingURL=customVideoPlayer.js.map