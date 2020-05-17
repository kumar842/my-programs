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

Number.isEven = n => n !== 0 && n % 2 === 0;
Number.isOdd = n => n % 2 === 1;
Number.square = x => x * x;
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
Number.fibonacciUpToNMaxValue = (n, maxValue, first=0, second=1) => {
  let arr = [];
  for(let i = 0; i < n && (arr[i - 1] || 0) < 4000000; i++){
    if(i === 0) arr[i] = first;
    else if(i === 1) arr[i] = second;
    else arr[i] = arr[i - 1] + arr[i - 2];
    
    if(arr[i] > maxValue) break;
  }
  arr.pop();//remove the last element
  return arr;
}

Number.gcd = (x, y) => {
  function gcdUtil(a, b){
	  if(a === 0) return b;
	  else return gcdUtil(b % a, a);
  }
	return gcdUtil(x, y);
}

Number.lcm = (arr) => {
  function lcmUtil(arr){
    if(arr.length === 0) return undefined;
    else if(arr.length === 1) return arr[0];
    else if(arr.length === 2) return arr[0] * arr[1] / Number.gcd(arr[0], arr[1]);
    else return lcmUtil([arr[0], lcmUtil(arr.splice(1))])
  }
  return lcmUtil(arr);
}

Number.productOfAllDigits = n => {
  function util(n){
    if(n < 10) return n;
    else return (n % 10) * util(Math.floor(n/10));
  }
  return util(n);
}
var result = [];

/** 1. Multiples of 3 and 5 **/
var result1 = Array._1toN(10).filter(n => n % 3 === 0 || n % 5 === 0).sum();
result.push(result1);
//Answer: 233168


/** 2. Even Fibonacci numbers **/
var result2 = Number.fibonacciUpToNMaxValue(40, 4000000, 1, 2).filter(n => Number.isEven(n)).sum();
result.push(result2);
//Answer: 4613732

/**
3. Largest prime factor.
The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the number 600851475143 ? 
*/
var result3 = Number.primeFactors(600851475143).max()//TODO: says wrong answer.. check it out.. 
result.push(result3);

/**
4.Largest palindrome product
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
Find the largest palindrome made from the product of two 3-digit numbers.
*/
var numbers = (new Array(900)).fill(1).map((value, index) => 999 - index);
var cartesian = numbers.map(n => numbers.map(x => x * n));
var result4 = cartesian.flatMap(x => x).filter(n => Number.isNPalindrome(n)).max();
result.push(result4);
//Ans: 906609

/**
5. Smallest multiple
2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20? 
*/
var result5 = Number.lcm(Array._1toN(20));
result.push(result5);

/** 6. Sum square difference */
var result6 = Number.square(Array._1toN(100).sum()) - Array._1toN(100).map(x => x * x).sum()
result.push(result6);

/**
7. 10001st prime
By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
What is the 10001st prime number? 
*/
Array._1toN(150000).filter(n => Number.isPrime(n))[10000]
//Ans: 104743


/**
8. Largest product in a series
The four adjacent digits in the 1000-digit number that have the greatest product are 9 × 9 × 8 × 9 = 5832.
Find the thirteen adjacent digits in the 1000-digit number that have the greatest product. What is the value of this product? 
*/
var _1000digitNumber = '7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450'
var result8 = Array._0toN(1000).map(x => Number(_1000digitNumber.substring(x, x + 13))).map(x => Number.productOfAllDigits(x)).max();
result.push(result8);

/** print results **/
result.map((r, i) => console.log(`result${i + 1} : ${r}`));
