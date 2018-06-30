//Comment.js
import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';

export default class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: '',
            
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        
    }


    handleNameChange(e) {
        this.setState({name: e.target.value});
    }


    componentDidMount() {
        

    }

    render() {

        return (
            <div className="App container-fluid">
                <Header />
                <h1> body </h1>
            </div>
        )
    }
}