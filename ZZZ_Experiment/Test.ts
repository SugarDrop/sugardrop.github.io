let arr = ["a", "b", "c", "d"];
let copyArr = [...arr];
console.log(copyArr);
let [a, b, c] = arr;
console.log(a);
console.log(b);
console.log(c);

const test = {
    name: 'test',
    age: 100,
    social: {
      twitter: '@test',
      facebook: 'test.test'
    },

    testFunc: function() {
        return this.name;
    }
};

console.log("===================");
const testCopy = JSON.parse(JSON.stringify(test));
testCopy.name = "testCopy";
testCopy.social.twitter = "@testCopy";
console.log(testCopy);
// console.log(testCopy.testFunc());
console.log(test);
console.log(test.testFunc());
console.log("===================");

const testCopy2 = {...test};
testCopy2.name = "testCopy2";
testCopy2.age = 101;
testCopy2.social.twitter = "@testCopy2";
console.log(testCopy2);
console.log(testCopy2.testFunc());
console.log(test);
console.log(test.testFunc());
console.log("===================");
