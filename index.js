const express = require('express');
const path = require('path');
const { runInNewContext } = require('vm');
const port = 8000;


const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


// var contactList = [
//     {
//         name: "Arpit",
//         phone: "9871121873"
//     },{
//         name: "Tony Stark",
//         phone: "9865432657"
//     }
// ]


app.get('/',function(req,res){
    
    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching contacts from the db");
            return;
        }
        return res.render('home',{title:"ContactList",contact_list: contacts});
    });
    
});

app.get('/practice',function(req,res){
     return res.render('practice',{
         title:"Let us play with ejs"
     });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // return res.redirect('/')
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in creating contact");
            return;
        }
        console.log("*****",newContact);
        res.redirect('back');
    });
    
    
});

app.get('/delete-contact/',function(req,res){
    
    //get the id from the querry
    let id = req.query.id;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }

    //find the contact from the databse using id and delete using an inbuilt function "findbyidanddelete"
    Contact.findByIdAndDelete(id,function(err){ //No second argument coz we are deleting something from the db so nothing would be returned
        if(err){
            console.log("error in deleting the contact from db");
            return;
    }
        return res.redirect('back');
    });
    
    
});


app.listen(port,function(err){
    if(err){
        console.log("error",err);
    }
    console.log("Express server running on port : ",port)
});