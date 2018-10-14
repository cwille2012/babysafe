import * as React from 'react';
import axios from 'axios';

interface IProps {}

export class Login extends React.Component<any, any> {
    constructor(props: IProps) {
        super(props as any);
    
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    login() {
        var data = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post('/login', data)
        .then(res => {
            if (res.status == 200 && !!res.data.token) {
                setCookie('token', res.data.token, 1);
                window.location.href = '/';
            } else {
                alert('Login failure, please try again');
            }
        })
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <input type="text" name="username" value={this.state.value} onChange={this.handleChange} />
                <input type="password" name="password" value={this.state.value} onChange={this.handleChange} />
                <input type="button" name="loginbutton" value="Login" onClick={this.login} />
            </div>
        )
    }
}

function setCookie(name:String ,value:String, days:Number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (+days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}