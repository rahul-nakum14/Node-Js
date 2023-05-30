const http = require('http')
const fs = require('fs')
const _ = require('lodash');
const { log } = require('console');


const server = http.createServer((req,res)=>{
    console.log('request has been made');
    // console.log(req.method);
    // console.log(req.url);
    // console.log(req.headers);

    res.setHeader('Content-type','text/html');
    // res.write('<h1>dsfsd</h1>');
    // res.end();
    let path = './views'

    let num=_.random(0,20);

    let greet= _.once(()=>{
        console.log('hello');
    });

    greet();
    greet();
    console.log(num);
    switch(req.url){
        case '/':
            path+='/index.html'
            res.statusCode=200;
            break;
        case '/about':
            path+='/about.html'
            res.statusCode=200;
            break;
        case '/about-asdasdasd':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path+='/404.html'
            res.statusCode=404;
            break;
    };
    fs.readFile(path,(err,filedata)=>{
        if(err){
            console.log(err);
        }
        else{
            // res.write(filedata);
            res.end(filedata);
        }
    });
});

server.listen(3000,'localhost',()=>{
    console.log('server listined');
});