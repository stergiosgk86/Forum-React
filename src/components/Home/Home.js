import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";
import Spinner from "../Spinner/Spinner";
import moment from 'moment';
import "./Home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    forumSession.user.saveId("5247");
    api
      .getCategories()
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="forum-image"></div>
      <div className="container pt-5">
        <div className="container">
          <ul className="list-inline header text-uppercase p-4 text-white font-weight-bold  d-flex align-items-center row">
            <li className="list-inline-item col-md-6 row">forum</li>
            <li className="list-inline-item col-md d-none d-md-block text-center row">
              posts
            </li>
            <li className="list-inline-item col-md d-none d-md-block text-center row">
              comments
            </li>
            <li className="list-inline-item col-md-3 d-none d-md-block text-center row">
              last comment
            </li>
          </ul>
        </div>
        {loading && (
          <h1 className="container text-center loading">
            Loading... <Spinner />
          </h1>
        )}
        {!loading && (
          <>
            {categories.map((category) => (
              <div className="container animated fadeInUp" key={category.id}>
                <ul className="list-inline p-3 body d-flex align-items-center row">
                  <li className="list-inline-item col-md-6 seperate text-truncate">
                    <Link
                      to="/posts"
                      onClick={() => forumSession.category.saveId(category.id)}
                      className="link"
                    >
                      {category.title}
                    </Link>
                    <div className="description text-truncate">
                      {category.description}
                    </div>
                  </li>
                  <li className="list-inline-item col-md d-none d-md-block text-center font-weight-bold seperate row">
                    {category.numPosts}
                  </li>
                  <li className="list-inline-item col-md d-none d-md-block text-center font-weight-bold seperate row">
                    {category.numComments}
                  </li>
                  <li className="list-inline-item col-md-3 d-none d-md-block text-center row">
                    {category.lastComment ? (
                      <>
                        <div className="text-secondary">
                          {moment(category?.lastComment?.dateCreated).fromNow()}
                        </div>
                        <div className="">
                          {category?.lastComment?.username}
                        </div>
                      </>
                    ) : (
                      <div className="font-weight-bold">No Comments</div>
                    )}
                  </li>
                </ul>
              </div>
            ))}
          </>
        )}
        <div className="container">
          <Link to="/createcategories" className="btn btn-success">
            Add Category
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
