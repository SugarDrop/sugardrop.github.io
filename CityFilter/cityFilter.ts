class CityFilter implements EventListenerObject {
    private readonly endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    private cities = [];
    private searchBox: HTMLInputElement = null;

    private findMatches(word) {
        return this.cities.filter((place: any, idx: number, arr: any[]) => {
            const regex = new RegExp(word, 'gi');
            return place.city.match(regex) || place.state.match(regex);
        });
    }

    private displayMatches() {
        const matchedPlaces = this.findMatches(this.searchBox.value);
        console.log(matchedPlaces);
    }

    handleEvent(evt: Event) {
        fetch(this.endpoint)
            .then((blob) => {
                console.log(blob);
                return blob.json(); 
            })
            .then((data) => {
                // console.log(data); 
                this.cities.push(...data);
                console.log(this.cities); 
            });

        this.searchBox = document.querySelector<HTMLInputElement>(".search-input");
        this.searchBox.addEventListener("keyup", () => {
            this.displayMatches();
        });
    }
}
document.addEventListener("DOMContentLoaded", new CityFilter());