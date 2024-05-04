const http = require('http')
const fs = require('fs');

const server = http.createServer((req,res)=>{

    res.setHeader('Content-Type','text/html')
    // res.write('<h1>helo world</h1>');

    // res.end();

    let path = './views'

    switch(req.url){
        case '/':
            path+='/index.html'
            res.statusCode=200;
            break;

        case '/about-me':
            res.statusCode=302;
            res.setHeader('Location','/about');
            res.end();
            break;

        case '/about':
            path+='/about.html'
            res.statusCode=200;
            break;
            
        default:
            path+='/404.html'
            res.statusCode=404;
            break;
    };

    //Sending File
    fs.readFile(path,(err,filedata)=>{
        if(err){
            console.log('file not found');
        }
        else{
            res.write(filedata);
            res.end(); // if there is multiple res. then require res.write else res.end is ok...
        }
    })
    // console.log(req.url);
    // console.log(req.method);
});

server.listen(3000,'localhost',()=>{
    console.log('server is listening');
})


// '''Create Server Directly'''

// http.createServer((req,res)=>{
//     // console.log('server is created');
//     res.write('helo world');
//     res.end();
// }).listen(3000);