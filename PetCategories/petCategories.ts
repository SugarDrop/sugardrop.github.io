class PetCategoriesClickedHandler implements EventListenerObject {
    private categoryPanels: NodeListOf<HTMLDivElement> = null;
    private curOpenedCategory = -1;

    handleCategoryClicked(categoryPanelIdx: number) {
        for (let i = 0; i < this.categoryPanels.length; i++) {
            this.categoryPanels.item(i).classList.remove("open", "open-active");
        }

        if (this.curOpenedCategory != categoryPanelIdx) {
            this.categoryPanels.item(categoryPanelIdx).classList.add("open", "open-active");
            this.curOpenedCategory = categoryPanelIdx;
        }
        else {
            this.curOpenedCategory = -1;
        }
    }

    handleEvent(evt: Event): void {
        this.categoryPanels = document.querySelectorAll<HTMLDivElement>(".panels .panel");
        this.categoryPanels.forEach((categoryDiv: HTMLDivElement, categoryPanelIdx: number, parent: NodeListOf<HTMLDivElement>) => {
            categoryDiv.addEventListener("click", () => { this.handleCategoryClicked(categoryPanelIdx); });
        }, this);
    }
}

const categoriesClickedHandler = new PetCategoriesClickedHandler();
document.addEventListener("DOMContentLoaded", categoriesClickedHandler);