const { error } = require('console');
const fs = require('fs');
const path = require('path');

//create Folder

// fs.mkdir(path.join(__dirname,'/test'),(err) => {
//     if(err) throw error;
//     console.log('Folder Created');
// });

// create write to file

// fs.writeFile(path.join(__dirname,'/test','helo.txt'),'helo world',(err) => {
//     if(err) throw error;
//     console.log('File Created');
//     fs.appendFile(path.join(__dirname,'/test','helo.txt'),'helo112313 world',(err) => {
//         if(err) throw error;
//         console.log('File Append Created');
//     });
// });

//read file
// fs.readFile(path.join(__dirname,'/test','helo.txt'),'utf8',(err,data)=>{
//     if(err) throw error;
//     console.log(data);
// })


//rename file
fs.rename(path.join(__dirname,'/test','helo.txt'),path.join(__dirname,'/test','helochanged.txt'),(err)=>{
    if(err) throw error;
    console.log('renamed');
})
