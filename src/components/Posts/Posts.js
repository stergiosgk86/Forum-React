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
        {/* <div className="post-cover-image mb-5"></div> */}

        {/* {this.state.posts.map((post) => console.log(post))} */}

        {this.state.posts.map((post) => (
          <div className="post-box mb-5 rounded shadow-lg mt-5" key={post.id}>
            <div className="post-title py-2 text-center font-weight-bold border-bottom">
              {post.title}
            </div>
            <div className="post-header p-3 row">
              <div className="user-photo mr-3 border rounded-circle"></div>
              <div className="">
                <div className="mb-2 text-capitalize font-weight-bold">
                  {post.username}
                </div>
                <div className="postDateCreated">{post.dateCreated}</div>
              </div>
            </div>
            <div className="post-description p-3 border-bottom">
              {post.description}
            </div>
            <div className="post-photo container">
              <img src={`data:image/jpeg;base64,${post.image}`} />
            </div>
            <div className="container post-footer d-flex justify-content-between px-4 py-2">
              <div className="text-secondary">
                0 <i className="fas fa-heart"></i>
              </div>
              <div className="text-secondary">2 Comments</div>
            </div>
            <div className="container border-top d-flex justify-content-between px-5 py-3">
              <div className="likeCommentBtn">
                <i className="far fa-thumbs-up"></i> Like
              </div>
              <Link to="/comments" className="likeCommentBtn">
                <div className="">
                  <i className="far fa-comment"></i> Comment
                </div>
              </Link>
            </div>
          </div>
        ))}

        <div className="container">
          <Link to="/createposts" className="btn btn-success">
            Add Post
          </Link>
        </div>
      </>
    );
  }
}

export default Posts;
