import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const PORT = process.env.PORT || 3000;
const app = express();

//middlewares

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

//Routes

app.use('/api/', allRoutes);

// Error handlers

app.use((err, req,res,next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(status).json({message, stack: err.stack});
})

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}


app.listen(PORT, function
    () {
        connectDB();
        console.log(`Server is running on port ${PORT}`);
    }
);