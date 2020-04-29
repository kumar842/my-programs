var fact = (n) => {
    if(n < 0) return undefined;
    else if(n == 0) return 1;
    else return n * fact(n - 1);
}