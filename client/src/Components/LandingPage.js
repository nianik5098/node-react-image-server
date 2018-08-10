//Comment.js
import React, {Component} from 'react';
import Header from './Header';
import ImagePage from './ImagePage';

export default class LandingPage extends Component {
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
                <ImagePage />
            </div>
        )
    }
}
