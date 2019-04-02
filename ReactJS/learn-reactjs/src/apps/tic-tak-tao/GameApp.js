import React, {Component} from 'react';
import Board from './Board';

class GameApp extends Component {
    render() {
      return (
        <div>
          <h2>{this.props.name}</h2>
          <div className="game">
            <div className="game-board">
              <Board />
            </div>
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
          <hr />
        </div>
      );
    }
  }

export default GameApp;