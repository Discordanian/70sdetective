#!/bin/sh

    scp -rv . kurtschwind@speyburn.dreamhost.com:/home/kurtschwind/70sdetective.com/
exit

if [ -f /Users/kurtschwind/src/webster/cosc5030/CardTable/push.sh ]
then
	echo "Mac Laptop Directory"
	cd /Users/kurtschwind/src/70sdetective/
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
	scp -rv . kurtschwind@speyburn.dreamhost.com:/home/kurtschwind/70sdetective.com/
fi
