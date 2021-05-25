import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import React from 'react';
import { useState } from "react";
import UserContext from './UserContext';
import Home from './/home/Home.js';
import Register from './sign-up/SignUp.js';

import Header from './Header';

export default function App () {
    const [user, setUser] = useState([]);


    return (
        <UserContext.Provider value={{user, setUser}}>
        <Router>
            <GlobalStyle />
            <Switch>
                <Route path='/' exact>

                </Route>
                <Route path='/sign-up' exact>

                </Route>
                <Route path='/timeline' exact>
                    <Header/>
                </Route>
                <Route path='/my-posts' exact>
                    <Header/>
                </Route>
                <Route path='/hashtag/:hashtag' exact>
                    <Header/>
                </Route>
                <Route path='/user/:id' exact>
                    <Header/>
                </Route>
                <Route path='/my-likes' exact>
                    <Header/>
                </Route>
            </Switch>
        </Router>
        </UserContext.Provider>

    );

}

