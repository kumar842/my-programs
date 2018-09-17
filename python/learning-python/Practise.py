class Practise:

    def min(self, ls):
        min = ls[0]
        for l in ls:
            if l < min:
                min = l
        return min

    def max(self, ls):
        max = ls[0]
        for l in ls:
            if l > max:
                max = l
        return max

if __name__ == '__main__':
    mypractise = Practise()
    ls = [1,2,4,0,6,2]
    print('min value: ', mypractise.min(ls))
    print('max value: ', mypractise.max(ls))