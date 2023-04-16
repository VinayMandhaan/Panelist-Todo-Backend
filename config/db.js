const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongodb+srv://vinay:vinay.123@cluster0.ise0a1t.mongodb.net/test')


const connectDB = async () => {
    try{
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log('MongoDB Connected')
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB