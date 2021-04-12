// imports
let express = require('express');
let cors = require('cors')
//import {Users} from './users';
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
let app = express();
const path = require('path');

// using the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connection to mongoDB Cloud.
mongoose.connect('mongodb+srv://david:admin@profprac.vgaki.mongodb.net/Users?retryWrites=true&w=majority', { useNewUrlParser: true });

let Schema = mongoose.Schema;

// creating the basic schema, will update 
let UserSchema = new Schema({
    fName: String,
    sName: String,
    age: Number,
    preferedExercise: String,
});
// var for schema to be used
var User = mongoose.model('user', UserSchema);

const connection = mongoose.connection;
const port = 3000;

//opening the the connection to db
connection.once('open', () => {
    console.log("Mongo Db has been connected");
});

// Ionic
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/app/home/home.page.html'));
});

// Users Component
app.get('/users', (req, res) => {
   res.sendFile(path.join(__dirname, '../src/Components/users/users.component.html'));
});

// //login Component
// app.get('/login', (req,res)=>{
//     res.sendFile(path.join(__dirname, '../src/Components/login-page/login-page.component.html'));
// });

//getting the users back from the db
app.get('/user', (req,res)=>{
    User.find({}, (err,users)=>{
        res.send(users);
    })
});

//posting users to the database
app.post('/user', (req,res)=>{
   // creating the instance of the user
   let user = new User();
   //setting the data that is entered to the database
   user.fName = req.body.fName;
   user.sName = req.body.sName;
   user.age = req.body.age;
   user.preferedExercise = req.body.preferExe;
   //savinf to the DB
   user.save()
   .then(item =>{
    res.send("Saved to database" );
   }).catch(err=>{
    res.status(400).send("unable to save to database");
   });// end of anon function
});

// opening the port for 3000
app.listen(port, () => {
    console.log("Listening on port 3000...");
});