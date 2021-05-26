import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import React from 'react';

import Home from './/home/Home.js';
import Register from './sign-up/SignUp.js';

import GlobalStyle from './GlobalStyles';


export default function App () {

    return (
        <Router>
            <GlobalStyle />
            <Switch>
                <Route to='/' exact>
                    <Home />
                </Route>
                <Route to='/sign-up' exact>
                    <Register />
                </Route>
                <Route to='/timeline' exact>
                    
                </Route>
                <Route to='/my-posts' exact>
                    
                </Route>
                <Route to='/hashtag/:hashtag' exact>
                    
                </Route>
                <Route to='/user/:id' exact>
                    
                </Route>
                <Route to='/my-likes' exact>
                    
                </Route>
            </Switch>
        </Router>

    );

}

