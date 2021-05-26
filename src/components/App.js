import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
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

    );

}

