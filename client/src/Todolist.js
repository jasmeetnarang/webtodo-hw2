import React, { Component } from 'react';
//import Strike from 'react-strike';

//import './Styles/App.css';
import axios from 'axios'

class Todolist extends Component {
    constructor(props){
        super(props)
        this.state = {
            item: []
        }
    }

    componentDidMount(){
        axios.get('/api/listtodoitem')
            .then(response => {
                this.setState(
                    { item: response.data}
                )
                console.log("Items is ", this.state.item[0].content)
                console.log("Items is ", this.state.item[1])

            })
    }
    //renderContent(item,id){
      //  return <li key={item.id}>{item.id} {item.content}</li>
    //}

    render() {
        const {item} = this.state;
        return(
            <div>
                <form action="/api/addtodoitem" method="post">
                    <label htmlFor="add"></label>
                    <input type="text" id="add" name="additem" placeholder="ITEM NAME"/>
                    <input type="submit" value="add"/>
                </form>
                <form action="/api/removetodoitem" method="post">
                    <input type="number" id="remove" name="removeitem" placeholder="ITEM ID"/>
                    <input type="submit" value="remove"/>
                </form>
                <form action="/api/changetodoitem" method="post">
                    <input type="number" id="update" name="updateitem" placeholder="ITEM ID"/>
                    <input type="submit" value="update"/>
                </form>

                <div>
                    <ul>
                        {item.map(d=> {
                            //const {completed,id,content} = d;
                            return d.completed === true ? <li key={d.id}><del> {d.id} {d.content} </del></li> :<li key={d.id}> {d.id} {d.content}</li>;
                        })}
                        {/*{item.completed===true ? "<stirke>" + item.id + item.content + "</stirke>" :item.map(this.renderContent)}*/}
                    </ul>
                </div>
                {/*<button>LOGOUT</button>*/}
                <a href={"/api/logout"}>Logout</a>
            </div>

    );
    }

}

export default Todolist;