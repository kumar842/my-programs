#! /bin/bash

read -p "Enter y or n: " ANSWER

case "$ANSWER" in 
		[yY]|[yY][eE][sS])
				echo "you answred yes"
				;;
		[nN]|[nN][oO])
				echo "you answered no"
				;;
		*)
				echo "Invali answer"; exit 1
				;;
esac

