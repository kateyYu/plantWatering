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
        this.intervalTimer = window.setInterval(this.updateProgress, timerInterval);
    }

  changingWateringStatus(plantId) {
    fetch(process.env.REACT_APP_API + 'plant', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PlantId: plantId,
        WaterDateTime: new Date(),
        IsWatering: 0
      })
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      },
        (error) => {
          alert('Failed' + error);
        })
  }

  updateProgress = () => {
    const { timerInterval, totalTime, id } = this.props;
    const percentageTimeElapsed = Math.min((this.timeElapsed / totalTime) * 100, 100);
    if (percentageTimeElapsed <= 100) {
      if (percentageTimeElapsed === 100) {
        window.clearInterval(this.intervalTimer);
        //update watering status
        this.changingWateringStatus(id);
      }
      this.setState(() => ({
        progress: parseInt(percentageTimeElapsed, 10)
      }));
      this.timeElapsed = this.timeElapsed + timerInterval;
      const timeDiff = totalTime - this.timeElapsed;
      if (timeDiff > 0 && timeDiff < timerInterval) {
        window.clearInterval(this.intervalTimer);
        this.intervalTimer = window.setInterval(this.updateProgress, timeDiff);
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
