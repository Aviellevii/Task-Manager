import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import ListRouter from './routers/list.router'
import UserRouter from './routers/user.router'

const bodyParser = require('body-parser')

import { dbConnect } from './config/database.config';
dbConnect();


const app = express();
app.use(bodyParser.json())

app.use(cors());

app.use('/api/list',ListRouter);
app.use('/api/user',UserRouter);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listen on ${port}`);
})