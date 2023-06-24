const url = require('url');

const url1= new URL('https://hacked.com/asd?id=122&status=active');

// console.log(url1.href);
// console.log(url1.toString());

//Host
console.log(url1.host);
console.log(url1.hostname); //not contain port no.


//path
console.log(url1.pathname);

//serialized query
console.log(url1.search);

//Param object
console.log(url1.searchParams);

//add param
url1.searchParams.append('new','hacked');
console.log((url1.searchParams));

//loop through param
url1.searchParams.forEach((value,name)=>{
    console.log(`${name}:${value}`);
});