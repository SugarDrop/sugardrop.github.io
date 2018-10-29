interface IInventor {
    firstName: string;
    lastName: string;
    birthYear: number;
    deathYear: number;
}

const inventors: Array<IInventor> = [
    { firstName: 'Albert', lastName: 'Einstein', birthYear: 1879, deathYear: 1955 },
    { firstName: 'Isaac', lastName: 'Newton', birthYear: 1643, deathYear: 1727 },
    { firstName: 'Galileo', lastName: 'Galilei', birthYear: 1564, deathYear: 1642 },
    { firstName: 'Marie', lastName: 'Curie', birthYear: 1867, deathYear: 1934 },
    { firstName: 'Johannes', lastName: 'Kepler', birthYear: 1571, deathYear: 1630 },
    { firstName: 'Nicolaus', lastName: 'Copernicus', birthYear: 1473, deathYear: 1543 },
    { firstName: 'Max', lastName: 'Planck', birthYear: 1858, deathYear: 1947 },
    { firstName: 'Katherine', lastName: 'Blodgett', birthYear: 1898, deathYear: 1979 },
    { firstName: 'Ada', lastName: 'Lovelace', birthYear: 1815, deathYear: 1852 },
    { firstName: 'Sarah E.', lastName: 'Goode', birthYear: 1855, deathYear: 1905 },
    { firstName: 'Lise', lastName: 'Meitner', birthYear: 1878, deathYear: 1968 },
    { firstName: 'Hanna', lastName: 'Hammarström', birthYear: 1829, deathYear: 1909 }
];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const filterFor1500s = function(inventor: IInventor, index: number, array: IInventor[]): boolean {
    let fitEra = false;
    if (inventor.birthYear >= 1500 && inventor.birthYear < 1600) {
        fitEra = true;
    }
    return fitEra;
}
console.log(inventors.filter(filterFor1500s));

// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
const extractInventorName = function(inventor: IInventor, index: number, array: IInventor[]): string {
    const inventorFullName = `${inventor.firstName} ${inventor.lastName}`;
    return inventorFullName;
}
console.log(inventors.map<string>(extractInventorName));

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const oldestToYoungestSortOrder = function(lhs: IInventor, rhs: IInventor): number {
    return (lhs.birthYear - rhs.birthYear);
}
console.log(inventors.sort(oldestToYoungestSortOrder));

// Array.prototype.reduce()
// 4. How many years did all the inventors live?
const yearsLivedMap = function(inventor: IInventor, idx: number, arr: IInventor[]): number {
    return (inventor.deathYear - inventor.birthYear);
}
const totalYearsReducer = function(prevVal: number, currentValue: number, curIdx: number, arr: number[]): number {
    return (prevVal + currentValue);
}
console.log(inventors.map<number>(yearsLivedMap).reduce(totalYearsReducer));

// 5. Sort the inventors by years lived
const yearsLivedSortOrder = function(lhs: IInventor, rhs: IInventor): number {
    const lhsLivedYears = (lhs.deathYear - lhs.birthYear);
    const rhsLivedYears = (rhs.deathYear - rhs.birthYear);
    return (lhsLivedYears - rhsLivedYears);
}
console.log(inventors.sort(yearsLivedSortOrder));

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
const boullevards = ["Boulevards of Paris", "Boulevard de Clichy", "Boulevard Richard-Lenoir", "Boulevard de Rochechouart"];
const roadsWithDe = boullevards.filter((value: string, idx: number, arr: string[]) => {
    return (value.indexOf("de") >= 0);
});
console.log(roadsWithDe);

// 7. sort Exercise
// Sort the people alphabetically by last name
const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
console.log(people.sort((lhs: string, rhs: string) => {
    const lhsLastName = lhs.split(',')[1];
    const rhsLastName = rhs.split(',')[1];
    if (lhsLastName === rhsLastName) {
        return 0;
    }
    else if (lhsLastName > rhsLastName) {
        return 1;
    }
    else {
        return -1;
    }
}));

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
const tallyReducer = function(prev: Object, curVal: string, curIdx: number, array: string[]): Object {
    if (prev[curVal]) {
        prev[curVal] = prev[curVal] + 1;
    }
    else {
        prev[curVal] = 1;
    }
    return prev;
}
console.log(data.reduce<{}>(tallyReducer, {}));
