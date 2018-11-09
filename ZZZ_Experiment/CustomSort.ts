const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function customStrip(s: string): string {
    return s.replace(/^(a |the |an )/i, '').trim();
}

function customComparator(lhs: string, rhs: string): number {
    return (customStrip(lhs) > customStrip(rhs)) ? 1 : -1;
}

const sortedBands = bands.sort(customComparator);
console.log(sortedBands);
