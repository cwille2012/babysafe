import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
declare let module: any

var authenticated = false;
var authToken = getCookie('token');

if (authToken == 'mycustomtoken') {
    authenticated = true;
}

function logout() {
    eraseCookie('token');
    return true
}

var routes = (
    <Router>
        <Switch>

            <Route exact path="/" render={(props) => (
                authenticated 
                ? <Dashboard compiler="Typescript" framework="React" bundler="Webpack" />
                : <Redirect to="/login"/>
            )}/>

            <Route exact path="/login" render={(props) => (
                authenticated 
                ? <Redirect to="/"/>
                : <Login />
            )}/>

            <Route exact path="/logout" render={(props) => (
                logout()
                ? <Redirect to="/login"/>
                : <Redirect to="/"/>
            )}/>

        </Switch>
    </Router>
);

ReactDOM.render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}

function getCookie(name: String) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name: string) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}