import {BrowserRouter as Router, Route, Link, Switch,} from "react-router-dom";

import Home from './pages/home'
import Comics from './pages/comics'
import NotFound from './pages/notfound'


const App = () => (
  <Router>
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/comics" exact component={Comics}/>
          <Route path="*" component={NotFound}/>
      </Switch>
  </Router>
);

export default App;
