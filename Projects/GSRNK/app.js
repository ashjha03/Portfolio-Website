const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 80;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv/config');
mongoose.connect('mongodb://localhost/contactGsrnk', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    manglik: String,
    gotra: String,
    emailID: String,
    password: String,
    gender: String,
    cast: String,
    divorce: String,
    mobile: String,
    dob_m: String,
    dob_d: String,
    dob_y: String,
    tob: String,
    pob: String,
    salary: String,
    height: String,
    colour: String,
    education: String,
    occupation: String,
    habit: String,
    habit1: String,
    habit2: String,
    address: String,
    house_status: String,
    native_place: String,
    city: String,
    father_name: String,
    father_occupation: String
});

const Contact = mongoose.model('matrimony', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// ENDPOINTS
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
})
app.get('/contact', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/contact.html'));
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    console.log(myData);
    myData.save().then(()=>{
    res.sendFile(path.join(__dirname, '/views/contact.html'));
    // res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
    });
})

// START THE SERVER
 app.listen(port, ()=>{
    console.log(`The application started successfully on port${port}`);
})