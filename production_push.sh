#!/bin/sh


cd ..
cd 70s_release
# svn --username kurtschwind export http://70sdetective.com/edetect 70s_release
scp -r * kurtschwind@70sdetective.com:70sdetective.com/ 
ssh kurtschwind@70sdetective.com "cd 70sdetective.com;unzip resources/support/ext*zip"
echo "Application Deployed"
