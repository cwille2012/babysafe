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
        this.getCarData = this.getCarData.bind(this);
    }

    toggleDoors() {
        console.log('Doors')
        axios.post('/test', 'doors')
        .then(res => {
            if (res.status == 200 && !!res.data.token) {

            } else {
                alert('Could not access doors');
            }
        })

    }

    toggleEngine() {
        axios.post('/test', 'engine')
        .then(res => {
            if (res.status == 200 && !!res.data.token) {

            } else {
                alert('Could not access engine');
            }
        })
    }

    toggleAC() {
        axios.post('/test', 'ac')
        .then(res => {
            if (res.status == 200 && !!res.data.token) {

            } else {
                alert('Could not access doors');
            }
        })
    }

    componentDidMount(){
        this.getCarData()
    }

    getCarData() {
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
        setTimeout(this.getCarData, 5000);
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
            <div className="container">
                <header className="jumbotron my-4">
                    <h1 style={{textAlign: 'center'}}className="display-3">BabySafe Dashboard</h1>
                </header>

                <div className="row text-center">
                    <h4 style={{textAlign: 'center', width: '100%'}} className="card-title">Interior Temperature</h4>
                    <div id="thermcontainer">
                        <div id="glass">
                            <div id="merc" style={{width: String(Number(data.Temperature/140 * 100) + '%'), backgroundColor: String((data.Temperature > 80) ? 'red' : 'green')}}>
                                <p style={{color: 'black', position: 'relative', left: '40%', width: '100%'}}>{'Temperature: ' + data.Temperature + 'F'}</p>
                            </div>
                        </div>
                        <div id="regla">
                        </div>
                    </div>
                    <p style={{textAlign: 'center', width: '100%', marginTop: '20px'}}>
                        {'Last updated: ' + data.DateTime} <br/>
                    </p>
                </div>

                <div className="row text-center">

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/engine.jpg" alt="" />
                            <div className="card-body">
                                <h4 className="card-title">Engine</h4>
                                <p className="card-text">{'Status: ' + (data.EngineOn ? 'On' : 'Off')}</p>
                            </div>
                            <div className="card-footer">
                                <a style={{color: 'white', width: '80%'}} onClick={this.toggleEngine} className="btn btn-primary">{data.EngineOn ? 'Stop' : 'Start'}</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/ac.jpg" alt="" />
                            <div className="card-body">
                                <h4 className="card-title">Air Conditioner</h4>
                                <p className="card-text">{'Status: ' + (data.DoorsLocked ? 'On' : 'Off')}</p>
                            </div>
                            <div className="card-footer">
                                <a style={{color: 'white', width: '80%'}} onClick={this.toggleAC} className="btn btn-primary">{data.DoorsLocked ? 'Turn Off' : 'Turn On'}</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/door.jpg" alt="" />
                            <div className="card-body">
                                <h4 className="card-title">Door Locks</h4>
                                <p className="card-text">{'Status: ' + (data.DoorsLocked ? 'Locked' : 'Unlocked')}</p>
                            </div>
                            <div className="card-footer">
                                <a style={{color: 'white', width: '80%'}} onClick={this.toggleDoors} className="btn btn-primary">{data.WindowsUp ? 'Unlock' : 'Lock'}</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card">
                            <img className="card-img-top" style={{width: '100%'}} src={data.imageUrl} alt="" />
                            <div className="card-body">
                                <h4 className="card-title">Motion</h4>
                                <p className="card-text">{data.PIRalarm ? 'Motion detected' : 'No motion detected'}</p>
                            </div>
                            <div className="card-footer">
                                <a style={{color: 'white', width: '80%'}} onClick={() => window.location.href = data.imageUrl} className="btn btn-primary">View Interior</a>
                            </div>
                        </div>
                    </div>

                </div>



                <input type="button" name="loginbutton" value="Logout" onClick={() => window.location.href = 'logout'} />
                

            </div>
        )
    }
}