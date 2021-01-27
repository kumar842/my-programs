import React, {Component} from 'react';

class Square extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: null
        }
    }

    render() {
        return (
            <button 
                className={this.props.value? 'square' : 'square_blank'} 
                onClick={() => { this.props.onClick();}}
            >
                {this.props.value}
            </button>
        );
    }
}

export default Square;