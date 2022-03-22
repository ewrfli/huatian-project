#! /bin/sh

cd $(dirname $0)
BASE=$(pwd)
echo $BASE

cd $BASE/packages/huatian-components
yarn link
cd $BASE/packages/huatian-domain
yarn link
cd $BASE/packages/huatian-rest
yarn link

cd $BASE/packages/huatian-utils
yarn link

cd $BASE/packages/huatian-components
yarn link @huatian/utils
yarn link @huatian/domain

cd $BASE/packages/huatian-app
yarn link @huatian/rest
yarn link @huatian/utils
yarn link @huatian/components

cd $BASE/packages/huatian-service
yarn link @huatian/domain

cd $BASE/packages/huatian-rest
yarn link @huatian/domain