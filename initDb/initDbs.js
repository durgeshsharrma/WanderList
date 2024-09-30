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
     await resort.insertMany(ResortData.data);
     console.log('inserted successfully');
     await resort.find({});
}