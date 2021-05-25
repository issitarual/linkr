import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import GlobalStyle from './GlobalStyles';

import Header from './Header';

export default function App () {

    return (
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

    );

}

