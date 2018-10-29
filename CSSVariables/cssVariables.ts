let handleInputElemUpdate = function(e: HTMLInputElement) {
    console.log(`Element name: ${e.name}`);
    console.log(`Element value: ${e.value}`);
    console.log(e.dataset);
    const suffix: string = (e.type === 'range') ? "px" : "";
    document.documentElement.style.setProperty(`--${e.name}`, e.value + suffix);
}

let domLoadedHandler: EventListener = function (evt: Event) {
    const inputs = document.querySelectorAll(".controls input");
    // sets up listeners for each input control
    inputs.forEach((inputElem: Element, key: number, parent: NodeListOf<Element>) => {
        inputElem.addEventListener("change", () => { handleInputElemUpdate(inputElem as HTMLInputElement); });
    });
}
document.addEventListener("DOMContentLoaded", domLoadedHandler);