import React, { Component } from "react";
import setInputHeight from "../SetInputHeight/SetInputHeight";
import { api } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";
import moment from "moment";
import "./Comments.css";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: forumSession.post.getId(),
      comments: [],
      userId: forumSession.user.getId(),
      post: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.keypress = this.keypress.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    api
      .getPostComments(this.state.postId)
      .then((res) => {
        this.setState((state) => {
          state.post = res.data.post;
          state.comments = res.data.comments;
          state.likes = res.data.likes;
          state.numComments = res.data.numComments;
          state.loading = true;
          return { state };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  keypress(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      api
        .saveComment(this.state.postId, {
          text: this.state.text,
          userId: this.state.userId,
        })
        .then((res) => {
          this.setState((state) => {
            state.comments = [...this.state.comments, res.data];
            state.numComments++;
            state.text = "";
            return state;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleChange(event) {
    setInputHeight(event, "40px");
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <>
        <div className="post-box mb-5 rounded shadow-lg mt-5 animated fadeInUp">
          <div className="post-title py-2 text-center font-weight-bold border-bottom">
            {this.state.post.title}
          </div>
          <div className="post-header p-3 row">
            <div className="user-photo mr-3 border rounded-circle"></div>
            <div className="">
              <div className="mb-2 text-capitalize font-weight-bold">
                {this.state.post.username}
              </div>
              <div className="postDateCreated">
                {moment(this.state.post.dateCreated).format(
                  "MMMM D,YYYY, h:mm:ss a"
                )}
              </div>
            </div>
          </div>
          <div className="post-description p-3 border-bottom">
            {this.state.post.description}
          </div>
          <div className="post-photo container">
            {this.state.post?.image ? (
              <img
                alt=""
                src={`data:image/jpeg;base64,${this.state.post.image}`}
              />
            ) : (
              ""
            )}
          </div>
          <div className="container post-footer d-flex justify-content-between px-4 py-2">
            <div className="text-secondary animation">
              {this.state.likes} <i className="fas fa-heart"></i>
            </div>
            <div className="text-secondary">
              {this.state.numComments} Comments
            </div>
          </div>

          <div className="input-group container border-top py-3">
            <div className="input-group-prepend">
              <div className="textArea-photo rounded-circle d-none d-md-block"></div>
            </div>
            <div className="col-md">
              <textarea
                rows="1"
                className="form-control textArea"
                aria-label="With textarea"
                placeholder="Write a comment..."
                name="text"
                value={this.state.text}
                onKeyPress={this.keypress}
                onChange={this.handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="pt-5">
          {this.state.comments.map((comment) => (
            <div className="container" key={comment.id}>
              <ul className="list-inline body p-3 d-flex align-items-center row">
                <li className="list-inline-item col-lg-3 col-md-4 col-sm-5 seperate row">
                  <div className="text-center col-12 d-none d-md-block mb-3">
                    {moment(comment.dateCreated).format(
                      "MMMM D,YYYY, h:mm:ss a"
                    )}
                  </div>
                  <div className="mb-3">
                    {this.state?.user?.image ? (
                      <img
                        alt=""
                        src={`data:image/jpeg;base64,${this.state.user.image}`}
                      />
                    ) : (
                      <img className="user-photo ml-5" alt="" src="" />
                    )}
                  </div>
                  <div className="text-center col-12 mb-3">
                    {comment.username}
                  </div>
                </li>
                <li className="list-inline-item col-lg col-md col-sm text-center row">
                  {comment.text}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Comments;
