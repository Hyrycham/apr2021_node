const fs = require("fs");

const writeUser= (pathToArr,arr)=>{
    fs.writeFile(pathToArr,JSON.stringify(arr),
        err => {
            console.log(err)
        });
};

module.exports=writeUser
