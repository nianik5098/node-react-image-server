//Comment.js
import React, {Component} from 'react';
import Header from './Header';
import ImagePage from './ImagePage/ImagePage';
import ImageGallery from './ImagePage/ImageGallery';
import './ImagePage/imageStyle.css';

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
                <div className="container">
                    
                    <div className="check1"><ImagePage /></div>
                   
                    <div className="check"><ImageGallery /></div>
                </div>
                
            </div>
        )
    }
}

/*<div className="container">
                    
                    <div className="check1"><ImagePage /></div>
                   
                    <div className="check"><ImageGallery /></div>
                </div>*/
