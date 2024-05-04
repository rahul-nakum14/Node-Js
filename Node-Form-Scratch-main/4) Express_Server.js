const express = require('express');
const app = express();

app.listen(5000);

app.get('/',(req,res)=>{
    res.status(200).send('<h1>helo world</h1>');
});

app.get('/about',(req,res)=>{
   res.sendFile('./views/about.html',{root:__dirname});
});

app.get('/about-us',(req,res)=>{
    res.redirect('about');
});

//app.use() middleware function this function works and works when 
// it call so it should be at end like default function

app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
})