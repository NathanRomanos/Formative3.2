const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const User = require('./models/user.js'); //this refers to the structure for user ojects
const Item = require('./models/item.js'); //this refers to the structure for product ojects

const port = 8080; //set server port

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
         password :hash
       });
       //save to database and notify the user accordingly
       user.save().then(result =>{
         res.send(result);
       }).catch(err => res.send(err));
    } // end else
  }) // end user.findone
}); //end user

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

// display users
app.get('/viewUser', (req, res)=> {
  User.find().then(result => {
    res.send(result);
  });
});

// edit/update user
app.get('/displayUsers', (req,res)=>{ //create request to show all products within Product
  User.find().then(result =>{ // finds Product db
  res.send(result); //print result
  })
});

//display user by id
app.get('/displayUser/p=:id', (req,res)=>{ //create request to search products by id
  const idParam = req.param.id; //set new reference idParam from last forward slash in request
  for (let i = 0; i < user.length; i++){ // run loop through db
  if (idParam.toString() === user[i]._id.toString()) { //if match is found do this
    res.json(user[i]); //print found project
    }
  }
});


// delete user
app.delete('/removeUser/:id', (req,res)=>{ //create request to delete a product
  const idParam = req.params.id; //set new reference idParam from last forward slash in request
  const user = req.params.userId;
    User.findOne({_id:idParam},(err, productResult)=>{ //search Product db for id
    if (productResult) { //do this if present
      User.findOne({userId:user},(err,userResult2)=>{
          if (userResult2){
            User.deleteOne({_id:idParam},err=>{ //delete match
              res.send('deleted user'); //confirm message
            });
          } else {
            res.send('wrong user');
          }
      });

    } else { //if not found do this
      res.send('not found') //no match message
    }
  }).catch(err => res.send(err)); //error e=message
});

// log out (happens in front end js)

// view all item
app.get('/viewItem', (req, res)=> {
  Item.find().then(result => {
    res.send(result);
  });
});


//add item
app.post('/addItem', (req,res)=> {
 // checking if item is found in the db already
  Item.findOne({name:req.body.name},(err, itemResult)=> {
    if (itemResult){
      res.send('Item is already in database. Please try again!');
    } else {
      const addItem = new Item({
        _id : new mongoose.Types.ObjectId,
        name : req.body.name,
        imgUrl : req.body.imgUrl,
        author : req.body.author,
        description : req.body.description,
        link : req.body.link,
        user_id : req.body.user_id
      });
      //save to database and notify the user accordingly
      addItem.save().then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    }
  })
});


// view items by user
app.get('/viewItem/:id', (req, res)=> {
  const idParam = req.params.user_id;
  Item.findById(idParam).then(result => {
    res.send(result);
  }).catch(err => res.send(err));
}); // DIDN'T WORK WILL TRY AGAIN WITH ROY


// edit/update item
app.patch('/updateItem/:id',(req,res)=> {
  const idParam = req.params.id;
  Item.findById(idParam,(err,item)=> {
    const updatedItem = {
      name:req.body.name,
      imgUrl : req.body.imgUrl,
      author : req.body.author,
      description : req.body.description,
      link : req.body.link
    };
    Item.updateOne({_id:idParam}, updatedItem).then(result => {
      res.send(result);
    }).catch(err => res.send(err));
  }).catch(err => res.send('not found'));
});

// delete item
app.delete('/deleteItem/:id',(req,res) => {
  const idParam = req.params.id;
  Item.findOne({_id:idParam}, (err, item) => { //_id refers to mongodb
    if (item) {
      Item.deleteOne({_id:idParam}, err => {
        res.send('deleted');
      });
    } else {
      res.send('not found');
    }
  }).catch(err => res.send(err));
});

// edit/update user
app.patch('/updateUser/:id',(req,res)=> {
  const idParam = req.params.id;
  User.findById(idParam,(err,item)=> {
    const hash = bcryptjs.hashSync(req.body.password); //hash the password
    const updatedUser = {
      username:req.body.username,
      email : req.body.email,
      password : hash

    };
    User.updateOne({_id:idParam}, updatedUser).then(result => {
      res.send(result);
    }).catch(err => res.send(err));
  }).catch(err => res.send('not found'));
});

//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Mongodb app listening on port ${port}!`))
