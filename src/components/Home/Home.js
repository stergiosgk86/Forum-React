import React from 'react';
import { Carousel } from 'react-bootstrap';

import './Home.css';
import Trip1 from '../../Img/Trip1.jpg';
import Trip2 from '../../Img/Trip2.jpg';
import Trip3 from '../../Img/Trip3.jpg';

const Home = () => {
    return (
        <>
            <div className="pb-5">
                <Carousel>
                    <Carousel.Item>
                        <img className="carousel" src={Trip1} alt="" />
                        <Carousel.Caption>
                            <h3>This is the first slide</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousel" src={Trip2} alt="" />
                        <Carousel.Caption>
                            <h3>This is the second slide</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousel" src={Trip3} alt="" />
                        <Carousel.Caption>
                            <h3>This is the third slide</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

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
                            <div className="title">Best And Worst</div>
                            <div className="inscription">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                        </li>
                        <li className="list-inline-item col-md text-center font-weight-bold">2</li>
                        <li className="list-inline-item col-md text-center font-weight-bold">3</li>
                        <li className="list-inline-item col-md-3 text-center">10 months, 1 week ago</li>
                    </ul>
                </div>
                <div className="container">
                    <ul className="list-inline body p-3 font-weight-bold col-md-12">
                        <li className="list-inline-item col-md-5">forum</li>
                        <li className="list-inline-item col-md-2 text-center">0</li>
                        <li className="list-inline-item col-md-2 text-center">0</li>
                        <li className="list-inline-item col-md-2 text-right">last post</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home;
