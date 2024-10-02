const resort = require('../models/resort');
const mongoose = require('mongoose');
const ResortData = require('./data');



connection().then(() => {
    console.log('connection successful');
})

async function connection(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderList');
}



initDb();

async function initDb(){
     await resort.deleteMany({});
    
     ResortData.data = ResortData.data.map((obj) => ({...obj , owner : '66fc3c5bf76f27ef24ee7814'}))
     
     await resort.insertMany(ResortData.data);
     console.log('inserted successfully');
     await resort.find({});
}