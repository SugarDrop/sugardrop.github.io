interface PlateInfo {
    name: string;
    done: boolean;
}

class Tapas implements EventListenerObject {
    private platesList: HTMLUListElement = null;
    private addItemsForm: HTMLFormElement = null;
    private plates: PlateInfo[] = null;

    private addPlate(ev: Event) {
        ev.preventDefault();
        const itemInputElem = this.addItemsForm.querySelector<HTMLInputElement>("[name=item]");
        const newPlate: PlateInfo = {
            name: itemInputElem.value,
            done: false
        };
        this.plates.push(newPlate);
        this.displayPlates();
        localStorage.setItem("plates", JSON.stringify(this.plates));
        this.addItemsForm.reset();
    }

    private displayPlates() {
        const pHtmlList = this.plates.map((p: PlateInfo, idx: number, arr: PlateInfo[]) => {
            return `
            <li data-index=${idx}>
                <input type="checkbox" data-index=${idx} id="item${idx}" ${p.done ? 'checked' : ''} />
                <label for="item${idx}">${p.name}</label>
            </li>
            `;
        });
        this.platesList.innerHTML = pHtmlList.join('');
    }

    private toggleDone(ev: MouseEvent) {
        // console.log(el);
        const el = ev.target as HTMLElement;
        if (!el.matches("input")) { return; }
        const idx = parseInt(el.dataset.index);
        this.plates[idx].done = !this.plates[idx].done;
        localStorage.setItem("plates", JSON.stringify(this.plates));
        this.displayPlates();
    }

    handleEvent(evt: Event) {
        this.platesList = document.querySelector<HTMLUListElement>(".plates");
        this.addItemsForm = document.querySelector<HTMLFormElement>(".add-items");
        this.plates = JSON.parse(localStorage.getItem("plates")) || [];

        this.addItemsForm.addEventListener("submit", (ev: Event) => { this.addPlate(ev) });
        this.platesList.addEventListener("click", (ev: MouseEvent) => {
            this.toggleDone(ev);
        })
        this.displayPlates();
    }
}

document.addEventListener("DOMContentLoaded", new Tapas());