import React, {Component} from 'react';

class Timer extends Component {
    constructor (props) {
      super(props)
      this.state = {count: 0}
      this.startTimer = this.startTimer.bind(this);
      this.stopTimer = this.stopTimer.bind(this);
      this.resetTimer = this.resetTimer.bind(this);
      this.tick = this.tick.bind(this);
    }
    componentWillUnmount () {
      clearInterval(this.timer)
    }
    tick () {
      this.setState({count: (this.state.count + 1)})
    }
    startTimer () {
      clearInterval(this.timer)
      this.timer = setInterval(this.tick, 1000)
    }
    stopTimer () {
      clearInterval(this.timer)
    }
    resetTimer () {
        clearInterval(this.timer)
      }
    render () {
        console.log(this.props.timerAction );
        if(this.props.timerAction === 'start'){
            this.startTimer();
        }else if(this.props.timerAction === 'pause'){
            this.stopTimer();
        }else if(this.props.timerAction === 'reset'){
            this.resetTimer();
        } else {

        }
      return (
        <div className='timer'>
          <h1>{this.state.count}</h1>
        </div>
      )
    }
  }

export default Timer;