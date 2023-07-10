import Task from '../models/Task.js'
import createError from '../utils/createError.js'

export const all = async(req, res, next) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    } catch (error) {
        return next(error);
    }
}