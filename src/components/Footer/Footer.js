import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (

        <div className="page-footer text-white mt-5">

            <div className="social-bar">
                <div className="container">


                    <div className="row py-4 d-flex align-items-center">


                        <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                            <h6 className="mb-0">Get connected with us on social networks!</h6>
                        </div>



                        <div className="col-md-6 col-lg-7 text-center text-md-right">


                            <NavLink exact to="" className="fb-ic text-white">
                                <i className="fab fa-facebook-f mr-4"> </i>
                            </NavLink>

                            <NavLink exact to="" className="ins-ic text-white">
                                <i className="fab fa-instagram mr-4"> </i>
                            </NavLink>

                            <NavLink exact to="" className="tw-ic text-white">
                                <i className="fab fa-twitter mr-4"> </i>
                            </NavLink>

                            <NavLink exact to="" className="gplus-ic text-white">
                                <i className="fab fa-google-plus-g mr-4"> </i>
                            </NavLink>

                            <NavLink exact to="" className="li-ic text-white">
                                <i className="fab fa-linkedin-in"> </i>
                            </NavLink>


                        </div>


                    </div>


                </div>
            </div>


            <div className="container text-center text-md-left mt-5">


                <div className="row mt-3">


                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">


                        <h6 className="text-uppercase font-weight-bold">Company name</h6>
                        <hr className="underline mb-4 mt-0 d-inline-block mx-auto" />
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo facilis quae, id atque reiciendis distinctio,
                        repellendus dolore ratione consequatur eum itaque quos ducimus animi harum, quidem iusto placeat a maxime!
                        Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                        </p>

                    </div>



                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">


                        <h6 className="text-uppercase font-weight-bold">Products</h6>
                        <hr className="underline mb-4 mt-0 d-inline-block mx-auto" />
                        <p>
                            <NavLink exact to="" className="text-white">MDBootstrap</NavLink>
                        </p>
                        <p>
                            <NavLink exact to="" className="text-white">MDWordPress</NavLink>
                        </p>
                        <p>
                            <NavLink exact to="" className="text-white">BrandFlow</NavLink>
                        </p>
                        <p>
                            <NavLink exact to="" className="text-white">Bootstrap Angular</NavLink>
                        </p>

                    </div>



                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">


                        <h6 className="text-uppercase font-weight-bold">Useful links</h6>
                        <hr className="underline mb-4 mt-0 d-inline-block mx-auto" />
                        <p>
                            <NavLink exact to="" className="text-white">Your Account</NavLink>
                        </p>
                        <p>
                            <NavLink exact to="" className="text-white">Become an Affiliate</NavLink>
                        </p>
                        <p>
                            <NavLink exact to="" className="text-white">Shipping Rates</NavLink>
                        </p>
                        <p>
                            <NavLink exact to="" className="text-white">Help</NavLink>
                        </p>

                    </div>



                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                        <h6 className="text-uppercase font-weight-bold">Contact</h6>
                        <hr className="underline mb-4 mt-0 d-inline-block mx-auto" />
                        <p>
                            <i className="fas fa-home mr-3"></i> Athens, ATH 15344, GR</p>
                        <p>
                            <i className="fas fa-envelope mr-3"></i> Devills@gmail.com</p>
                        <p>
                            <i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                        <p>
                            <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>

                    </div>


                </div>


            </div>



            <div className="footer-copyright footer-bottom text-center py-3">&copy; {new Date().getFullYear()} - All Rights Reserved!</div>


        </div>
    )
}

export default Footer;