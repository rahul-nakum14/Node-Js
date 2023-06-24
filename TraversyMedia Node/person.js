class person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    greetings(){
        console.log(`My name is ${this.name} and age is ${this.age}`);
        console.log(__filename,__dirname);
    }
}


module.exports = person;
