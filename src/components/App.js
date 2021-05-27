import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import Home from './home/Home.js';
import Register from './sign-up/SignUp.js';

import UserContext from './UserContext';

import Timeline from './Timeline/Timeline';
import MyPosts from './Timeline/MyPosts';
import OtherUsersPosts from './Timeline/OtherUsersPosts';

import GlobalStyle from './GlobalStyles';
import Header from './Header';
import MyLikes from './my-likes/MyLikes';
import Hashtag from './hashtag/Hashtag';


export default function App () {
    const [user, setUser] = useState([]);

    return (
    <UserContext.Provider value={{user, setUser}}> 
        <Router>
            <GlobalStyle/>
            <Switch>
                <Route path='/' exact>
                    <Home/>
                </Route>
                <Route path='/sign-up' exact>
                    <Register/>
                </Route>
                <Route path='/timeline' exact>
                    <Header/>
                    <Timeline/>
                </Route>
                <Route path='/my-posts' exact>
                    <Header/>
                    <MyPosts/>
                </Route>
                <Route path='/hashtag/:hashtag' exact>
                    <Header/>
                    <Hashtag/>
                </Route>
                <Route path='/user/:id' exact>
                    <Header/>
                    <OtherUsersPosts/>
                </Route>
                <Route path='/my-likes' exact>
                    <Header/>
                    <MyLikes />
                </Route>
            </Switch>
        </Router>
    </UserContext.Provider>
    )
}

