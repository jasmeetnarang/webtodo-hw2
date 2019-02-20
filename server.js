const express = require ('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const data = require("./data.json");
const Request = require("request");
const setCookie = require('set-cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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


app.get('/datajson',function(req,res){
    res.send(data);
})

//create a new item
app.post('/addtodoitem',function(req,res){

    const rCookie = Request.cookie(`sillyauth=${req.cookies.jazzAuth}`);
    Request.post({
        "headers": {"Cookie": [rCookie]},
        "url": "https://hunter-todo-api.herokuapp.com/todo-item",
        "body": JSON.stringify({
            "content": req.body.additem
        })
    }, (error, response, body) => {
        if (error) {
            console.dir(error);
        }
        res.redirect("/todolist")
    });
})

//see all items
app.get('/listtodoitem',function(req,res) {

    const rCookie = Request.cookie(`sillyauth=${req.cookies.jazzAuth}`);
    Request.get({
        "headers": {"Cookie": [rCookie]},
        "url": "https://hunter-todo-api.herokuapp.com/todo-item",

    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }

        console.log("this is listing item function")
        res.send(body);

    });
})

app.post('/removetodoitem',function(req,res){
//delete an item

    const rCookie = Request.cookie(`sillyauth=${req.cookies.jazzAuth}`);

    Request.delete({
        "headers": {"Cookie": [rCookie]},
        "url": "https://hunter-todo-api.herokuapp.com/todo-item/"+req.body.removeitem,
        "body": JSON.stringify({
        })
    }, (error, response, body) => {
        if (error) {
            console.dir(error);
        }
    });
    res.redirect("/todolist")
    //console.log(req.body);
    console.log("this is removing item function")
})

app.post('/changetodoitem',function(req,res){
//Update some data on an item

    const rCookie = Request.cookie(`sillyauth=${req.cookies.jazzAuth}`);

    Request.put({
        "headers": {"Cookie": [rCookie]},
        "url": "https://hunter-todo-api.herokuapp.com/todo-item/"+req.body.updateitem,
        "body": JSON.stringify({
            "completed": true
        })
    }, (error, response, body) => {
        if (error) {
            console.dir(error);
        }
    });
    res.redirect("/todolist")
    //console.log(body)
    console.log("this is updating item function")
})

app.get('/todolist',function(req,res){
    //console.log(req.cookies.jazzAuth);
    //rCookie = req.cookies.jazzAuth;
    res.sendFile(path.join(__dirname, 'todolist.html'))
});

app.get('/hompage',function(req,res){
    console.log(req.cookies.jazzAuth);
    //rCookie = req.cookies.jazzAuth;
    res.sendFile(path.join(__dirname, 'index.html'))
});


//viewed at http://localhost:8080
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname, 'register.html'))
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);