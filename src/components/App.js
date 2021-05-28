import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import { useState ,useEffect} from "react";
import GlobalStyle from './GlobalStyles';

import UserContext from './UserContext';

import Home from './home/Home.js';
import Register from './sign-up/SignUp.js';
import Timeline from './Timeline/Timeline';
import MyPosts from './Timeline/MyPosts';
import OtherUsersPosts from './Timeline/OtherUsersPosts';
import Header from './Header';
import MyLikes from './my-likes/MyLikes';
import Hashtag from './Timeline/Hashtag';

import EditAndDelete from './Timeline/EditAndDelete';

export default function App () {
    const [user, setUser] = useState(localStorage.lenght!==0 ? JSON.parse(localStorage.getItem('list')) : []);


  

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
                    <Header/>
                    <Timeline />
                </Route>
                <Route path='/my-posts' exact>
                    <Header/>
                    <MyPosts />
                </Route>
                <Route path='/hashtag/:hashtag' exact>
                    <Header/>
                    <Hashtag />
                </Route>
                <Route path='/user/:id' exact>
                    <Header/>
                    <OtherUsersPosts />
                </Route>
                <Route path='/my-likes' exact>
                    <Header/>
                    <MyLikes />
                </Route>
                <Route>
                    <EditAndDelete path='/teste' />
                    {/* lembar de apagar essa rota */}
                </Route>
            </Switch>
        </Router>
        </UserContext.Provider>

    );

}

