// 1. Multiples of 3 and 5
let list = Array.apply(0, {length: 1000}).map((value, index) => index);

let result1 = list.filter(n => n % 3 === 0 || n % 5 === 0).reduce((x, y) => x + y);

//result1 = 233168

//2. Even Fibonacci numbers
fibonacciN(first = 0, second = 1, n){
    
}