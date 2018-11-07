class TrippyText implements EventListenerObject {
    private textContainer: HTMLDivElement = null;
    private mainText: HTMLHeadingElement = null;
    private drift = 15; // px

    private driftTextShadow(mouseEv: MouseEvent) {
        // Use object decomposition sytatic sugar to marshal out some values
        const { offsetWidth: baseWidth, offsetHeight: baseHeight } = this.textContainer;
        let { offsetX: mouseX, offsetY: mouseY } = mouseEv;

        if (mouseEv.target == this.mainText) {
            this.mainText.style.textShadow = "";
        }
        else {
            const xDrift = Math.round((mouseX / baseWidth * this.drift) - (this.drift / 2));
            const yDrift = Math.round((mouseY / baseHeight * this.drift) - (this.drift / 2));
            this.mainText.style.textShadow = `
                ${xDrift}px ${yDrift}px 0 rgba(255, 0, 255, 0.7),
                ${-xDrift}px ${yDrift}px 0 rgba(0, 255, 255, 0.7),
                ${xDrift}px ${-yDrift}px 0 rgba(0, 255, 0, 0.7),
                ${-xDrift}px ${-yDrift}px 0 rgba(0, 0, 255, 0.7)
            `;
            // console.log(this.mainText.style.textShadow);
        }
    }

    handleEvent(ev: Event) {
        this.textContainer = document.querySelector<HTMLDivElement>(".main-container");
        this.mainText = document.querySelector<HTMLHeadingElement>(".main-container h1");

        this.textContainer.addEventListener("mousemove", (mouseEv: MouseEvent) => {
            this.driftTextShadow(mouseEv);
        });
    }
}

document.addEventListener("DOMContentLoaded", new TrippyText());
