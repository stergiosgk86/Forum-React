import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
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
                <div className="container">
                    <ul className="list-inline p-3 body d-flex align-items-center row">
                        <li className="list-inline-item col-md-6 seperate">
                            <Link to="/posts" className="link">First Forum</Link>
                            <div className="inscription">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                        </li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">2</li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">3</li>
                        <li className="list-inline-item col-md-3 text-center">10 months, 1 week ago</li>
                    </ul>
                </div>
                <div className="container">
                    <ul className="list-inline body p-3 d-flex align-items-center row">
                        <li className="list-inline-item col-md-6 seperate">
                            <Link to="/posts" className="link">Second Forum</Link>
                            <div className="inscription">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                        </li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">0</li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">0</li>
                        <li className="list-inline-item col-md-3 text-center">11 months, 3 weeks ago</li>
                    </ul>
                </div>
                <div className="container">
                    <ul className="list-inline body p-3 d-flex align-items-center row">
                        <li className="list-inline-item col-md-6 seperate">
                            <Link to="/posts" className="link">Third Forum</Link>
                            <div className="inscription">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                        </li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">5</li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">25</li>
                        <li className="list-inline-item col-md-3 text-center">11 months, 3 weeks ago</li>
                    </ul>
                </div>
                <div className="container">
                    <ul className="list-inline body p-3 d-flex align-items-center row">
                        <li className="list-inline-item col-md-6 seperate">
                            <Link to="/posts" className="link">Forth Forum</Link>
                            <div className="inscription">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                        </li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">3</li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">42</li>
                        <li className="list-inline-item col-md-3 text-center">11 months, 3 weeks ago</li>
                    </ul>
                </div>
                <div className="container">
                    <ul className="list-inline body p-3 d-flex align-items-center row">
                        <li className="list-inline-item col-md-6 seperate">
                            <Link to="/posts" className="link">Fifth Forum</Link>
                            <div className="inscription">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                        </li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">1</li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">68</li>
                        <li className="list-inline-item col-md-3 text-center">11 months, 3 weeks ago</li>
                    </ul>
                </div>
                <div className="container">
                    <ul className="list-inline body p-3 d-flex align-items-center row">
                        <li className="list-inline-item col-md-6 seperate">
                            <Link to="/posts" className="link">Sixth Forum</Link>
                            <div className="inscription">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                        </li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">17</li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">36</li>
                        <li className="list-inline-item col-md-3 text-center">11 months, 3 weeks ago</li>
                    </ul>
                </div>
                <div className="container">
                    <ul className="list-inline body p-3 d-flex align-items-center row">
                        <li className="list-inline-item col-md-6 seperate">
                            <Link to="/posts" className="link">Seventh Forum</Link>
                            <div className="inscription">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                        </li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">14</li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">26</li>
                        <li className="list-inline-item col-md-3 text-center">11 months, 3 weeks ago</li>
                    </ul>
                </div>
                <div className="container">
                    <ul className="list-inline body p-3 d-flex align-items-center row">
                        <li className="list-inline-item col-md-6 seperate">
                            <Link to="/posts" className="link">Eighth Forum</Link>
                            <div className="inscription">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                        </li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">13</li>
                        <li className="list-inline-item col-md text-center font-weight-bold seperate">9</li>
                        <li className="list-inline-item col-md-3 text-center">11 months, 3 weeks ago</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home;
