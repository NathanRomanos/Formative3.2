const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const User = require('./models/user.js'); //this refers to the structure for user ojects
const Item = require('./models/item.js'); //this refers to the structure for product ojects

const port = 3000; //set server port

//connect to db

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/formative3-2db?retryWrites=true&w=majority`; //set what mongoDb to look at (set which collection with word after mongodeb.net/)
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true}) // connect to above
.then(()=> console.log('DB connected!')) //success message
.catch(err =>{ //error catch
  console.log(`DBConnectionError: ${err.message}`); //error message
});

//test the connectivity
const db = mongoose.connection; // checks for connection
db.on('error', console.error.bind(console, 'connection error:')); //error message
db.once('open', function() { // on open do this once
  console.log('We are connected to mongo db'); // success message
});

//sets request format??
app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url}`); //missed this bit but keep it
  next();//include this to go to the next middleware
});

//including body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); // for creating encrypted passwords
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!')) //prints message on load

// sign up
app.post('/signUp', (req,res)=>{ // this is for create
  User.findOne({username:req.body.username},(err,userResult)=>{   //checking if user is found in the db already
    if (userResult){
      res.send('username already exists. Please try another one');
    } else{
       const hash = bcryptjs.hashSync(req.body.password); //hash the password
       const user = new User({
         _id : new mongoose.Types.ObjectId,
         username : req.body.username,
         email : req.body.email,
         password :hash,
         admin : req.body.admin,
       });
       //save to database and notify the user accordingly
       user.save().then(result =>{
         res.send(result);
       }).catch(err => res.send(err));
    } // end else
  }) // end user.findone
}); //end user

// log in 

// log in 
app.post('/loginUser', (req,res)=>{
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (userResult){
      if (bcryptjs.compareSync(req.body.password, userResult.password)){
        res.send(userResult);
      } else {
        res.send('not authorized');
      }//inner if
    } else {
       res.send('user not found. Please register');
    }//outer if
  });//findOne
});//post

// log out

// view all

// edit/update

// delete


//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Mongodb app listening on port ${port}!`))
