import bcryptjs from 'bcryptjs';
import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js'

export const register = async(req, res, next) => {
    if(!req.body.username || !req.body.password || !req.body.email){
        return next(createError({status: 400, message:'Name, Email and Password required'}));
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });

        await newUser.save();

        return res.status(201).json('New user created');
    } catch (error) {
        console.log(error);
        return next(error);
    }
}
export const login = async(req, res, next) => {
    if(!req.body.email || !req.body.password){
        return next(createError({status: 400, message:'Email and Password required'}));
    }

    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return next(createError({status: 400, message:'No user found'}));
        }
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if(!isMatch){
            return next(createError({status: 400, message:'Invalid Password'}));
        }
        const payload = {
            id: user._id,
            username: user.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: '1d'
        });
        return res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({'message':'login successful'});
    }
        catch(err){
            console.log(err);
            return next(err);
        }
}

export const logout = (req, res, next) => {
    res.clearCookie('access_token');
    return res.status(200).json({'message':'logout successful'});
}

export const isLoggedIn = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.json(false);
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.json(false);
      }
      return res.json(true);
    });
  };