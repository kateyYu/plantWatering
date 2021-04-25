import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class TimedProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0
    };
    this.intervalTimer = 0;
    this.timeElapsed = this.props.timerInterval;
  }

  componentDidMount() {
    const { timerInterval } = this.props;
    this.intervalTimer = setInterval(this.updateProgress, timerInterval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  updateProgress = () => {
    const { timerInterval, totalTime, index, wateringFinish } = this.props;
    const percentageTimeElapsed = Math.min((this.timeElapsed / totalTime) * 100, 100);
    if (percentageTimeElapsed <= 100) {
      this.setState(() => ({
        progress: parseInt(percentageTimeElapsed, 10)
      }));
      
      this.timeElapsed += timerInterval;
      if (percentageTimeElapsed === 100) {
        clearInterval(this.intervalTimer);
        //update watering status
        wateringFinish(index);
      }
    }
  }

  render() {
    const { progress } = this.state
    const { variant } = this.props
    return (
      <ProgressBar animated variant={variant} now={progress} label={`${progress}%`} />
    );
  }
}

export default TimedProgressBar;
