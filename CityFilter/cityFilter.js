var CityFilter = /** @class */ (function () {
    function CityFilter() {
        this.endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
        this.cities = [];
        this.searchBox = null;
        this.suggestions = null;
    }
    CityFilter.prototype.findMatches = function (word) {
        return this.cities.filter(function (place, idx, arr) {
            var regex = new RegExp(word, 'gi');
            return place.city.match(regex) || place.state.match(regex);
        });
    };
    CityFilter.prototype.displayMatches = function () {
        var _this = this;
        var matchedPlaces = this.findMatches(this.searchBox.value);
        var generatedListItems = matchedPlaces.map(function (value, idx, arr) {
            var regex = new RegExp(_this.searchBox.value, 'gi');
            var city = value.city;
            var state = value.state;
            var cityWithHighlight = city.replace(regex, "<span class=\"highlight\">" + _this.searchBox.value + "</span>");
            var stateWithHighlight = state.replace(regex, "<span class=\"highlight\">" + _this.searchBox.value + "</span>");
            return "\n            <li>\n                <span class=\"name\">" + cityWithHighlight + ", " + stateWithHighlight + "</span>\n                <span class=\"population\">" + value.population + "</span>\n            </li>\n            ";
        });
        this.suggestions.innerHTML = generatedListItems.join('');
    };
    CityFilter.prototype.handleEvent = function (evt) {
        var _this = this;
        fetch(this.endpoint)
            .then(function (blob) {
            console.log(blob);
            return blob.json();
        })
            .then(function (data) {
            var _a;
            (_a = _this.cities).push.apply(_a, data);
            console.log(_this.cities);
        });
        this.suggestions = document.querySelector(".suggestions");
        this.searchBox = document.querySelector(".search-input");
        this.searchBox.addEventListener("keyup", function () {
            _this.displayMatches();
        });
    };
    return CityFilter;
}());
document.addEventListener("DOMContentLoaded", new CityFilter());
//# sourceMappingURL=cityFilter.js.map