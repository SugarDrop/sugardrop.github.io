var ShiftSelectMultiple = /** @class */ (function () {
    function ShiftSelectMultiple() {
        this.checkboxes = null;
    }
    ShiftSelectMultiple.prototype.handleMultiSelect = function (endIdx) {
        for (var idx = endIdx - 1; idx >= 0; idx--) {
            if (!this.checkboxes[idx].checked) {
                this.checkboxes[idx].checked = true;
            }
            else {
                break;
            }
        }
    };
    ShiftSelectMultiple.prototype.handleEvent = function (evt) {
        var _this = this;
        this.checkboxes = document.querySelectorAll(".list-item input");
        this.checkboxes.forEach(function (checkbox, idx, parent) {
            checkbox.addEventListener("click", function (mouseEvt) {
                if (mouseEvt.shiftKey && checkbox.checked) {
                    _this.handleMultiSelect(idx);
                }
            });
        });
    };
    return ShiftSelectMultiple;
}());
document.addEventListener("DOMContentLoaded", new ShiftSelectMultiple());
