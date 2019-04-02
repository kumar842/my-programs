import React, {Component} from 'react';
import BoardRow from './BoardRow';
import Timer from './Timer';

class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            boardSize: 4,
            squares: arrayOfN(16),
            blankSquareIndex: 15,
            isStarted: false,
            isPaused: false,
            buttonText: 'Start',
            status: '.',
            timerAction: '.'
        }
        this.isValidClick = this.isValidClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleStartOrStop = this.handleStartOrStop.bind(this);
    }

    handleStartOrStop(){
        if(this.state.isPaused){
            //console.log('resume the game...');
            this.setState({
                isPaused: false,
                buttonText: 'Pause',
                timerAction: 'pause'
            })
        }else if(this.state.isStarted){
            //console.log('pause the game...');
            this.setState({
                isPaused: true,
                buttonText: 'Resume',
                timerAction: 'pause'
            })
        }else {
            const newSquares = shuffle(arrayOfN(15));
            newSquares.push(undefined); //adding final blank element
            this.setState({
                squares: newSquares,
                blankSquareIndex: 15,
                isStarted: true,
                buttonText: 'Pause',
                status: '.',
                timerAction: 'start'
            })
        }

    }

    handleClick(i, cellValue){
        if(!this.state.isStarted){
            return;
        }
        if(this.state.isPaused){
            return;
        }
        //console.log('clicked... ', i, this.state.blankSquareIndex, Math.abs(i - this.state.blankSquareIndex));
        if(!this.isValidClick(i, this.state.blankSquareIndex)){
            return;
        }
        //console.log('valid click');
        this.setState(prevState => {
            const newSquares = prevState.squares;
            newSquares[this.state.blankSquareIndex] =  cellValue;
            newSquares[i] =  undefined;
            
            const newButtonText = this.state.isStarted &&
                                  isSolved(this.state.squares)? 'Start': this.state.buttonText;
            const newStatus = this.state.isStarted &&
                                  isSolved(this.state.squares)? 'Solved': this.state.status;
            const newIsStarted = this.state.isStarted &&
                                  isSolved(this.state.squares)? false : this.state.isStarted;                
            const newTimerAction = this.state.isStarted &&
                                  isSolved(this.state.squares)? false : this.state.timerAction;
            return({
                squares: newSquares,
                blankSquareIndex: i,
                buttonText: newButtonText,
                status: newStatus,
                isStarted: newIsStarted,
                timerAction: newTimerAction
            })
        });
    }
    
    isValidClick(i, blankSquareIndex){
        const flag = Math.abs(i - blankSquareIndex)

        return flag === 1 || flag === 4;
    }

    render() {
        //console.log('rendering the whole board!!!');
        var rows = [];
        for(var i=0; i < this.state.squares.length; i = i + this.state.boardSize){
            rows.push(<BoardRow 
                            key={i}
                            index={i}
                            blankSquareIndex={this.state.blankSquareIndex}
                            arr={this.state.squares.slice(i, i + this.state.boardSize)}
                            handleClick={this.handleClick} />);
        }
        
        return (
        <div>
            <div>
                <div className="status">{this.state.status}</div>
                <Timer timerAction={this.state.timerAction}/>
            </div>
            {rows}
            <br />
            <button onClick={this.handleStartOrStop}>{this.state.buttonText}</button>
        </div>
        );
    }
}

function arrayOfN(N) {
    const arr = Array.apply(null, {length: N}).map(Number.call, Number).map(n => n + 1)
    //arr[arr.length - 1] = undefined;
    return arr;
}

function isSolved(arr){
    //console.log(arr);
    for(var i = 0; i < arr.length - 1; i ++){
        if(arr[i] - 1 - i !== 0){
            return false;
        }
    }
    return true;
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        
        // Decrease ctr by 1
        ctr--;
        
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

export default Board;