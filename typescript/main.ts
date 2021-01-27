//1st
let as = [5, 6, 7]
let res = as.reduce((a, b) => a+b);
//console.log(res);

//2nd
let bs = [3, 6, 10];
function compareTriplets(a: number[], b: number[]): number[] {
    let res = a.map((x, i) => x - b[i]);
    let score1 = res.filter(x => x > 0).length;
    let score2 = res.filter(x => x < 0).length;
    return [score1, score2];
}
//console.log(compareTriplets(as, bs));

//3rd
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