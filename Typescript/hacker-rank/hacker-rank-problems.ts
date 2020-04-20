//1st sum of elements
let as = [5, 6, 7]
let res = as.reduce((a, b) => a+b);
//console.log(res);


//2nd compare triplets
let bs = [3, 6, 10];
function compareTriplets(a: number[], b: number[]): number[] {
    let res = a.map((x, i) => x - b[i]);
    let score1 = res.filter(x => x > 0).length;
    let score2 = res.filter(x => x < 0).length;
    return [score1, score2];
}
//console.log(compareTriplets(as, bs));


//3rd very big sum
function aVeryBigSum(ar: number[]) {
    let result: string = "";
    return aVeryBigSumUtil(ar, "", 0);

    function aVeryBigSumUtil(ar: number[], result: string, remaining: number): string {
        // console.log(`ar: ${ar} -- result: ${result}  -- remaining: ${remaining}`);
        if(ar.filter(x => x > 0).length > 0){
            let res = ar.map(a => a % 10).reduce((x, y) => x + y) + remaining;
            return aVeryBigSumUtil(ar.map(a => Math.floor(a /10)), (res % 10) + result, Math.floor(res / 10));
        }else {
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
    let positiveFraction: string = ""+Math.round(arr.filter(x => x > 0).length * c/ total)/c;
    let zeroFraction: string = ""+Math.round(arr.filter(x => x == 0).length * c/ total)/c;
    let negativeFraction: string = ""+Math.round(arr.filter(x => x < 0).length * c/ total)/c;

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
plusMinus([-4, 3, -9, 0, 4, 1]);
