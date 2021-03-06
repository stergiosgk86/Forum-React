import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/Api";
import Spinner from "../Spinner/Spinner";
import "./Home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

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
      <div className="pt-5">
        <div className="container">
          <ul className="list-inline header text-uppercase p-4 text-white font-weight-bold  d-flex align-items-center row">
            <li className="list-inline-item col-md-6">forum</li>
            <li className="list-inline-item col-md text-center">posts</li>
            <li className="list-inline-item col-md text-center">comments</li>
            <li className="list-inline-item col-md-3 text-center">last post</li>
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
              <div className="container" key={category.id}>
                <ul className="list-inline p-3 body d-flex align-items-center row">
                  <li className="list-inline-item col-md-6 seperate">
                    <Link to="/posts" className="link">
                      {category.title}
                    </Link>
                    <div className="inscription">{category.description}</div>
                  </li>
                  <li className="list-inline-item col-md text-center font-weight-bold seperate">
                    {category.numPosts}
                  </li>
                  <li className="list-inline-item col-md text-center font-weight-bold seperate">
                    {category.numComments}
                  </li>
                  <li className="list-inline-item col-md-3 text-center">
                    {category?.lastComment?.dateCreated}
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
