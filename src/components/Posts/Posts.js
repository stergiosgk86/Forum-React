import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Posts.css";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      categoryId: this.props.location?.categoryId,
      image: null,
      description: null,
      title: null,
      userId: "", // userId hardcoded value
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  encodeImage = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setState((prevState) => {
          prevState.image = reader.result;
          return { prevState };
        });
      };
    }
    console.log(this.state); //  for debugging
  };

  render() {
    return (
      <>
        <div className="post-cover-image mb-5"></div>

        <input type="file" id="imageFile" onChange={this.encodeImage} />

        <div className="post-photo container">
          {/* <img src="https://www.wallpapertip.com/wmimgs/179-1794513_erin-moriarty-hd.jpg" /> */}
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
