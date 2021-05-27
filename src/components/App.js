import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
<<<<<<< HEAD
import Home from './home/Home.js';
import Register from './sign-up/SignUp.js';

import GlobalStyle from './GlobalStyles';

import UserContext from './UserContext';


export default function App () {
    const [user, setUser] = useState([]);

    return (
        <UserContext.Provider value={{user, setUser}}>
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
        </UserContext.Provider>

=======
import { useState } from "react";
import UserContext from './UserContext';
import Home from './/home/Home.js';
import Register from './sign-up/SignUp.js';
import Timeline from './Timeline/Timeline'
import MyPosts from './Timeline/MyPosts'
import OtherUsersPosts from './Timeline/OtherUsersPosts'
import GlobalStyle from './GlobalStyles';
import Header from './Header';

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
                </Route>
                <Route path='/user/:id' exact>
                    <Header/>
                    <OtherUsersPosts/>
                </Route>
                <Route path='/my-likes' exact>
                    <Header/>
                </Route>
            </Switch>
        </Router>
        </UserContext.Provider>
>>>>>>> origin/feature-novo-post
    );
}

