//Comment.js
import React, {Component} from 'react';
import Header from './Header';
import axios from 'axios';

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
    
    state = {selectedFile: null}

    fileChangedHandler = (event) => {
      this.setState({selectedFile: event.target.files[0]})
    }

    uploadHandler = () => { 
      const formData = new FormData()
      formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
      console.log(formData);
      //axios.post('http://localhost:8080/images/upload/', this.state.image)
      axios.post('/images/upload/', formData)
      .then(response => { 
	        console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    render() {

        return (
            <div className="App container-fluid">
                <Header />
                <h1> body </h1>
                <div>
                    <input type="file" onChange={this.fileChangedHandler}/>
                    <button onClick={this.uploadHandler}>Upload!</button>
                </div>
            </div>
        )
    }
}
