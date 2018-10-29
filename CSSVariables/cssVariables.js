var handleInputElemUpdate = function (e) {
    console.log("Element name: " + e.name);
    console.log("Element value: " + e.value);
    console.log(e.dataset);
    var suffix = (e.type === 'range') ? "px" : "";
    document.documentElement.style.setProperty("--" + e.name, e.value + suffix);
};
var domLoadedHandler = function (evt) {
    var inputs = document.querySelectorAll(".controls input");
    // sets up listeners for each input control
    inputs.forEach(function (inputElem, key, parent) {
        inputElem.addEventListener("change", function () { handleInputElemUpdate(inputElem); });
    });
};
document.addEventListener("DOMContentLoaded", domLoadedHandler);
