#! /bin/sh

cd $(dirname $0)
BASE=$(pwd)
echo $BASE

projects=(huatian-domain huatian-rest huatian-service huatian-utils)


for project in ${projects[@]}
do
  echo "tsc $project"
  cd $BASE/packages/$project
  tsc 
done
