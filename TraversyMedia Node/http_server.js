const http =  require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req,res)=>{
    if (req.url === '/'){
       
        fs.readFile(path.join(__dirname,'public','home.html'),(err,content)=>{
            //  res.setHeader('Content-Type','text/html')
            if (err) throw err;
            res.end(content);
        })
    }

    if (req.url === '/index'){

        fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>{
            if (err) throw err;
            // res.setHeader('Content-Type','text/html')

            res.end(content);
        })
    }
});

server.listen(5000,()=>
    console.log('server created')
);