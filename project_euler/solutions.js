class Util {
}
const util =  new Util();

String.prototype.isPalindrome = function() {
    function isPalindromeUtil(str){
    if(str.length <= 1) return true;
          else if(str[0] !== str[str.length - 1]) return false;
          else return isPalindromeUtil(str.substring(1, str.length - 1));
    }
    return isPalindromeUtil(this);
  }


Array.prototype.sum = function() {return this.reduce((x, y) => x + y)};
Array.prototype.max = function() {return this.reduce((x, y) => x > y? x: y)};
Array.prototype.min = function() {return this.reduce((x, y) => x < y? x: y)};
Array.prototype.contains = function(n) {return this.filter(x => x === n).length > 0}

Array._1toN = n => Array.apply(0, {length: n}).map((value, index) => index + 1);
Array._0toN = n => Array.apply(0, {length: n}).map((value, index) => index);


Number.isNDivisibleBy = function(n, x) {return n % x == 0}
Number.factors = n => {
    let factors = [];
    let maxValue = Math.ceil(Math.sqrt(n));
    for(let i = 1; i <= maxValue; i++){
        if(Number.isNDivisibleBy(n, i)){
            if(!factors.contains(i)) factors.push(i);
            if(!factors.contains(n/i)) factors.push(n/i);
        }
    }
    return factors;
  }
Number.isPrime = n => Number.factors(n).length == 2
Number.primeFactors = n => Number.factors(n).filter(x => Number.isPrime(x))
Number.isNPalindrome = n => n.toString().isPalindrome()


// 1. Multiples of 3 and 5
let result1 = Array._1toN(10).filter(n => n % 3 === 0 || n % 5 === 0).sum();
//Answer: 233168


//2. Even Fibonacci numbers
// fibonacciN(first = 0, second = 1, n){
    
// }
//Answer: 4613732

//3. Largest prime factor.
// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143 ?
let result3 = Number.primeFactors(600851475143).max()//TODO: says wrong answer.. check it out.. 


//4.Largest palindrome product
//A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
//Find the largest palindrome made from the product of two 3-digit numbers.

let numbers = (new Array(900)).fill(1).map((value, index) => 999 - index)
let cartesian = numbers.map(n => numbers.map(x => x * n));
let result4 = cartesian.flatMap(x => x).filter(n => Number.isNPalindrome(n)).max();
//Ans: 906609
