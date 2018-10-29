class AnalogClockMain {
    private hourHand: HTMLDivElement = null;
    private minuteHand: HTMLDivElement = null;
    private secondHand: HTMLDivElement = null;

    private updateClockHands() {
        const timeNow = new Date();
        const seconds = timeNow.getSeconds();
        const secondsDegree = ((seconds / 60) * 360) + 90;
        this.secondHand.style.transform = `rotate(${secondsDegree}deg)`;

        const minutes = timeNow.getMinutes();
        const minutesDegree = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        this.minuteHand.style.transform = `rotate(${minutesDegree}deg)`;

        const hours = (timeNow.getHours() % 12);
        const hoursDegree = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
        this.hourHand.style.transform = `rotate(${hoursDegree}deg)`;
    }

    private init(): void {
        this.hourHand = document.querySelector(".hour-hand");
        this.minuteHand = document.querySelector(".minute-hand");
        this.secondHand = document.querySelector(".second-hand");
        this.updateClockHands();

        setInterval(() => { this.updateClockHands(); }, 1000);
    }

    handleEvent(ev: Event) {
        this.init();
    }
}

document.addEventListener("DOMContentLoaded", new AnalogClockMain());