const {ee,zz,t} = require('./app.js');

// console.log(ee);
// console.log(zz);
// console.log(t());

const arr = [2,3,4,5,67,8];

const result = arr.filter(checkAdult);

console.log(result);

function checkAdult(age) {
  return age >= 18;
}

// Filter to filer value from array

arr.filter((item) =>{
    console.log(item);
}
)


// '===' use to check data along with datatype While '==' only check data
var a = 10;
var x = '10';
if (a === x){
    console.log('matched');
}
else{
    console.log('not matched');
}


//app.js

var ee = 80;
var zz = 88;

module.exports.t = function  (){
    console.log('from another file app.js');
}

module.exports.ee = ee;
module.exports.zz = zz;

