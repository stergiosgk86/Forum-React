import React, { Component } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";
import "./Posts.css";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      loading: true,
      categoryId: forumSession.category.getId(),
      posts: [],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    api
      .getCategoryPosts(this.state.categoryId)
      .then((res) => {
        this.setState((state) => {
          state.posts = res.data;
          state.loading = true;
          return { state };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <div className="post-cover-image mb-5"></div>

        {this.state.posts.map((post) => console.log(post))}

        {this.state.posts.map((post) => console.log(post))}

        <div className="post-photo container">
          <img src="https://www.wallpapertip.com/wmimgs/179-1794513_erin-moriarty-hd.jpg" />
        </div>

        <div className="container">
          <Link to="/createposts" className="btn btn-success">
            Add Post
          </Link>
        </div>

        {/* <div className="pt-5">
          <div className="container">
            <ul className="list-inline header text-uppercase p-4 text-white font-weight-bold  d-flex align-items-center row">
              <li className="list-inline-item col-md-6">posts</li>
              <li className="list-inline-item col-md text-center">comments</li>
              <li className="list-inline-item col-md-3 text-center">
                last post
              </li>
            </ul>
          </div>
          <div className="container">
            <ul className="list-inline p-3 body d-flex align-items-center row">
              <li className="list-inline-item col-md-6 seperate">
                <Link to="/comments" className="link">
                  First Post
                </Link>
                <div className="inscription">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                </div>
              </li>
              <li className="list-inline-item col-md text-center font-weight-bold seperate">
                2
              </li>
              <li className="list-inline-item col-md-3 text-center">
                10 months, 1 week ago
              </li>
            </ul>
          </div>
          <div className="container">
            <ul className="list-inline body p-3 d-flex align-items-center row">
              <li className="list-inline-item col-md-6 seperate">
                <Link to="/comments" className="link">
                  Second Post
                </Link>
                <div className="inscription">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                </div>
              </li>
              <li className="list-inline-item col-md text-center font-weight-bold seperate">
                0
              </li>
              <li className="list-inline-item col-md-3 text-center">
                11 months, 3 weeks ago
              </li>
            </ul>
          </div>
        </div> */}
      </>
    );
  }
}

export default Posts;
