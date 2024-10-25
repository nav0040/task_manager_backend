const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, assignedTo, priority } = req.body;
        const createdBy = req.user;

        const employee = await User.findById(assignedTo);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Assigned employee not found' });
        }

        const task = new Task({
            title,
            description,
            dueDate,
            assignedTo: employee,
            priority,
            createdBy,
        });

        await task.save();
        res.status(201).json({ success: true, task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


exports.getTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === 'Manager') {
            tasks = await Task.find().populate('assignedTo createdBy');
        } else if (req.user.role === 'Employee') {
            tasks = await Task.find({ assignedTo: req.user._id }).populate('assignedTo createdBy');
        }

        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


exports.getTasksByDate = async (req, res) => {


    try {
        const { date } = req.params;
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const tasks = await Task.find({
            dueDate: { $gte: startDate, $lt: endDate }
        }).populate('assignedTo createdBy');


        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.updateTaskOrder = async (req, res) => {
    try {
        const { newStatus, sourceIndex, destinationIndex } = req.body;
        const taskId = req.params.id;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        // console.log(req.body);


        if (task.status !== newStatus) {
            task.status = newStatus;
            await task.save();
        }

        const tasksInSameStatus = await Task.find({ status: newStatus }).sort({ _id: 1 });

        //    console.log(tasksInSameStatus);
        const [movedTask] = tasksInSameStatus.splice(sourceIndex, 1);
        tasksInSameStatus.splice(destinationIndex, 0, movedTask);


        // console.log(tasksInSameStatus);


        for (let i = 0; i < tasksInSameStatus.length; i++) {
            await tasksInSameStatus[i].save();
        }

        res.status(200).json({ success: true, message: 'Task status and order updated successfully' });


    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }
}


exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}