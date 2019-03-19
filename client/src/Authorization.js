import React, { Component } from 'react';
//import './Styles/App.css';

class Authorization extends Component {
    render() {
        return(
            <div>
                <form action="/api/register" method="post">
                    <label >REGISTER</label>
                    <input type="text" id="register" name="name" placeholder="your name" />
                    <input type="submit" value="REGISTER" />
                </form>
                <form action="/api/login" method="post">
                    <label >LOGIN</label>
                    <input type="text"  name="username" placeholder="your name" />
                    <input type="submit" value="LOGIN" />
                </form>
                {/*<input type="submit" value="LOGOUT"/>*/}
            </div>
        );
    }
}

export default Authorization;
