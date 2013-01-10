#!/usr/bin/perl -w

#  cat output.A |while read LINEA
#  do
#      cat output.B |while read LINEB
#      do
#          cat output.C |while read LINEC
#          do
#              cat output.D |while read LINED
#              do
#                  MALEA1=`echo $LINEA |awk '{print $1}'`
#                  MALEB1=`echo $LINEB |awk '{print $1}'`
#                  FMALC1=`echo $LINEC |awk '{print $1}'`
#                  FMALD1=`echo $LINED |awk '{print $1}'`
#                  MALEA2=`echo $LINEA |awk '{print $2}'`
#                  MALEB2=`echo $LINEB |awk '{print $2}'`
#                  FMALC2=`echo $LINEC |awk '{print $2}'`
#                  FMALD2=`echo $LINED |awk '{print $2}'`
#                  MALEA3=`echo $LINEA |awk '{print $3}'`
#                  MALEB3=`echo $LINEB |awk '{print $3}'`
#                  FMALC3=`echo $LINEC |awk '{print $3}'`
#                  FMALD3=`echo $LINED |awk '{print $3}'`
#                  MALEA4=`echo $LINEA |awk '{print $4}'`
#                  MALEB4=`echo $LINEB |awk '{print $4}'`
#                  FMALC4=`echo $LINEC |awk '{print $4}'`
#                  FMALD4=`echo $LINED |awk '{print $4}'`
#                  MALEA5=`echo $LINEA |awk '{print $5}'`
#                  MALEB5=`echo $LINEB |awk '{print $5}'`
#                  FMALC5=`echo $LINEC |awk '{print $5}'`
#                  FMALD5=`echo $LINED |awk '{print $5}'`
#                  echo $MALEA1 $MALEB1 $FMALC1 $FMALD1 $MALEA2 $MALEB2 $FMALC2 $FMALD2 $MALEA3 $MALEB3 $FMALC3 $FMALD3 $MALEA4 $MALEB4 $FMALC4 $FMALD4 $MALEA5 $MALEB5 $FMALC5 $FMALD5
#              done
#          done
#      done
#  done

my $input_file = "output.A";
open INPUT_FILE, "<$input_file"  || die "Can't open $input_file: $!\n";


my @arrayA;
while (<INPUT_FILE>) {
  push(@arrayA, $_);
}

$input_file = "output.B";
open INPUT_FILE, "<$input_file"  || die "Can't open $input_file: $!\n";

my @arrayB;
while (<INPUT_FILE>) {
  push(@arrayB, $_);
}

$input_file = "output.C";
open INPUT_FILE, "<$input_file"  || die "Can't open $input_file: $!\n";
my @arrayC;
while (<INPUT_FILE>) {
  push(@arrayC, $_);
}

$input_file = "output.D";
open INPUT_FILE, "<$input_file"  || die "Can't open $input_file: $!\n";
my @arrayD;
while (<INPUT_FILE>) {
  push(@arrayD, $_);
}

foreach(@arrayA) {
    my $lineA = $_;
    foreach(@arrayB) {
        my $lineB = $_;
        foreach(@arrayC) {
            my $lineC = $_;
            foreach(@arrayD) {
                my $lineD = $_;
                my ($malea1, $malea2, $malea3, $malea4, $malea5) = split(' ',$lineA);
                my ($maleb1, $maleb2, $maleb3, $maleb4, $maleb5) = split(' ',$lineB);
                my ($fmalc1, $fmalc2, $fmalc3, $fmalc4, $fmalc5) = split(' ',$lineC);
                my ($fmald1, $fmald2, $fmald3, $fmald4, $fmald5) = split(' ',$lineD);
#                  echo $MALEA1 $MALEB1 $FMALC1 $FMALD1 $MALEA2 $MALEB2 $FMALC2 $FMALD2 $MALEA3 $MALEB3 $FMALC3 $FMALD3 $MALEA4 $MALEB4 $FMALC4 $FMALD4 $MALEA5 $MALEB5 $FMALC5 $FMALD5
                print "$malea1 $maleb1 $fmalc1 $fmald1 $malea2 $maleb2 $fmalc2 $fmald2 $malea3 $maleb3 $fmalc3 $fmald3 $malea4 $maleb4 $fmalc4 $fmald4 $malea5 $maleb5 $fmalc5 $fmald5\n";
                
            }
        }
    }
}

