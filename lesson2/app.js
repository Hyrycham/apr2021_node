const express =require('express');


const app= express();
app.get('/',(req,res)=>{
console.log(req);



res.send('<h1> qqqqqqqqqqqqqqqqqqqqqQQQQQQQQ</h1>');
    // res.end('qqqqqqqqqqqqq');
});

app.listen(5000,()=>{
    console.log('listen 5000')
})

