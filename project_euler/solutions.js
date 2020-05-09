// 1. Multiples of 3 and 5
let list = Array.apply(0, {length: 1000}).map((value, index) => index);

let result1 = list.filter(n => n % 3 === 0 || n % 5 === 0).reduce((x, y) => x + y);

//result1 = 233168

//2. Even Fibonacci numbers
fibonacciN(first = 0, second = 1, n){
    
}

//4. 
function isPalindrom(str) {
    if(str.length <= 1) return true;
    else if(str[0] !== str[str.length - 1]) return false;
    else return isPalindrom(str.substring(1, str.length - 1));
}

let numbers = (new Array(900)).fill(1).map((value, index) => 999- index)
let cartesian = numbers.map(n => {
    return numbers.map(x => x * n);
});
let result = cartesian.flatMap(x => x)
result.filter(n => isPalindrom(""+n))
output.reduce((x,y) => x >y? x: y);