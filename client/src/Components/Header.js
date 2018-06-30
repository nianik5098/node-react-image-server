import React, {Component} from 'react';


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    

    render() {

        return (
            <div>
                <h2> Header </h2>
            </div>
        )
    }
}