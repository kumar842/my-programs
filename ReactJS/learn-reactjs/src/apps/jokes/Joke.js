import React, {Component} from 'react';

class Joke extends Component {
    render(){
        const joke = this.props.joke;
        //console.log(joke.question);
        return (
            <div className="contact-card">
                <h3 style={{display: !joke.question && 'none'}}>Question: {joke.question}</h3>
                <h3 style={{color: !joke.question && '#888888'}}>PunchLine: {joke.punchLine}</h3>
            </div>
        )
    }
}

export default Joke;