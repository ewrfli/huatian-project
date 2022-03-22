#! /bin/sh

cd $(dirname $0)
BASE=$(pwd)
echo $BASE

projects=(huatian-app huatian-components huatian-domain huatian-rest huatian-service huatian-utils)

for project in ${projects[@]}
do
  echo "install $project"
  cd $BASE/packages/$project
  npm install 
done
