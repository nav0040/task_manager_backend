const mongoose = require('mongoose');


exports.connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected : ${conn.connection.host}`);
        
    } catch (error) {
        console.log("Error connection to MongoDB: ",error.message);
        process.exit(1);
        
    }
}