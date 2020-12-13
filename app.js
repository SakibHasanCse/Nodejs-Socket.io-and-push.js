import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import User from './model/user'
const app = express()
import expressLayout from 'express-ejs-layouts'
const dburl = 'mongodb://localhost:27017/testappbook'


// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(expressLayout)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan('dev'));
app.use(cors())
var server = require('http').Server(app);
var io = require('socket.io')(server)

io.on('connection', function (socket) {
    socket.emit('pushNotification', { success: true, msg: 'hello' });
});
app.get('/', async (req, res) => {

           res.render('index');
     
});


app.get('/ragister', async (req, res) => {

    await User.find({}, (err, users) => {
        if (err || !users) {
            console.log(err);
        }
        else {
            res.render('login', { users: users });
        }
    })

});


const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

function saveImage(user, imgEncoded) {
    // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
    if (imgEncoded == null) return;
    console.log(imgEncoded)
    // ENCODING IMAGE BY JSON PARSE
    // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
    const img = JSON.parse(imgEncoded);
    

    // CHECKING FOR JSON ENCODED IMAGE NOT NULL 
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
    // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
    if (img != null && imageMimeTypes.includes(img.type)) {

        // https://nodejs.org/api/buffer.html
        // The Buffer class in Node.js is designed to handle raw binary data. 
        // SETTING IMAGE AS BINARY DATA
        user.image = new Buffer.from(img.data, "base64");
        user.imgType = img.type;
    }
}


app.post('/ragister' , async (req, res) => {
    try {


        const { name, email, password, profileimage} = req.body

        const user = new User({
            name ,email ,password 
        });
    

        saveImage(user, profileimage); 
        try {
            const newMovie = await user.save();
            console.log(newMovie);
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
     
    }
    catch (error) {
        console.log(error)
        return res.status(400).send({
            upload_error: 'Error while uploading file try again later'
        });
    }
},
    (error, req, res, next) => {
        if (error) {
            console.log(error)
            return res.status(500).send({
                upload_error: error
            })
        }
    }
)




app.listen(3000, () => {

    console.log('App listening on port 3000!');
    mongoose.connect(dburl, { useCreateIndex: true }).then(() => {
        console.log('Database Connection established');

    }).catch((err) => {
        console.log(err.message);

    })
});