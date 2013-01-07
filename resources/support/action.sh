#!/bin/sh

# mysql> describe crime;
# +----------+---------+------+-----+---------+-------+
# | Field    | Type    | Null | Key | Default | Extra |
# +----------+---------+------+-----+---------+-------+
# | killer   | int(11) | YES  |     | NULL    |       |
# | victim   | int(11) | YES  |     | NULL    |       |
# | location | int(11) | YES  |     | NULL    |       |
# | weapon   | int(11) | YES  |     | NULL    |       |
# +----------+---------+------+-----+---------+-------+



for killer in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
do
    for victim in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
    do
        for weapon in 38 45
        do
            for location in 1 2 3 4 5 6
            do
                for location38 in 1 2 3 4 5 6
                do
                    for location45 in 1 2 3 4 5 6
                    do
                        if [ $killer -ne $victim ]
                        then
                            if [ $location -ne $location38 ]
                            then
                                if [ $location -ne $location45 ]
                                then
                                    if [ $location38 -ne $location45 ]
                                    then
                                        # echo "$killer in the $location  with a $weapon on $victim"
                                        echo "insert into crime (killer, victim, location, weapon, location38, location45) values ($killer, $victim, $location, $weapon, $location38, $location45);"
                                    fi
                                fi
                            fi
                        fi
                    done
                done
            done
        done
    done
done
