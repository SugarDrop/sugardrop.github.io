var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var arr = ["a", "b", "c", "d"];
var copyArr = arr.slice();
console.log(copyArr);
var a = arr[0], b = arr[1], c = arr[2];
console.log(a);
console.log(b);
console.log(c);
var test = {
    name: 'test',
    age: 100,
    social: {
        twitter: '@test',
        facebook: 'test.test'
    },
    testFunc: function () {
        return this.name;
    }
};
console.log("===================");
var testCopy = JSON.parse(JSON.stringify(test));
testCopy.name = "testCopy";
testCopy.social.twitter = "@testCopy";
console.log(testCopy);
// console.log(testCopy.testFunc());
console.log(test);
console.log(test.testFunc());
console.log("===================");
var testCopy2 = __assign({}, test);
testCopy2.name = "testCopy2";
testCopy2.age = 101;
testCopy2.social.twitter = "@testCopy2";
console.log(testCopy2);
console.log(testCopy2.testFunc());
console.log(test);
console.log(test.testFunc());
console.log("===================");
