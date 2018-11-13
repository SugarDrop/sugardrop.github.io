class FollowAlongHighlight implements EventListenerObject {
    private highlightSpan: HTMLSpanElement = document.createElement("span");

    moveHighlightLinkToAnchor(anchor: HTMLAnchorElement) {
        let linkCoords = anchor.getBoundingClientRect();
        const coords = {
            top: linkCoords.top + window.scrollY,
            left: linkCoords.left + window.scrollX,
            width: linkCoords.width,
            height: linkCoords.height
        }

        this.highlightSpan.style.width = `${coords.width}px`;
        this.highlightSpan.style.height = `${coords.height}px`;
        this.highlightSpan.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
    }

    handleEvent(ev: Event) {
        this.highlightSpan.classList.add("highlight");
        document.body.append(this.highlightSpan);

        let anchors = document.querySelectorAll<HTMLAnchorElement>("a");
        for (let i = 0; i < anchors.length; i++) {
            anchors.item(i).addEventListener("mouseenter", (ev: MouseEvent) => {
                this.moveHighlightLinkToAnchor(ev.target as HTMLAnchorElement);
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", new FollowAlongHighlight());