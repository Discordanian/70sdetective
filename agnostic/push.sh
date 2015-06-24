#!/bin/sh


if [ -f /Users/kurtschwind/src ]
then
	echo "Mac Laptop Directory"
	cd ~/src/70sdetective/agnostic/
fi

if [ -f /home/n620911/src/70sdetective/push.sh ]
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
	scp -rv . kurtschwind@speyburn.dreamhost.com:/home/kurtschwind/70sdetective.com/agnostic
fi
