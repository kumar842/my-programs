import React, {Component} from 'react';
import Joke from './Joke';

class JokesApp extends Component {
    constructor(){
        super();
        this.state = {
            jokesData : [
                {
                    id: 1,
                    question: "question1",
                    punchLine: "answer1"
                },
                {
                    id: 2,
                    question: "question2",
                    punchLine: "answer2"
                },
                {
                    id: 3,
                    question: "",
                    punchLine: "answer3"
                }
            ]
        }
    }
    
    render(){
        const jokes = this.state.jokesData.map(joke => <Joke key={joke.id} joke={joke} />)

        return (
            <div>
                <h2>{this.props.name}</h2>
                {jokes}
                <hr />
            </div> 
        )
    }
}

export default JokesApp;
