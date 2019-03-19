import React, { Component } from 'react';
import {  Link } from "react-router-dom";
//import './Styles/App.css';

class Landing extends Component {
    state = {
        data: null
    };

    // componentDidMount() {
    //     // Call our fetch function below once the component mounts
    //     this.callBackendAPI()
    //         .then(res => this.setState({ data: res.express }))
    //         .catch(err => console.log(err));
    // }
    // // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    // callBackendAPI = async () => {
    //     const response = await fetch('/backend');
    //     const body = await response.json();
    //
    //     if (response.status !== 200) {
    //         throw Error(body.message)
    //     }
    //     return body;
    // };
    render() {
        return (
            <div>
                <h1>Jasmeet Narang</h1>
                <img src="http://3.bp.blogspot.com/-cOqt3NlpMq0/TtBZl3ZBDAI/AAAAAAAACEQ/9vbSj1UZgRc/s1600/Doodle179.jpg" />
                <br />

                    <h2>Introduction</h2>
                    <p>Hello there, this is my page for todo list homework</p>
                    <p>Some facts: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in
                        Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
                        cites of the word in classical literature, discovered the undoubtable source.
                    </p>
                    <p>Some of the popular sites</p>
                    <ul id="links">

                        <li>
                            <a href="https://www.google.com/search?q=cat+images&tbm=isch&source=univ&sa=X&ved=2ahUKEwid7Mm9wcvgAhWsUt8KHbTHDw8QsAR6BAgEEAE&biw=854&bih=927">Cats</a>
                        </li>
                        <li>
                            <a href="https://www.google.com/search?biw=854&bih=927&tbm=isch&sa=1&ei=-ehtXK6BA-rm_QaxiJDIDA&q=dog+images&oq=dog+images&gs_l=img.3..0i67j0l9.35647.38202..38541...0.0..0.82.386.5......1....1..gws-wiz-img.......0i7i30.xBtUYg4yabo">Dogs</a>
                        </li>
                        <li>
                            <a href="https://giphy.com/gifs/dog-ExboraFfNVKYo">Dog Gif</a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/dog_cakes/">Dogs and Cakes</a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/dogsofinstagram/?hl=en">More Dog</a>
                        </li>

                    </ul>

                <div>
                    <Link to="/todolist">Make your todo list</Link>
                </div>

            </div>
        );
    }
}


export default Landing;
