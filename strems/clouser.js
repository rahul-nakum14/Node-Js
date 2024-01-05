setTimeout(function (){
    console.log('timer');
},4000);

function x(y) {
    console.log('x called');
    y();
}
x(function y(){
    console.log('y called');
});

// var b = function (abc){
//     console.log(abc());
//     console.log('helo world');
// }
// function xyzzz(){
//     console.log('assssssss');
// }
// console.log(b(xyzzz));

// const express = require('express');
// const app = express();

// function x(){
    
//         for(var i= 0; i<=5;i++){
//             function clouser(x){
//                 setTimeout(function (){
//                 console.log(x);
//                 }, x * 1000)   
//            }
//            clouser(i)
//         }
   
// }

// x();

// app.listen(3000);