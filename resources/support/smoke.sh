#!/bin/sh

cat output.A |while read LINEA
do
    cat output.B |while read LINEB
    do
        cat output.C |while read LINEC
        do
            cat output.D |while read LINED
            do
                MALEA1=`echo $LINEA |awk '{print $1}'`
                MALEB1=`echo $LINEB |awk '{print $1}'`
                FMALC1=`echo $LINEC |awk '{print $1}'`
                FMALD1=`echo $LINED |awk '{print $1}'`
                MALEA2=`echo $LINEA |awk '{print $2}'`
                MALEB2=`echo $LINEB |awk '{print $2}'`
                FMALC2=`echo $LINEC |awk '{print $2}'`
                FMALD2=`echo $LINED |awk '{print $2}'`
                MALEA3=`echo $LINEA |awk '{print $3}'`
                MALEB3=`echo $LINEB |awk '{print $3}'`
                FMALC3=`echo $LINEC |awk '{print $3}'`
                FMALD3=`echo $LINED |awk '{print $3}'`
                MALEA4=`echo $LINEA |awk '{print $4}'`
                MALEB4=`echo $LINEB |awk '{print $4}'`
                FMALC4=`echo $LINEC |awk '{print $4}'`
                FMALD4=`echo $LINED |awk '{print $4}'`
                MALEA5=`echo $LINEA |awk '{print $5}'`
                MALEB5=`echo $LINEB |awk '{print $5}'`
                FMALC5=`echo $LINEC |awk '{print $5}'`
                FMALD5=`echo $LINED |awk '{print $5}'`
                echo $MALEA1 $MALEB1 $FMALC1 $FMALD1 $MALEA2 $MALEB2 $FMALC2 $FMALD2 $MALEA3 $MALEB3 $FMALC3 $FMALD3 $MALEA4 $MALEB4 $FMALC4 $FMALD4 $MALEA5 $MALEB5 $FMALC5 $FMALD5
            done
        done
    done
done
