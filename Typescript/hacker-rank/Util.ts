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
}