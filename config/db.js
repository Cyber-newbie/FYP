const mongoose = require('mongoose')
const connectDB = async () => {
    mongoose.set('debug', true);
    try {
        const conn = await mongoose.connect('mongodb+srv://hasan:hasan@cluster0.m8gisp0.mongodb.net/cancer-sense');
        console.log('database connected ######: ')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB