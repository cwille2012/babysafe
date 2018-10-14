import * as React from 'react';
import axios from 'axios';

interface IProps {}

export class Dashboard extends React.Component<any, any> {
    constructor(props: IProps) {
        super(props as any);
    
        this.state = {
            loading: true,
            error: false,
            data: {}
        }
    }

    componentDidMount(){
        console.log('Getting car status...');
        axios.get('/data')
        .then(res => {
            if (res.status == 200 && !!res.data) {
                console.log(res.data)
                this.setState({
                    data: res.data,
                    error: false,
                    loading: false
                })
            } else {
                this.setState({
                    error: true
                })
                alert('Could not get car data, please try again');
            }
        })
    }

    public render() {
        var {data, loading, error} = this.state;

        if (loading === true) {
            return (
                <div>
                <h1>Dashboard</h1>
                    <p>LOADING...</p>
                </div>
            )
        }

        if (error === true) {
            return (
                <div>
                <h1>Dashboard</h1>
                    <p>An error occured, please check with an administrator or try again.</p>
                </div>
            )
        }

        return (
            <div>
                <h1>Dashboard</h1>
                <input type="button" name="loginbutton" value="Logout" onClick={() => window.location.href = 'logout'} />
                <br/>
                <img src={data.imageUrl} alt="image not found" style={{maxWidth: '90%'}} />
                <p>
                    {'Last updated: ' + data.DateTime} <br/>
                    {'Door status: ' + (data.DoorsLocked ? 'Locked' : 'Unlocked')} <br/>
                    {'Engine status: ' + (data.EngineOn ? 'Engine on' : 'Engine off')} <br/>
                    {'Transmission state: ' + data.GearState} <br/>
                    {data.PIRalarm ? 'Motion detected' : 'No motion detected'} <br/>
                    {'Interior temperature: ' + data.Temperature + 'F'} <br/>
                    {'Windows: ' + (data.WindowsUp ? 'Up (closed)' : 'Down (open)')} <br/>
                </p>
            </div>
        )
    }
}