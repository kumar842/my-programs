#! /bin/bash
# Clean up version 3

LOG_DIR=/var/log
ROOT_UID=0    # Only users with $UID 0 have root privileges
LINES=50      # Default number of lines saved
E_XCD=86      # Can't change directory?
E_NOTROOT=87  # Non-root exit error

# Run as root
if [ "$UID" -ne "$ROOT_UID" ]
then
  echo "Must be root to run this script"
  exit $E_NOTROOT
fi

if [ -n "$1" ]
then
  lines=$1
else
  lines=$LINES # Default, if not specified on command-line
fi

cd $LOG_DIR

if [ `pwd` != "$LOG_DIR" ] #    "$PWD"
then
  echo "Can't change to $LOG_DIR"
  exit $E_XCD
fi




echo "Hello root user, lines : $lines"


