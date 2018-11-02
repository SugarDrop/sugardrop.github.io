class DrawingPad implements EventListenerObject {
    private canvasElem: HTMLCanvasElement = null;
    private canvasContext:CanvasRenderingContext2D = null;
    private drawing = false;
    private lastX = 0.0;
    private lastY = 0.0;
    private hue = 0;
    private increaseWidth = true;

    private draw(ev: MouseEvent) {
        if (!this.drawing) return;
        this.canvasContext.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.lastX, this.lastY);
        this.canvasContext.lineTo(ev.offsetX, ev.offsetY);
        this.canvasContext.stroke();
        [this.lastX, this.lastY] = [ev.offsetX, ev.offsetY];

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
    }

    handleEvent(evt: Event) {
        this.canvasElem = document.querySelector<HTMLCanvasElement>("#pad");
        this.canvasElem.width = window.innerWidth;
        this.canvasElem.height = window.innerHeight;
        this.canvasContext = this.canvasElem.getContext("2d");
        this.canvasContext.strokeStyle = '#BADA55';
        this.canvasContext.lineJoin = 'bevel';
        this.canvasContext.lineCap = 'round';
        this.canvasContext.lineWidth = 50;
        this.canvasContext.lineJoin

        this.canvasElem.addEventListener("mousemove", (ev: MouseEvent) => {
            this.draw(ev);
        });
        this.canvasElem.addEventListener("mousedown", (ev: MouseEvent) => {
            [this.lastX, this.lastY] = [ev.offsetX, ev.offsetY];
            this.drawing = true;
        });
        this.canvasElem.addEventListener("mouseup", () => {
            this.drawing = false;
        });
        this.canvasElem.addEventListener("mouseout", () => {
            this.drawing = false;
        });
    }
}
document.addEventListener("DOMContentLoaded", new DrawingPad());