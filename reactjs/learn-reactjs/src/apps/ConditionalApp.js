import React, {Component} from 'react';

class ConditionalApp extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: true
        };
    }

    componentDidMount(){
        setTimeout(() =>{
            this.setState({
                isLoading: false
            });
        }, 1500);
    }

    render(){
        return (
            <div>
            <h2>{this.props.name}</h2>
            {this.state.isLoading?
                <h1>Loading...</h1>:
                <Conditonal />}
            </div>
        )
    };
}

class Conditonal extends Component {
    render(){
        // if(this.props.isLoading){
        //     return(
        //         <h1>Loading...</h1>
        //     )
        // }
        // return(
        //     <h1>Here is the stuff you are looking for...</h1>
        // )
        return (
            <div>
                <h2>{this.props.name}</h2>
                <h2>Here is the stuff you are looking for...</h2>
                <hr />
            </div>
        );
    }
    
}

export default ConditionalApp;