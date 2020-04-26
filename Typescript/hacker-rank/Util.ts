export class Util {
    min(arr: number[]) {
        return arr.reduce((x, y) => x < y ? x: y);
    }

    max(arr: number[]) {
        return arr.reduce((x, y) => x > y ? x: y);
    }

    sum(arr: number[]) {
        return arr.reduce((x, y) => x > y ? x: y);
    }

    isPositive(n: number): boolean{
        return n > 0;
    }

    isNegative(n: number): boolean{
        return n < 0;
    }

    isZero(n: number): boolean{
        return n == 0;
    }

    filteredCount<T>(arr: T[], f: (x: T) => boolean){
        return arr.filter(f).length;
    }

    groupBy<T>(arr: T[]){
        return arr.reduce((acc, e) => (acc[e+""] = (acc[e+""] || 0)+1, acc), {} );
    }
}
