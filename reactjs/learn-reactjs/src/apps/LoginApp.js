import React, {Component} from 'react';

class LoginApp extends Component{

    constructor(){
        super();
        this.state =  {
            isLoggedin: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(prevState => {
            return {
                isLoggedin: !prevState.isLoggedin
            }
        })
    }

    render(){
        const buttonText = this.state.isLoggedin? 'Log Out': 'Log In';
        const displayText = this.state.isLoggedin? 'Logged In': 'Logged out';
        return(
            <div>
                <button onClick={this.handleClick}>{buttonText}</button>
                <h1>{displayText}</h1>
            </div>
        )
    }
}

export default LoginApp;
