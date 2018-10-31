class CityFilter implements EventListenerObject {
    private readonly endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    private cities = [];
    private searchBox: HTMLInputElement = null;
    private suggestions: HTMLUListElement = null;

    private findMatches(word) {
        return this.cities.filter((place: any, idx: number, arr: any[]) => {
            const regex = new RegExp(word, 'gi');
            return place.city.match(regex) || place.state.match(regex);
        });
    }

    private displayMatches() {
        const matchedPlaces = this.findMatches(this.searchBox.value);
        const generatedListItems = matchedPlaces.map<string>((value: any, idx: number, arr: any[]) => {
            const regex = new RegExp(this.searchBox.value, 'gi');
            const city = value.city as string;
            const state = value.state as string;
            const cityWithHighlight = city.replace(regex, `<span class="highlight">${this.searchBox.value}</span>`);
            const stateWithHighlight = state.replace(regex, `<span class="highlight">${this.searchBox.value}</span>`);
            return `
            <li>
                <span class="name">${cityWithHighlight}, ${stateWithHighlight}</span>
                <span class="population">${value.population}</span>
            </li>
            `;
        });
        this.suggestions.innerHTML = generatedListItems.join('');
    }

    handleEvent(evt: Event) {
        fetch(this.endpoint)
            .then((blob: Response) => {
                console.log(blob);
                return blob.json();
            })
            .then((data) => {
                this.cities.push(...data);
                console.log(this.cities);
            });

        this.suggestions = document.querySelector<HTMLUListElement>(".suggestions");
        this.searchBox = document.querySelector<HTMLInputElement>(".search-input");
        this.searchBox.addEventListener("keyup", () => {
            this.displayMatches();
        });
    }
}
document.addEventListener("DOMContentLoaded", new CityFilter());