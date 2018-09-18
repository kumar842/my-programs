from functools import reduce
from math import ceil


def min(ls):
    return None if not ls else reduce(lambda x,y: x if x < y else y, ls)


def max(ls):
    return None if not ls else reduce(lambda x,y: x if x > y else y, ls)


def len(ls):
    return 0 if not ls else reduce(lambda a,b: a+1, ls) - ls[0] +1


def sum(ls):
    return 0 if not ls else reduce(lambda a,b: a+b, ls)


def sort(ls):
    pass


def abs(e: int):
    return e if e >= 0 else -e


def pow(x,y):
    return x ** y


def is_integral(n):
    return ceil(n) == n


def factorial(n):
    if n < 0:
        raise ValueError("factorial() not defined for negative values")
    elif not is_integral(n):
        raise ValueError("factorial() not defined for float values")
    elif n == 0 or n == 1:
        return n
    else:
        return n * factorial(n-1)


memo = {}


def fib(n):
    if n < 0:
        raise ValueError("factorial() not defined for negative values")
    elif not is_integral(n):
        raise ValueError("factorial() not defined for float values")
    elif n in memo:
        return memo[n]
    elif n == 0 or n == 1:
        memo[n] = n
        return n
    else:
        fibn = fib(n - 1) + fib(n - 2)
        memo[n] = fibn
        return fibn

def n3(n):
    if n == 0:
        return 0
    else:
        return 3 + n3(n-1)

def sum_n(n):
    if n == 0:
        return 0
    else:
        return n + sum_n(n-1)



if __name__ == '__main__':
    ls = [-100, 0 , 23]
    print(list(map(lambda x: x*x, ls)))
    print('min value: ', min(ls))
    print('max value: ', max(ls))
    print('length : ', len(ls))
    print('sum : ', sum(ls))
    print('absolute value : ', abs(-100))
    print('3 power 2 : ', pow(3,2))
    # print('factorial of -1', factorial(-1))
    print('factorial of 10', factorial(10))
    print('factorial of 4.0', factorial(4.0))
    #print('factorial of 4.5', factorial(4.5))
    print('fib(0)', fib(0))
    print('fib(1)', fib(1))
    print('fib(100)', fib(100))
    print('n3(0)', n3(0))
    print('n3(1)', n3(1))
    print('n3(100)', n3(100))
    print('sum_n(0)', sum_n(0))
    print('sum_n(1)', sum_n(1))
    print('sum_n(100)', sum_n(100))


