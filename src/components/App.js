import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import React from 'react';
import { useState } from "react";
import UserContext from './UserContext';
import Home from './/home/Home.js';
import Register from './sign-up/SignUp.js';

export default function App () {
    const [user, setUser] = useState([]);


    return (
        <UserContext.Provider value={{user, setUser}}>
        <Router>
            <GlobalStyle />
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/sign-up' exact>
                    <Register />
                </Route>
                <Route path='/timeline' exact>
                    
                </Route>
                <Route path='/my-posts' exact>
                    
                </Route>
                <Route path='/hashtag/:hashtag' exact>
                    
                </Route>
                <Route path='/user/:id' exact>
                    
                </Route>
                <Route path='/my-likes' exact>
                    
                </Route>
            </Switch>
        </Router>
        </UserContext.Provider>

    );

}

