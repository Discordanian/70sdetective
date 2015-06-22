#!/bin/sh


if [ -f /Users/kurtschwind ]
then
	echo "Mac Laptop Directory"
fi

if [ -f /home/n620911 ]
then
	echo "TDCSBATCHLAB detected"
	cd /home/n620911/src/70sdetective
fi

if [ "`hostname`" == "tdcsbatchlab" ]
then
	cp -rv . /var/www/html/KURT/
	echo "At work, use KURT web directory"
else
	echo "Not at work.  SCP this to DreamHost"
	# scp -rv . kurtschwind@speyburn.dreamhost.com:/home/kurtschwind/slithytoves.org/webster/
fi
