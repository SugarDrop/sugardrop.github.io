var CityFilter = /** @class */ (function () {
    function CityFilter() {
        this.endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
        this.cities = [];
        this.searchBox = null;
    }
    CityFilter.prototype.findMatches = function (word) {
        return this.cities.filter(function (place, idx, arr) {
            var regex = new RegExp(word, 'gi');
            return place.city.match(regex) || place.state.match(regex);
        });
    };
    CityFilter.prototype.displayMatches = function () {
        var matchedPlaces = this.findMatches(this.searchBox.value);
        console.log(matchedPlaces);
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
            // console.log(data); 
            (_a = _this.cities).push.apply(_a, data);
            console.log(_this.cities);
        });
        this.searchBox = document.querySelector(".search-input");
        this.searchBox.addEventListener("keyup", function () {
            _this.displayMatches();
        });
    };
    return CityFilter;
}());
document.addEventListener("DOMContentLoaded", new CityFilter());
