import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
const app = express()
import path from 'path'


import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({path:'./config/config.env'})
}
   
const dburl = process.env.MONGOURL

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(cors())



import users from './router/user'
import Posts from './router/post'
import admin from './router/admin'


app.use(Posts)
app.use(users)
app.use('/app',admin)


app.listen(3000, () => {

    console.log('App listening on port 3000!');
    mongoose.connect(dburl, { useCreateIndex: true }).then(() => {
        console.log('Database Connection established');

    }).catch((err) => {
        console.log(err.message);

    })
});