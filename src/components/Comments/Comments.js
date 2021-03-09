import React, { Component } from "react";

import "./Comments.css";

class Comments extends Component {
  render() {
    return (
      <>
        <div className="comments-image"></div>
        <div className="pt-5">
          <div className="container">
            <ul className="list-inline header text-uppercase p-4 text-white font-weight-bold  d-flex align-items-center row">
              <li className="list-inline-item col-md-2">author</li>
              <li className="list-inline-item col-md">comments</li>
            </ul>
          </div>
          <div className="container">
            <ul className="">
              {/* <li className="list-inline-item">April 7, 2020 at 3:29 pm</li> */}
            </ul>
            <ul className="list-inline body p-3 d-flex align-items-center row">
              <li className="list-inline-item col-md-2 seperate">
                <div className="text-center">April 7, 2020 at 3:29 pm</div>
                <div className="userphoto"></div>
                <div className="text-center">George Giagkas</div>
              </li>
              <li className="list-inline-item col-md text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                quo iste atque cumque molestias, nulla doloribus asperiores
                necessitatibus delectus rerum, eum quae dolorem explicabo enim
                inventore cupiditate officia itaque sed?
              </li>
            </ul>
          </div>
          <div className="container">
            <ul className="">
              {/* <li className="list-inline-item">April 7, 2020 at 3:29 pm</li> */}
            </ul>
            <ul className="list-inline body p-3 d-flex align-items-center row">
              <li className="list-inline-item col-md-2 seperate">
                <div className="text-center">February 7, 2021 at 3:29 pm</div>
                <div className="userphoto"></div>
                <div className="text-center">John Doe</div>
              </li>
              <li className="list-inline-item col-md text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                minima quam nemo architecto nihil sunt dolor, quis voluptatum
                veritatis atque modi. Maxime doloribus dolore impedit, ab fugit
                soluta molestias architecto. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Officiis possimus, nihil
                perferendis veritatis excepturi doloribus ratione voluptatem
                quos eligendi omnis rerum libero facilis mollitia quae, dolores
                blanditiis reiciendis! Voluptatum, atque.
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Comments;
