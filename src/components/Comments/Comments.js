import React, { Component } from "react";
import setInputHeight from "../SetInputHeight/SetInputHeight";

import "./Comments.css";

class Comments extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <div className="post-box mb-5 rounded shadow-lg mt-5">
          <div className="post-title py-2 text-center font-weight-bold border-bottom">
            Tittle
          </div>
          <div className="post-header p-3 row">
            <div className="user-photo mr-3 border rounded-circle"></div>
            <div className="">
              <div className="mb-2 text-capitalize font-weight-bold">
                username
              </div>
              <div className="postDateCreated">MMMM D,YYYY, h:mm:ss</div>
            </div>
          </div>
          <div className="post-description p-3 border-bottom">Description</div>
          <div className="post-photo container">
            <img
              alt=""
              src="https://media.istockphoto.com/photos/confident-woman-picture-id1163683003?k=6&m=1163683003&s=612x612&w=0&h=KLL7nR1C5tozz6OpPG-sZrRLxO78UQ2elVJOD-4QTqw="
            />
          </div>
          <div className="container post-footer d-flex justify-content-between px-4 py-2">
            <div className="text-secondary animation">
              2 <i className="fas fa-heart"></i>
            </div>
            <div className="text-secondary">2 Comments</div>
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
                onChange={(event) => setInputHeight(event, "40px")}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="container">
            <ul className="list-inline body p-3 d-flex align-items-center row">
              <li className="list-inline-item col-lg-3 col-md-4 col-sm-5 seperate row">
                <div className="text-center col-12 d-none d-md-block mb-3">
                  April 7, 2020 at 3:29 pm
                </div>
                <div className="userphoto mb-3"></div>
                <div className="text-center col-12 mb-3">George Giagkas</div>
              </li>
              <li className="list-inline-item col-lg col-md col-sm text-center row">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                quo iste atque cumque molestias, nulla doloribus asperiores
                necessitatibus delectus rerum, eum quae dolorem explicabo enim
                inventore cupiditate officia itaque sed?
              </li>
            </ul>
          </div>
          <div className="container">
            <ul className="list-inline body p-3 d-flex align-items-center row">
              <li className="list-inline-item col-lg-3 col-md-4 col-sm-5 seperate row">
                <div className="text-center col-12 d-none d-md-block mb-3">
                  February 7, 2021 at 3:29 pm
                </div>
                <div className="userphoto mb-3"></div>
                <div className="text-center col-12 mb-3">John Doe</div>
              </li>
              <li className="list-inline-item col-lg col-md col-sm text-center row">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                minima quam nemo architecto nihil sunt dolor, quis voluptatum
                veritatis atque modi. Maxime doloribus dolore impedit, ab fugit
                soluta molestias architecto. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Officiis possimus, nihil
                perferendis veritatis excepturi doloribus ratione voluptatem
                quos eligendi omnis rerum libero facilis mollitia quae, dolores
                blanditiis reiciendis! Voluptatum, atque. Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Error facere maiores aliquam
                veniam porro odio eum voluptatem doloribus ea voluptas
                voluptatibus impedit, dicta autem perspiciatis voluptates, quae
                voluptate incidunt. Praesentium? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Recusandae ipsam, voluptates non
                ipsa totam reprehenderit dolorum, quaerat deserunt pariatur
                nostrum exercitationem doloremque magnam, ea aperiam iste odio
                alias mollitia ullam! Fugiat dolor harum quod in, culpa nesciunt
                omnis error maiores rerum amet iste doloribus esse velit vel
                aliquid dolorem aperiam, pariatur qui ratione iure libero
                dolorum quia sint! Quas, eos. Iure amet incidunt velit provident
                eveniet doloribus placeat voluptatibus fugiat, facere ab eos
                voluptatum vel sit soluta totam expedita. Suscipit cumque ullam
                quia dicta, nemo aliquam libero alias maiores in? Nostrum,
                incidunt. Eligendi veniam dolores dolor sit ducimus iure, vel
                quam, ratione ex minus excepturi repudiandae ipsum id cupiditate
                voluptatum nobis labore. Similique error aliquid harum
                consequuntur blanditiis cupiditate omnis? Labore nostrum tenetur
                voluptatibus rerum mollitia, temporibus laudantium ex possimus
                deleniti quos. A in optio nesciunt explicabo officiis
                dignissimos, maiores praesentium repellendus sint obcaecati
                veritatis assumenda tempore necessitatibus, voluptatum atque?
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Comments;
