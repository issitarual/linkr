import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Timeline from './Timeline/Timeline'

export default function App() {

    return (
        
        <Router>
           
            <Switch>
                <Route path='/' exact>
                    
                </Route>
                
                <Route path='/sign-up' exact>

                </Route>
                
                <Route path='/timeline' exact>
                    <Timeline/>
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

