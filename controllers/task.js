import Task from '../models/Task.js'
import createError from '../utils/createError.js'

export const createTask = async (req,res,next) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            status: req.body.status,
            user: req.user.id
        })

        const savedTask = await newTask.save(newTask);
        return res.status(201).json(savedTask);
    } catch (error) {
        return next(error);
    }
}

export const getAllTasks = async (req,res,next) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    } catch (error) {
        return next(error);
    }
}

export const getCurrentUserTasks = async (req,res,next) => {
    try {
        const tasks = await Task.find({user: req.user.id});
        return res.status(200).json(tasks);
    } catch (error) {
        return next(error);
    }
}

export const updateTask = async (req,res,next) => {
    try {

        const task = await Task.findById(req.params.taskID).exec();
        
        if(!task){
            return next(createError({status: 404, message: 'Task not found'}));
        }

        if(task.user.toString()!== req.user.id){
            return next(createError({status: 401, message: 'Unauthorized'}));
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.taskID, {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            status: req.body.status
        }, {new: true});

        return res.status(200).json(updatedTask);
    } catch (error) {
        return next(error);
    }
}

export const deleteTask = async (req,res,next) => {
    try {
        const task = await Task.findById(req.params.taskID).exec();
        
        if(!task){
            return next(createError({status: 404, message: 'Task not found'}));
        }

        if(task.user.toString()!== req.user.id){
            return next(createError({status: 401, message: 'Unauthorized'}));
        }

        await Task.findByIdAndDelete(req.params.taskID);

        return res.json('Task deleted successfully');

    } catch (error) {
        next(error);
    }
};