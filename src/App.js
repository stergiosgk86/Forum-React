import { Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import Navigationbar from './components/Navigationbar/Navigationbar';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <Navigationbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
