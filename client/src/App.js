import React, { Component } from "react";
//import {BrowserRouter, browserHistory, Route, Switch as Router} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Landing from "./Landing";
import Authorization from "./Authorization";
import Todolist from "./Todolist";


class App extends Component {
  render(){
    return(
        <Router>
          <div>
            <Route exact path="/hompage" component = {Landing} />
            <Route exact path="/" component = {Authorization} />
             <Route exact path="/todolist" component = {Todolist} />
          </div>
        </Router>
    );
  }
}

export default App;