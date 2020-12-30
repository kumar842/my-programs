#! /bin/bash

# output to a file(>> append, > replace)
# echo 'Hello world' >> output.txt

# single line comment
: '
multi
line
comment
'

cat << hereDocDelimiter
#multi line comment
#visible in the output
hereDocDelimiter

# read all the lines into a file.txt, till you enter Ctrl+d
# cat >> file.txt

# conditionals
# count=1
# lt, le, gt, ge, eq, ne 
if [ $1 -lt 10 ]
then
		echo 'count is less than 10'
elif [ $1 -gt 10 ]
then
		echo 'count is greater than 10'
else
		echo 'count is equal to 10'
fi

# && || -a(and) -o(or)
#if [[ $1 -gt 1 && $1 -lt 10 ]]
if (( $1 > 1  &&  $1 < 10 ))
then
		echo 'count is b/w 1 and 10'
fi

a=1
echo 'printing loop using until - while is also similar'
#while (( $a > 5 && $a < 10 ))
until (( $a > 3 && $a < 10 ))
do
		echo $a
		a=$((a+1))
done


echo 'printing loop using for-in loop'
for i in {1..5..2}
do
		echo $i
done

echo 'printing loop using normal for loop'
for (( i = 0; i < 3; i++))
do
		echo $i
done

