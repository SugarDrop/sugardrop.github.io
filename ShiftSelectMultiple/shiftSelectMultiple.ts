class ShiftSelectMultiple implements EventListenerObject {
    private checkboxes: NodeListOf<HTMLInputElement> = null;

    private handleMultiSelect(endIdx: number) {
        for (let idx = endIdx - 1; idx >= 0; idx--) {
            if (!this.checkboxes[idx].checked) {
                this.checkboxes[idx].checked = true;
            }
            else {
                break;
            }
        }
    }

    handleEvent(evt: Event) {
        this.checkboxes = document.querySelectorAll<HTMLInputElement>(".list-item input");
        this.checkboxes.forEach((checkbox: HTMLInputElement, idx: number, parent: NodeListOf<HTMLInputElement>) => {
            checkbox.addEventListener("click", (mouseEvt: MouseEvent) => {
                if (mouseEvt.shiftKey && checkbox.checked) {
                    this.handleMultiSelect(idx);
                }
            })
        });
    }
}

document.addEventListener("DOMContentLoaded", new ShiftSelectMultiple());