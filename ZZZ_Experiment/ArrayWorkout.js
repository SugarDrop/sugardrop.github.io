var inventors = [
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
var filterFor1500s = function (inventor, index, array) {
    var fitEra = false;
    if (inventor.birthYear >= 1500 && inventor.birthYear < 1600) {
        fitEra = true;
    }
    return fitEra;
};
console.log(inventors.filter(filterFor1500s));
// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
var extractInventorName = function (inventor, index, array) {
    var inventorFullName = inventor.firstName + " " + inventor.lastName;
    return inventorFullName;
};
console.log(inventors.map(extractInventorName));
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
var oldestToYoungestSortOrder = function (lhs, rhs) {
    return (lhs.birthYear - rhs.birthYear);
};
console.log(inventors.sort(oldestToYoungestSortOrder));
// Array.prototype.reduce()
// 4. How many years did all the inventors live?
var yearsLivedMap = function (inventor, idx, arr) {
    return (inventor.deathYear - inventor.birthYear);
};
var totalYearsReducer = function (prevVal, currentValue, curIdx, arr) {
    return (prevVal + currentValue);
};
console.log(inventors.map(yearsLivedMap).reduce(totalYearsReducer));
// 5. Sort the inventors by years lived
var yearsLivedSortOrder = function (lhs, rhs) {
    var lhsLivedYears = (lhs.deathYear - lhs.birthYear);
    var rhsLivedYears = (rhs.deathYear - rhs.birthYear);
    return (lhsLivedYears - rhsLivedYears);
};
console.log(inventors.sort(yearsLivedSortOrder));
// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
var boullevards = ["Boulevards of Paris", "Boulevard de Clichy", "Boulevard Richard-Lenoir", "Boulevard de Rochechouart"];
var roadsWithDe = boullevards.filter(function (value, idx, arr) {
    return (value.indexOf("de") >= 0);
});
console.log(roadsWithDe);
// 7. sort Exercise
// Sort the people alphabetically by last name
var people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
console.log(people.sort(function (lhs, rhs) {
    var lhsLastName = lhs.split(',')[1];
    var rhsLastName = rhs.split(',')[1];
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
var data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];
var tallyReducer = function (prev, curVal, curIdx, array) {
    if (prev[curVal]) {
        prev[curVal] = prev[curVal] + 1;
    }
    else {
        prev[curVal] = 1;
    }
    return prev;
};
console.log(data.reduce(tallyReducer, {}));
