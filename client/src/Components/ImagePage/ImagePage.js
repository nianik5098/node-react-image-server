//Comment.js
import React, {Component} from 'react';
//import Header from '../Header';
//import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';
import CircularProgressbar from 'react-circular-progressbar';

export default class ImagePage extends Component {
    constructor(props) {
        super(props);
        //this.percentageNow = 0;
        this.state = {
            percentage: 0,
            selectedFile: null,
            fileUrl: null
        };
        
    }

    
    
    /*componentDidMount() {
        //this.setState({percentage:percentageNow});
        this.progressID = setInterval(
          () => this.tick(),
          10
        );

    }
    
    componentWillUnmount() {
        clearInterval(this.progressID);
      }
    
    
      tick() {
        this.setState({
          percentage:percentageNow
        });
      }*/
  

    fileChangedHandler = (event) => {
        URL.revokeObjectURL(this.state.fileUrl)
        this.setState({percentage:0});
        this.setState({selectedFile: event.target.files[0]})
        this.setState({fileUrl: URL.createObjectURL(event.target.files[0])})
    }

    uploadHandler = () => { 
      /*const formData = new FormData()
      formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
      console.log(formData);
      //axios.post('http://localhost:8080/images/upload/', this.state.image)
      axios.post('/images/upload/', formData)
      .then(response => { 
	        console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });*/
        
        this.setState({percentage:0});
        var formData = new FormData();
        //var file = document.getElementById('myFile').files[0];
        formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
        var xhr = new XMLHttpRequest();
        
        // your url upload
        xhr.open('post', '/images/upload/', true);
        var that=this;
        xhr.upload.onprogress = function(e) {
          if (e.lengthComputable) {
            var percentageNow = (e.loaded / e.total) * 100;
            console.log(percentageNow + "%");
            that.setState({percentage:percentageNow});
          }
        };

        xhr.onerror = function(e) {
          console.log('Error');
          console.log(e);
        };
        xhr.onload = function() {
          console.log(this.statusText, "anik");
        };
        console.log(this.state.fileUrl);
        xhr.send(formData);
    }
    render() {

        return (
                <div style={{display: 'flex', flexFlow: 'column'}}>
                    <input type="file" onChange={this.fileChangedHandler}/>
                    <br />
                    <img src={this.state.fileUrl} alt='' height="auto" width="256"/><br />
                    <button onClick={this.uploadHandler}>Upload!</button>
                    <br />
                     <div style={{ width: '100px' }}>
                    <CircularProgressbar
                      initialAnimation={true}
                      percentage={this.state.percentage}
                      strokeWidth={50}
                      text={`${this.state.percentage}%`}
                      styles={{
                          path: { strokeLinecap: 'butt' },
                          text: { fill: '#000' }
                        }}
                    />
                    </div>
                </div>
        )
    }
}
