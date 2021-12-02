import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";

// import Login from './login'
// import Signup from './signup';

import Login from './components/login/Login'
import Signup from './components/signup/Signup'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/signup" exact component={Signup}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;