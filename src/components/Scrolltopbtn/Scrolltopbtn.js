import React, { useState } from 'react';
import './Scrolltopbtn.css';

const Scrolltopbtn = () => {

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 300) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 300) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="scrollTop" onClick={scrollTop} style={{ display: showScroll ? 'inline-flex' : 'none' }}>
            <i className="fas fa-angle-up fa-2x"></i>
        </div>
    );
}

export default Scrolltopbtn;