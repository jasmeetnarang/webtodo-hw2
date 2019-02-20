const express = require ('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const data = require("./data.json");
const axios = require('axios');
const Request = require("request");
const setCookie = require('set-cookie-parser');


app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//
// function authCheck(req,res,next){
//     if(req.cookie && req.cookie.jazzAuth){
//         return next();
//     }
//     return res.redirect("/");
// }

//register a username
app.post('/register',function(req,res){
    //add a user
    Request.post({
        "url": 'https://hunter-todo-api.herokuapp.com/user',
        "body": JSON.stringify({
            "username": req.body.name
        })
    },(error,response,body)=> {
        if (error) {
            return console.dir(error);
        }
    });
    res.redirect('/');

})


//Login and authorize a username
app.post('/login',function(req,res){
    //authorize the user
    Request.post({
        "url": 'https://hunter-todo-api.herokuapp.com/auth',
        "body": JSON.stringify({
            "username": req.body.username
        })
    },(error,response,body)=>{
        if(error){
            return console.dir(error);
        }
        const cookies = setCookie.parse(response, {decodeValues: true, map: true });
        const cookie = cookies.sillyauth.value;

        res.cookie("jazzAuth",cookie,{path:"/"});
        res.redirect("/hompage");
    });
});


// app.get('/datajson',function(req,res){
//     res.send(data);
// })

app.get('/listtodoitem',function(req,res) {
    //see all items
    rCookie = req.cookies.jazzAuth
    Request.get({
        "headers": {"Cookie": [rCookie]},
        "url": "https://hunter-todo-api.herokuapp.com/todo-item",

    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        res.send(data);
        //console.dir(JSON.parse(body));
    });
})

app.post('/addtodoitem',function(req,res){
//create a new item
    Request.post({
        "headers": {"Cookie": [rCookie]},
        "url": "https://hunter-todo-api.herokuapp.com/todo-item",
        "body": JSON.stringify({
            "content": req.body.additem
        })
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
    });
})
app.put('/changetodoitem',function(req,res){
//Update some data on an item
    Request.put({
        "headers": {"Cookie": [rCookie]},
        "url": "https://hunter-todo-api.herokuapp.com/todo-item/64",
        "body": JSON.stringify({
            "completed": "true"
        })
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
    });
})

app.delete('/removetodoitem',function(req,res){
//delete an item
    Request.delete({
        "headers": {"Cookie": [rCookie]},
        "url": "https://hunter-todo-api.herokuapp.com/todo-item/64",
        "body": JSON.stringify({
            "id": "64"
        })
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
    });
    console.log(req.body);
})


// app.post('/addtolist',function (req,res) {
//     console.log(req.body);
// 	res.send('added');
// })



app.get('/hompage',function(req,res){
    console.log(req.cookies.jazzAuth);
    res.sendFile(path.join(__dirname, 'index.html'))
});


//viewed at http://localhost:8080
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname, 'register.html'))
});

app.listen(8080);