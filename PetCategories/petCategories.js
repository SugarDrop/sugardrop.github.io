var PetCategoriesClickedHandler = /** @class */ (function () {
    function PetCategoriesClickedHandler() {
        this.categoryPanels = null;
        this.curOpenedCategory = -1;
    }
    PetCategoriesClickedHandler.prototype.handleCategoryClicked = function (categoryPanelIdx) {
        for (var i = 0; i < this.categoryPanels.length; i++) {
            this.categoryPanels.item(i).classList.remove("open", "open-active");
        }
        if (this.curOpenedCategory != categoryPanelIdx) {
            this.categoryPanels.item(categoryPanelIdx).classList.add("open", "open-active");
            this.curOpenedCategory = categoryPanelIdx;
        }
        else {
            this.curOpenedCategory = -1;
        }
    };
    PetCategoriesClickedHandler.prototype.handleEvent = function (evt) {
        var _this = this;
        this.categoryPanels = document.querySelectorAll(".panels .panel");
        this.categoryPanels.forEach(function (categoryDiv, categoryPanelIdx, parent) {
            categoryDiv.addEventListener("click", function () { _this.handleCategoryClicked(categoryPanelIdx); });
        }, this);
    };
    return PetCategoriesClickedHandler;
}());
var categoriesClickedHandler = new PetCategoriesClickedHandler();
document.addEventListener("DOMContentLoaded", categoriesClickedHandler);
