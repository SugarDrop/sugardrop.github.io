class SlideInOnScroll implements EventListenerObject {
    private slidingImages: NodeListOf<HTMLImageElement> = null;

    private updateSlidingImagesActiveStates() {
        for (let i = 0; i < this.slidingImages.length; i++) {
            const image = this.slidingImages[i];
            const imageYAmountVisible = (window.scrollY + window.innerHeight) - image.offsetTop;
            let halfShown = false;
            let scrolledPast = false;
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
    }

    private scrollingDebounceHelperFunction(updaterFunction: ()=>void, debounceTime: number = 300) {
        var timerHandle;
        return function() {
            clearTimeout(timerHandle);
            timerHandle = setTimeout(updaterFunction, debounceTime);
        };
    }

    handleEvent(evt: Event) {
        this.slidingImages = document.querySelectorAll<HTMLImageElement>(".slide-in");
        const updaterFunction = (() => { this.updateSlidingImagesActiveStates(); });
        window.addEventListener("scroll", this.scrollingDebounceHelperFunction(updaterFunction));
    }
}
document.addEventListener("DOMContentLoaded", new SlideInOnScroll());