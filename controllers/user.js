import User from '../models/User.js'

export const getUserInfo = async (req, res, next) => {
    try {
        const data = await User.findById(req.user.id);
        return res.status(200).json(data);        
    } catch (error) {
        return next(error);
    }
}

export const updateUserInfo = async (req, res, next) => {
    try {
        const data = await User.findByIdAndUpdate(req.user.id, {
            username: req.body.username,
            email: req.body.email
        } , { new: true });
        return res.status(200).json(data);        
    } catch (error) {
        return next(error);
    }
}