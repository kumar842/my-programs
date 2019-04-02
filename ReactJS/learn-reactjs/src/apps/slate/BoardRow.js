import React, {Component} from 'react';
import Square from './Square';

class BoardRow extends Component {
    constructor(props){
        super(props);
        this.renderSquare = this.renderSquare.bind(this);
    }

    renderSquare(index, cellValue, blankSquareIndex) {
        //debugger;
        //console.log('rendering square', index, cellValue, blankSquareIndex);
        return (
            <Square 
                key={index}
                value={ blankSquareIndex === index ? undefined : cellValue}
                onClick={() => this.props.handleClick(index, cellValue)}
            />
        );
    }

    render() {
        const row = this.props.arr.map((cellValue, index) => {
            //console.log(index, cellValue);
            return this.renderSquare(this.props.index + index, cellValue, this.props.blankSquareIndex)
        })
        
        return (
            <div className="board-row">
                {row}
            </div>
        );
    }
}

export default BoardRow;
