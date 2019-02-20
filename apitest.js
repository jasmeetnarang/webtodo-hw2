const Request = require("request");
const setCookie = require('set-cookie-parser');

//const url = "https://hunter-todo-api.herokuapp.com";
Request.post({
    "url": "https://hunter-todo-api.herokuapp.com/user",
    "body": JSON.stringify({
        "username": "MrBean"
    })
},(error,response,body)=> {
    if (error) {
        return console.log(error);
    }

    console.log(JSON.parse(body));

    Request.post({
        "url": "https://hunter-todo-api.herokuapp.com/auth",
        "body": JSON.stringify({
            "username": "MrBean"
        })
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        const cookies = setCookie.parse(response, {decodeValues: true, map: true});
        const cookie = cookies.sillyauth.value;
        const rCookie = Request.cookie(`sillyauth=${cookie}`);

        console.log("rcookie is ",rCookie);
        Request.get({
            "headers": {"Cookie": [rCookie]},
            "url": "https://hunter-todo-api.herokuapp.com/todo-item"
        }, (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            Request.post({
                "headers": {"Cookie": [rCookie]},
                "url": "https://hunter-todo-api.herokuapp.com/todo-item",
                "body": JSON.stringify({
                    "content": "Be Funny"
                })
            }, (error, response, body) => {
                if (error) {
                    return console.dir(error);
                }
                Request.put({
                    "headers": {"Cookie": [rCookie]},
                    "url": "https://hunter-todo-api.herokuapp.com/todo-item/64",
                    "completed": "true"
                }, (error, response, body) => {
                    if (error) {
                        return console.dir(error);
                    }
                    //console.log(JSON.parse(body));
                });
            });
        });
    });
});


// Request.get("https://hunter-todo-api.herokuapp.com/user", (error,response,body) => {
//     if(error){
//         return console.dir(error)
//     }
//     console.dir(JSON.parse(body))
// })
