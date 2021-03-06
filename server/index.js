import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
//import cors from "cors";
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
// we wanna send an images which can be large in size
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
// connect server to db

const PORT = process.env.PORT || 5001;

//
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));
