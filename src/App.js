import { Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import CreateCategories from "./components/CreateCategories/CreateCategories";
import CreatePosts from "./components/CreatePosts/CreatePosts";
import Posts from "./components/Posts/Posts";
import Comments from "./components/Comments/Comments";
import Navigationbar from "./components/Navigationbar/Navigationbar";
import NotFound from "./components/NotFound/NotFound";
import Scrolltopbtn from "./components/Scrolltopbtn/Scrolltopbtn";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <Scrolltopbtn />
          <Navigationbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createcategories" exact component={CreateCategories}/>
            <Route path="/createposts" exact component={CreatePosts} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/comments" exact component={Comments} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
