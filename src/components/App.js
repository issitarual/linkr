import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import NewPost from './timeline/NewPost';

export default function App () {

    return (
        <Router>
            <GlobalStyle />
            <Switch>
                <Route path='/sign-up' exact>

                </Route>
                <Route path='/' exact>

                </Route>
                <Route path='/timeline' exact>
                    <NewPost />
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

    );

}

