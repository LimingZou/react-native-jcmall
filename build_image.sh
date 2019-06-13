#!/bin/bash
cd ./resources/
function syncImage(){
    cat /dev/null > ../src/constraint/Image.js
    echo "/**********************************************/" >> ../src/constraint/Image.js
    echo "/* 此处文件由脚本 build_image.sh 生成,请勿手动更改*/">> ../src/constraint/Image.js
    echo "/**********************************************/">> ../src/constraint/Image.js
    for element in `ls`
    do
        if [ -f $element ]
        then
            echo "export const ${element%.*} = require('../../resources/$element');" >> ../src/constraint/Image.js
        fi
    done
    echo '所有图片都已经写入Image.js'
}

syncImage()

