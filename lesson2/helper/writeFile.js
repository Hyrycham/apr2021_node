const fs = require("fs");

const writeUser= (pathToArr,arr)=>{
    fs.writeFile(pathToArr,`const users = ${JSON.stringify(arr)}; module.exports=users;`,
        err => {
            console.log(err)
        });
};

module.exports=writeUser
