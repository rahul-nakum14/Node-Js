const express = require('express');
const status = require('express-status-monitor');
const fs  = require('fs');

const app = express();
app.use(status());

//Event Based Approach

app.get('/',(req,res) =>{
    const readStream = fs.createReadStream('test.txt','utf-8');
    const outputStream = fs.createWriteStream('outt.txt','utf-8');
    
    readStream.on('data',(chunk) =>{
        res.end(chunk);
        outputStream.write(chunk);
    });
    readStream.on('end',(chunk) =>{
        res.end();
        outputStream.end();
    });

    readStream.on('error', (err) => {
        console.error(err);
        res.status(500).send('Something went wrong');
        fileWriteStream.end(); 
    });

})

//Pipe based approach 

app.get('/',(req,res) =>{
    const readStream = fs.createReadStream('test.txt','utf-8');
    const outputStream = fs.createWriteStream('outt.txt','utf-8');
    
    // Error handling for readStream

    readStream.on('error', (err) => {
        console.error('ReadStream Error:', err);
        res.status(500).send('Something went wrong');
        outputStream.end(); 
    });

    // Error handling for outputStream
    outputStream.on('error', (err) => {
        console.error('WriteStream Error:', err);
        res.status(500).send('Something went wrong');
    });

    readStream.pipe(res); // Send data to the response
    readStream.pipe(outputStream); // Write data to the file

})

app.listen(3000);


// const stream = fs.createReadStream('test.txt','utf-8');

// stream.on("data",(chunk) =>{
//     res.write(chunk);
// });
// stream.on('end',() =>{
//     res.end();
// })



   // fs.readFile('test.txt', (err,data) => {
    //     res.end(data);
    // })



















