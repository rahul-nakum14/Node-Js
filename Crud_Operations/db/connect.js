const mongoose = require('mongoose');

const connectionDb = async() =>{

    try{
        var url = 'mongodb+srv://hanonymous371:A6s35aWYckJi7BbH@cluster0.qdzm9g4.mongodb.net/'
        await mongoose.connect(url,{
            dbName: 'Moon_Technolabs',
        });
       
        mongoose.connection.once('open',()=>{
            console.log('Connected to MongoDB');
        })
        mongoose.connection.on('error', (error) => {
            console.error('Database connection error:', error);
        });
    }catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
   
}

module.exports = { connectionDb };