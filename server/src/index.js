import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PORT } from '../constants/index.constants.js';
import { DB_URL } from '../constants/index.constants.js';
import todoRouter from '../routers/todo.routes.js';
import 'dotenv/config';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json());

app.use(todoRouter);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on Port - ${PORT}`)
})

console.log(DB_URL);
mongoose.connect(DB_URL)
    .then(() => {
        console.log("connected to db...")
    })
    .catch(() => {
        console.log("connection failed...")
    })
