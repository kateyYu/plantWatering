import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Moment from 'moment';
import TimedProgressBar from './TimedProgressBar'
import store from '../store';
import {
  getStartWateringAction,
  getStopWateringAction,
  getInitList,
  getSetTimerAction
} from '../store/actionCreators'

class PlantMonitor extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.timeId = setInterval(() => this.tick(), 3600000);//1 minutes
    this.handleBtnStartClick = this.handleBtnStartClick.bind(this);
    this.handleBtnStopClick = this.handleBtnStopClick.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);
  }
  
  componentDidMount() {
    const action = getInitList();
    store.dispatch(action);
  }
  
  componentWillUnmount() {
    clearInterval(this.timeId);
  }
    
  render() {
    const { list } = this.state;
    return (
      <div >
        <Table className="mt-4" striped bordered hover size="sm">
          <thead><tr>
            <th>Plant name</th>
            <th>Watering date time</th>
            <th>Watering status</th>
            <th>Warning</th>
            <th>Options</th>
          </tr></thead>
          <tbody>
            {
              list.map((value, key) => {
                const tt = 10000; //10 seconds
                const ti = 300; //300 ms
                const wt = 21600;//6 hours
                const wateringLocalTime = Moment.utc(value.WaterDateTime).local().format()
                var diff = Math.abs(new Date().getTime() - new Date(wateringLocalTime).getTime()) / 1000;
                return (
                  <tr key={key}>
                    <td>{value.PlantName}</td>
                    <td>{Moment.utc(value.WaterDateTime).local().format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>{(value.IsWatering) ?
                      <TimedProgressBar
                        totalTime={tt}
                        timerInterval={ti}
                        index={key}
                        wateringFinish={this.handleBtnStopClick}
                        variant="success" />
                      : 'waiting watering '}
                    </td>                    
                      {
                      (diff > wt) ? 
                        <td className="alert alert-danger" role="alert">Please watering</td>: 
                        <td> </td>
                      }                    			
                    <td>
                      <ButtonToolbar>
                        <Button className="mr-2" variant="info"
                          disabled={value.IsWatering}
                          onClick={()=>this.handleBtnStartClick(key)}>
                          Start
                        </Button>
                        <Button className="mr-2" variant="danger"
                          disabled={(value.IsWatering) ? false : true}
                          onClick={()=>this.handleBtnStopClick(key)}>
                          Stop
                        </Button>                        
                      </ButtonToolbar>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }

  handleBtnStartClick(index) {
    // no watering within 30 seconds of the last watering session
    const wateringLocalTime = Moment.utc(this.state.list[index].WaterDateTime).local().format()
    var diff = Math.abs(new Date().getTime() - new Date(wateringLocalTime).getTime()) / 1000;
    if (diff < 30) {
      alert("no watering within 30 seconds of the last watering session");
      return;
    }
    const action = getStartWateringAction(index);
    store.dispatch(action);
  }

  handleBtnStopClick(index) {
    const action = getStopWateringAction(index);
    store.dispatch(action);
  }
  
  handleStoreChange() {
    this.setState(store.getState());
  }

  tick() {
    const action = getSetTimerAction();
    store.dispatch(action);
  }
}

export default PlantMonitor;