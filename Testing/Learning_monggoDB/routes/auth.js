const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const Member = require('./models/Member');
mongoose.connect(
  "mongodb://127.0.0.1:27017/MongoDB",
  {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", () =>{
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const member = require('./models/Member')
const router = express.Router();

router.get('/login', async (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('pages/login', { layout: false });
  }
});

router.post('/login', async (req, res) => {
  // get user input
  const username = req.body.username;
  const password = req.body.password;
  
  member.find({"username": username, "password": password}).exec((error, data) => {
    if (error) console.log(JSON.stringify(error));
    if (data){
      console.log("Find: " + JSON.stringify(data));
      req.session.user = username;
      res.redirect('/');
    }
  });
});

router.get('/register', async (req, res) => {
  res.render('pages/register', { layout: false });
});

router.post('/register', async(req, res)=>{
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  var member_insert = new member({
    name: name,
    username: username,
    password: password
  });

  member_insert.save((err, product) =>{
    if (err) console.log(err);
    console.log(JSON.stringify(product));
    res.redirect('/auth/login');
  });
});

router.get('/logout', async (req, res) => {
  // destroy all session
  req.session.destroy();

  // redirect to login
  res.redirect('/auth/login');
});

module.exports = router;