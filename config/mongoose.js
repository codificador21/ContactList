//require the library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection(to check if its successsful)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('opne',function(){
     console.log('successfully connexted to databse');
});

