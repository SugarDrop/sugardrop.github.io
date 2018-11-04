class CustomVideoPlayer implements EventListenerObject {
    private video: HTMLVideoElement = null;
    private videoProgress: HTMLDivElement = null;
    private videoProgressFilled: HTMLDivElement = null;
    private playPauseButton: HTMLButtonElement = null;
    private skipBackButton: HTMLButtonElement = null;
    private skipForwardButton: HTMLButtonElement = null;
    private volumeSlider: HTMLInputElement = null;
    private playbackRateSlider: HTMLInputElement = null;

    private togglePlayPause() {
        if (this.video.paused) {
            this.playPauseButton.innerHTML = '❚❚';
            this.video.play();
        }
        else {
            this.playPauseButton.innerHTML = '►';
            this.video.pause();
        }
    }

    private updateProgressFill() {
        const percentage = (this.video.currentTime / this.video.duration) * 100;
        this.videoProgressFilled.style.flexBasis = `${percentage}%`;
    }

    private skip(amount: number) {
        this.video.currentTime += amount;
    }

    private changeVideoRangeAttribute(sliderData: HTMLInputElement) {
        this.video[sliderData.name] = sliderData.value;
    }

    private handleProgressJump(ev: MouseEvent) {
        const jumpTo = (ev.offsetX / this.videoProgress.offsetWidth) * this.video.duration;
        this.video.currentTime = jumpTo;
    }

    handleEvent(evt: Event) {
        this.video = document.querySelector<HTMLVideoElement>(".viewer");
        this.videoProgress = document.querySelector<HTMLDivElement>(".video-progress");
        this.videoProgressFilled = document.querySelector<HTMLDivElement>(".video-progress-filled");
        this.playPauseButton = document.querySelector<HTMLButtonElement>(".play-pause-button");
        this.skipBackButton = document.querySelector<HTMLButtonElement>(".skip-back-button");
        this.skipForwardButton = document.querySelector<HTMLButtonElement>(".skip-forward-button");
        this.volumeSlider = document.querySelector<HTMLInputElement>(".volume-slider");
        this.playbackRateSlider = document.querySelector<HTMLInputElement>(".playback-rate-slider");

        this.video.addEventListener("click", () => { this.togglePlayPause() });
        this.video.addEventListener("timeupdate", () => { this.updateProgressFill() });
        this.playPauseButton.addEventListener("click", () => { this.togglePlayPause(); });
        this.skipBackButton.addEventListener("click", () => { this.skip(parseInt(this.skipBackButton.dataset.skip)); });
        this.skipForwardButton.addEventListener("click", () => { this.skip(parseInt(this.skipForwardButton.dataset.skip)); });
        this.volumeSlider.addEventListener("change", () => { this.changeVideoRangeAttribute(this.volumeSlider) });
        this.playbackRateSlider.addEventListener("change", () => { this.changeVideoRangeAttribute(this.playbackRateSlider) });
        this.videoProgress.addEventListener("click", (ev: MouseEvent) => { this.handleProgressJump(ev); });
    }
}

document.addEventListener("DOMContentLoaded", new CustomVideoPlayer());