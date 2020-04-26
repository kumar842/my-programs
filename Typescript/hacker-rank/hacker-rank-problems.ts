import {Util} from './Util';

let util = new Util();

//1st sum of elements
let as = [5, 6, 7];
let res = util.sum(as);
//console.log(res);


//2nd compare triplets
let bs = [3, 6, 10];
function compareTriplets(a: number[], b: number[]): number[] {
    let res = a.map((x, i) => x - b[i]);
    return [util.filteredCount(res, util.isPositive), util.filteredCount(res, util.isNegative)];
}
//console.log(compareTriplets(as, bs));

//3rd very big sum
function aVeryBigSum(ar: number[]) {
    let result: string = "";
    return aVeryBigSumUtil(ar, "", 0);

    function aVeryBigSumUtil(ar: number[], result: string, remaining: number): string {
        // console.log(`ar: ${ar} -- result: ${result}  -- remaining: ${remaining}`);
        if(ar.filter(x => x > 0).length > 0) {
            let res = util.sum(ar.map(a => a % 10)) + remaining;
            return aVeryBigSumUtil(ar.map(a => Math.floor(a /10)), (res % 10) + result, Math.floor(res / 10));
        } else {
            if(remaining == 0)
                return result;
            else
                return remaining + result;
        }
    }
}
//console.log(aVeryBigSum([1000000001, 1000000002, 1000000003, 1000000004, 1000000005]))
//console.log(aVeryBigSum([19, 29, 39, 49]));


//4th - Diagonal Difference
function diagonalDifference(arr: number[][]) {
    let diagonal1Sum = arr.map((ar, i) => ar[i]).reduce((x, y) => x + y);
    let diagonal2Sum = arr.map((ar, i) => ar[ar.length - 1 - i]).reduce((x, y) => x + y);

    return Math.abs(diagonal1Sum - diagonal2Sum);
}
//console.log(diagonalDifference([[1, 2, 3], [4, 5, 6], [9, 8, 9]]));


//5th - Plus Minus
function plusMinus(arr: number[]) {
    let total = arr.length;
    const c = 1000000;
    let positiveFraction: string = "" + Math.round(arr.filter(util.isPositive).length * c/ total) / c;
    let zeroFraction: string = "" + Math.round(arr.filter(util.isZero).length * c/ total) / c;
    let negativeFraction: string = "" + Math.round(arr.filter(util.isNegative).length * c/ total) / c;

    // if(!positiveFraction.includes(".")){
    //     positiveFraction += ".0"; 
    // }

    // if(!zeroFraction.includes(".")){
    //     zeroFraction += ".0";
    // }

    // if(!negativeFraction.includes(".")){
    //     negativeFraction += ".0"; 
    // }

    while(positiveFraction.length < 8){
        positiveFraction += "0";
    }

    while(zeroFraction.length < 8){
        zeroFraction += "0";
    }

    while(negativeFraction.length < 8){
        negativeFraction += "0";
    }

    console.log(positiveFraction);
    console.log(negativeFraction);
    console.log(zeroFraction);
}
//plusMinus([-4, 3, -9, 0, 4, 1]);
//plusMinus([55, 48, 48, 45, 91, 97, 45, 1, 39, 54, 36, 6, 19, 35, 66, 36, 72, 93, 38, 21, 65, 70, 36, 63, 39, 76, 82, 26, 67, 29, 24, 82, 62, 53, 1, 50, 47, 65, 67, 19, 66, 90, 77]);

//6. staircase
function staircase(n: number) {
    let res: string[][]  = new Array<string[]>(n);

    for (let i = 0; i < n; i++) {
        res[i] = new Array<string>(n);
        for (let j = 0; j < n; j++) {
            if(i < (n -1 - j)) res[i][j] = " ";
            else res[i][j] = "#";
        }
    }
    res.forEach(x => console.log(x.join("")));
}
//staircase(5);


//7. miniMaxSum 
function miniMaxSum(arr: number[]) {
    let min = util.min(arr);
    let max = util.max(arr);
    let total = util.sum(arr);

    console.log(total - max, total - min);
}
//miniMaxSum([1, 2, 3, 4, 5]);


//8.  Complete the birthdayCakeCandles function below.
function birthdayCakeCandles(ar: number[]) {
    let max = util.max(ar);
    return ar.filter(a => a == max).length;
}
//console.log(birthdayCakeCandles([3, 2, 1, 3]));


//9. Complete the timeConversion function below.
function timeConversion(s: string) {
    let isAM = s.substring(s.length - 2) == "AM";
    let time = s.substring(0, s.length - 2);
    let hh = parseInt(time.substring(0, time.indexOf(":")));

    if(isAM){
        if(hh < 12)
            return time;
        else
            return "00" + time.substring(time.indexOf(":"));
    }
    else {
        if(hh < 12)
            hh += 12;
        return hh + time.substring(time.indexOf(":"));
    }
}
//console.log(timeConversion("12:05:45AM"));


//10. Complete the strangeCounter function below.
//formula:  1 + 3^x + a = 3 * 2^(x) - a
//n
// 3 == 1
// 3 + 3*2 == 1
// 3 + 3 * 2 + 3*2 * 2 = 1
//3 ( 1 + 2 + 2*2 .. ) = 1
//3 (2^(x+1) - 1) == 1
function strangeCounter(t: number) {
    let div = Math.floor((t + 3) / 3);
    let remainder = (t + 3) % 3;
    //return [Math.log2(div), remainder];
    //let remainder = t % 3 - 1;
    //return div;
    //return 3 * Math.pow(2, div) - remainder;
}
//console.log(strangeCounter(4));


//11. grading Students 
function gradingStudents(grades: number[]) {
    return grades.map(x => {
        if(x < 38) return x;
        else return (x % 5 > 2)? (Math.floor(x/5) + 1) * 5 : x;
    });
}
//console.log(gradingStudents([73, 67, 38, 33]));


//12. Complete the kangaroo function below.
function kangaroo(x1: number, v1: number, x2: number, v2: number) {
    if(v2 >= v1) return "NO";
    else {
        while(x1 < x2){
            //let the kangaroos jump
            x1 += v1;
            x2 += v2;
            if(x1 == x2) return "YES";
        }
        return "NO";
    }
}
//console.log(kangaroo(0, 3, 4, 2));

//13. Complete the breakingRecords function below.
function breakingRecords(scores: number[]) {
    let bestScopeIncreaseCount = 0;
    let worstScoreDecreaseCount = 0;
    let bestScore = scores[0];
    let worstScore = scores[0];

    scores.forEach(s => {
        if(s > bestScore) {
            bestScopeIncreaseCount++;
            bestScore = s;
        }
        if(s < worstScore){
            worstScoreDecreaseCount++;
            worstScore = s;
        }
    });
    return [bestScopeIncreaseCount, worstScoreDecreaseCount];
}
//console.log(breakingRecords([10, 5, 20, 20, 4, 5, 2, 25, 1]));
//console.log(breakingRecords([3, 4, 21, 36, 10, 28, 35, 5, 24, 42]))


//14. Complete the divisibleSumPairs function below.
function divisibleSumPairs(n: number, k: number, ar: number[]) {
    let count = 0;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            //console.log(ar[i], ar[j], ar[i] + ar[j]);
            if((ar[i] + ar[j]) % k == 0){
                count++;
            }
        }
    }
    return count;
}
//console.log(divisibleSumPairs(6, 3, [1, 3, 2, 6, 1, 2]));

//15. Complete the migratoryBirds function below. //TODO: 
function migratoryBirds(arr: number[]) {
    // let m = new Map();
    
    // arr.forEach(a => {
    //     if(m.has(a))
    //         m.set(a, m.get(a) + 1);
    //     else
    //         m.set(a, 1)
    // });

    // let maxKey = 0;
    // let maxValue = 0;
    // m.forEach((value, key) => {
    //     if(value > maxValue){   
    //         maxValue = value;
    //         maxKey = key;
    //     }
    // });

    // return maxKey;
}
//console.log(migratoryBirds([1,1,2,3,2,2]));


//16.  Complete the dayOfProgrammer function below.
function dayOfProgrammer(year: number) {
    //if(year == 1800) return "12.09." + year; 
    let isLeapYear = year % 400 == 0 || (year % 4 == 0 && year % 100 !== 0) ? true : false;
    if(isLeapYear) return "12.09." + year;
    else return "13.09." + year; 
}
//console.log(1800 % 400 == 0 || (1800 % 4 == 0 && 1800 % 100 != 0) ? true : false);


//17. Complete the bonAppetit function below.
function bonAppetit(bill: number[], k: number, b: number){
    let bActual = (util.sum(bill) - bill[k])/2;
    if(bActual == b)
        console.log("Bon Appetit");
    else
        console.log(b - bActual);
}



//18. Complete the sockMerchant function below.
function sockMerchant(n: number, ar: number[]) {
    var map = util.groupBy(ar);
    
}


console.log(util.groupBy([10, 20, 20, 10, 10, 30, 50, 10, 20]));
