const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');


dotenv.config();
const { connectDB } = require('./db/connectDB');


const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'https://task-manager-new-murex.vercel.app',
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));




const PORT = process.env.PORT || 5000;



app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/tasks',taskRoutes);





app.listen(PORT,()=>{
    connectDB();
    console.log('Server is listening on port 5000');
    
})