import React, {Component} from 'react';

class ApiApp extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            character: {}
        };
    }

    componentDidMount(){
        this.setState({isLoading: true});
        fetch('https://swapi.co/api/people/1')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    character: data
                })
            })
    }

    render(){
        const text = this.state.isLoading? 'Loading...' : this.state.character.name;

        return (
            <div>
                <h2>API Example</h2>
                <p>this data is retrieved from an API call:
                    <br />
                    Character Name: <strong>{text}</strong>
                </p>
                <hr />
            </div>
        )
    };
}

export default ApiApp;