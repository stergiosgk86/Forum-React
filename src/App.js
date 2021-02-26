import { Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import Navigationbar from './components/Navigationbar/Navigationbar';
import NotFound from './components/NotFound/NotFound';
import Scrolltopbtn from './components/Scrolltopbtn/Scrolltopbtn';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <Scrolltopbtn />
          <Navigationbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
