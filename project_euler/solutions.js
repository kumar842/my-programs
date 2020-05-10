class Util {
    isPalindrome = (str) => {
        if(str.length <= 1) return true;
        else if(str[0] !== str[str.length - 1]) return false;
        else return isPalindrom(str.substring(1, str.length - 1));
    }
}

Array.prototype.sum = function() {return this.reduce((x, y) => x + y)};
Array.prototype.max = function() {return this.reduce((x, y) => x > y? x: y)};
Array.prototype.min = function() {return this.reduce((x, y) => x < y? x: y)};
Array._1toN = n => Array.apply(0, {length: n}).map((value, index) => index + 1);
Array._0toN = n => Array.apply(0, {length: n}).map((value, index) => index);

Number.isDivisibleBy = function(x) {return this % x == 0}

const util =  new Util();

// 1. Multiples of 3 and 5
let result1 = Array._1toN(10).filter(n => n % 3 === 0 || n % 5 === 0).sum();

//2. Even Fibonacci numbers
fibonacciN(first = 0, second = 1, n){
    
}

//4. 
let numbers = (new Array(900)).fill(1).map((value, index) => 999- index)
let cartesian = numbers.map(n => {
    return numbers.map(x => x * n);
});
let result = cartesian.flatMap(x => x)
result.filter(n => isPalindrom(""+n))
output.reduce((x,y) => x >y? x: y);