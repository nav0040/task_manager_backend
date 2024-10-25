const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    dueDate: {
        type: Date,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    status:{
        type:String,
        enum:["PENDING",'TODO','IN_PROGRESS','IN_REVIEW','COMPLETED'],
        default:"PENDING",
    },
    completed:{
        type:Boolean,
        default:false,
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"low"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
      },
 
},
    { timestamps: true });


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;