var Tapas = /** @class */ (function () {
    function Tapas() {
        this.platesList = null;
        this.addItemsForm = null;
        this.plates = null;
    }
    Tapas.prototype.addPlate = function (ev) {
        ev.preventDefault();
        var itemInputElem = this.addItemsForm.querySelector("[name=item]");
        var newPlate = {
            name: itemInputElem.value,
            done: false
        };
        this.plates.push(newPlate);
        this.displayPlates();
        localStorage.setItem("plates", JSON.stringify(this.plates));
        this.addItemsForm.reset();
    };
    Tapas.prototype.displayPlates = function () {
        var pHtmlList = this.plates.map(function (p, idx, arr) {
            return "\n            <li data-index=" + idx + ">\n                <input type=\"checkbox\" data-index=" + idx + " id=\"item" + idx + "\" " + (p.done ? 'checked' : '') + " />\n                <label for=\"item" + idx + "\">" + p.name + "</label>\n            </li>\n            ";
        });
        this.platesList.innerHTML = pHtmlList.join('');
    };
    Tapas.prototype.toggleDone = function (ev) {
        // console.log(el);
        var el = ev.target;
        if (!el.matches("input")) {
            return;
        }
        var idx = parseInt(el.dataset.index);
        this.plates[idx].done = !this.plates[idx].done;
        localStorage.setItem("plates", JSON.stringify(this.plates));
        this.displayPlates();
    };
    Tapas.prototype.handleEvent = function (evt) {
        var _this = this;
        this.platesList = document.querySelector(".plates");
        this.addItemsForm = document.querySelector(".add-items");
        this.plates = JSON.parse(localStorage.getItem("plates")) || [];
        this.addItemsForm.addEventListener("submit", function (ev) { _this.addPlate(ev); });
        this.platesList.addEventListener("click", function (ev) {
            _this.toggleDone(ev);
        });
        this.displayPlates();
    };
    return Tapas;
}());
document.addEventListener("DOMContentLoaded", new Tapas());
//# sourceMappingURL=tapas.js.map