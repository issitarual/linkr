import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import { useState } from "react";
import GlobalStyle from './GlobalStyles';
import UserContext from './UserContext';
import Home from './home/Home.js';
import Register from './sign-up/SignUp.js';
import Timeline from './Timeline/Timeline';
import MyPosts from './Timeline/MyPosts';
import OtherUsersPosts from './Timeline/OtherUsersPosts';
import Header from './Header';
import MyLikes from './my-likes/MyLikes';
import Hashtag from './hashtag/Hashtag';
import LinkPreview from './Timeline/LinkPreview';




export default function App () {

    const [user, setUser] = useState(localStorage.lenght!==0 ? JSON.parse(localStorage.getItem('list')) : []);
    const [linkIsOpen, setLinkIsOpen] = useState(false);
    const [linkToOpen, setLinkToOpen] = useState('');

    function goToLink(e,link){
        e.preventDefault()
        setLinkIsOpen(!linkIsOpen);
        setLinkToOpen(link);
    }  

    return (
        <UserContext.Provider value={{user, setUser}}> 
            <Router>
                <GlobalStyle />
                <LinkPreview linkIsOpen={linkIsOpen} setLinkIsOpen={setLinkIsOpen} link={linkToOpen} />
                <Switch>
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/sign-up' exact>
                        <Register />
                    </Route>
                    <Route path='/timeline' exact>
                        <Header/>
                        <Timeline goToLink={goToLink} />
                    </Route>
                    <Route path='/my-posts' exact>
                        <Header/>
                        <MyPosts goToLink={goToLink} />
                    </Route>
                    <Route path='/hashtag/:hashtag' exact>
                        <Header/>
                        <Hashtag goToLink={goToLink} />
                    </Route>
                    <Route path='/user/:id' exact>
                        <Header/>
                        <OtherUsersPosts goToLink={goToLink} />
                    </Route>
                    <Route path='/my-likes' exact>
                        <Header/>
                        <MyLikes goToLink={goToLink} />
                    </Route>
                    
                </Switch>
            </Router>
        </UserContext.Provider>

    );

}

