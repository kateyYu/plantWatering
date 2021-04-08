import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Moment from 'moment';
import TimedProgressBar from './TimedProgressBar'

class PlantMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: []
        };
    }

    //show plants 
    refreshList = () => {
        fetch(process.env.REACT_APP_API + 'plant')
            .then(response => response.json())
            .then(data => {
                this.setState({ plants: data });
            });
    }
    
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    // update table watering status
    startWatering = (plantId, wateringDatetime) => {
        // not watering within 30 seconds of the last watering
        const wateringLocalTime = Moment.utc(wateringDatetime).local().format()
        var diff = Math.abs(new Date().getTime()- new Date(wateringLocalTime).getTime())/1000;
        if (diff < 30) {
            alert("not watering within 30 seconds of the last watering");
            return;
        }

        this.update(plantId, 1);

    }

    stopWatering = (plantId) => {
        this.update(plantId, 0);
    }

    update(plantId, isWatering) {
        fetch(process.env.REACT_APP_API + 'plant', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PlantId: plantId,
                WaterDateTime: new Date(),
                IsWatering: isWatering
            })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
            },
                (error) => {
                    alert('Failed');
                })
    }
    
    render() {
        const { plants } = this.state;
        return (
            <div >
            <Table className="mt-4" striped bordered hover size="sm">
                <thead><tr>
                        <th>Plant name</th>
                        <th>Watering date time</th>
                        <th>Watering status</th>
                        <th>Options</th>
                </tr></thead>
                <tbody>
{
    plants.map((value, key) => {
        const tt = 10000; //10 seconds
        const ti = 300; //300 ms
        return (

            <tr key={key}>
                <td>{value.PlantName}</td>
                <td>{Moment.utc(value.WaterDateTime).local().format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
                <td>{(value.IsWatering == 1) ?
                    <TimedProgressBar totalTime={tt} timerInterval={ti} id={value.PlantId} variant="success" />
                    : 'waiting watering '}
                </td>
                <td>
                    <ButtonToolbar>            
                            <Button className="mr-2" variant="info" disabled={(value.IsWatering == 1) ? true:false}
                                onClick={this.startWatering.bind(this, value.PlantId, value.WaterDateTime)}>
                                Start
                            </Button>                      

                        <Button className="mr-2" variant="danger" disabled={(value.IsWatering == 1) ? false : true}
                                onClick={this.stopWatering.bind(this, value.PlantId)}>                           
                                Stop
                        </Button>
                        
                    </ButtonToolbar>                    
                </td>

            </tr>             
        )                    
            })
}
                </tbody>

            </Table>
            </div>    
        );
    }
}

export default PlantMonitor;