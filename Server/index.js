// imports
let express = require('express');
let cors = require('cors')

//import {Users} from './users';
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
let app = express();
const path = require('path');
app.use(cors());

// using the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connection to mongoDB Cloud.
mongoose.connect('mongodb+srv://david:admin@profprac.vgaki.mongodb.net/Users?retryWrites=true&w=majority', { useNewUrlParser: true });

// user schema
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    fName: String,
    sName: String,
    age: Number,
    preferedExercise: String,
});

//

// var for schema to be used
var User = mongoose.model('user', UserSchema);

// connection to mongoose and the port the server is running on 
const connection = mongoose.connection;
const port = 3000;

//opening the the connection to db
connection.once('open', () => {
    console.log("Mongo Db has been connected");
});

// Ionic
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/app/home/home.page.html'));
    //res.render('../src/app/home/home.page.html')
});
//getting the users back from the db
app.get('/user', (req, res) => {
    User.find({}, (err, users) => {
        res.send(users);
    })
});

//posting users to the database
app.post('/user', (req, res) => {
    // creating the instance of the user
    let user = new User();
    //setting the data that is entered to the database
    // need to pass the login data to this data and store in the database.
    user.fName = req.body.fName;
    user.sName = req.body.sName;
    user.age = req.body.age;
    //make the radio pass the string of what is clicked.
    user.preferedExercise = req.body.preferExe;
    //saving to the DB, with the .save() method from mongoose import
    user.save()
        .then(item => {
            res.send("Saved to database");
        }).catch(err => {
            res.status(400).send("unable to save to database");
        });// end of anon function
});


// app.put('/feed', (req, res) => {

// });

// opening the port for 3000
app.listen(port, () => {
    console.log("Listening on port 3000...");
});