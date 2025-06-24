// import React from 'react'
import React, { useEffect } from 'react'

const About = () => {

    useEffect(() => {
        setTimeout(() => {
            if (window.initPageScripts) {
                window.initPageScripts(); // ✅ Now DOM is fully mounted
            } else {
                console.warn("initPageScripts not found");
            }
        }, 300); // Slight delay helps ensure full render
    }, []);
    return (
        <>
            <div className="page-wrapper">
                {/* Cursor */}
                <div className="cursor" />
                <div className="cursor-follower" />
                {/* Cursor End */}
                {/* Preloader */}
                <div className="preloader">
                    <div className="box" />
                </div>
                {/* Main Header */}

                {/* End Main Header */}
                {/* Page Title */}
                <section className="page-title" style={{ backgroundImage: "url(assets/images/background/21.jpg)" }}>
                    <div className="auto-container">
                        <h2>About us</h2>
                        <ul className="bread-crumb clearfix">
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>About Us</li>
                        </ul>
                    </div>
                </section>
                {/* End Page Title */}
                {/* About One */}
                <section className="about-one">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Image Column */}
                            <div className="about-one_image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="about-one_image-outer">
                                    <div className="about-one_experiance">
                                        <div className="about-one_experiance-inner">
                                            <div className="count-box">
                                                <div className="counter-block_one-counter">
                                                    <span className="odometer" data-count={25} />
                                                    Years
                                                </div>
                                            </div>
                                            <div className="about-one_experiance-text">
                                                of Experience in the Finance Service
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="about-one_vector"
                                        style={{
                                            backgroundImage: "url(assets/images/icons/vector-1.png)"
                                        }}
                                    />
                                    <div
                                        className="about-one_vector-two"
                                        style={{
                                            backgroundImage: "url(assets/images/icons/vector-1.png)"
                                        }}
                                    />
                                    <div className="about-one_star">
                                        <img src="assets/images/icons/star.png" alt="" />
                                    </div>
                                    <div className="about-one_image">
                                        <img src="assets/images/resource/about-2.jpg" alt="" />
                                    </div>
                                    <div className="about-one_image-two">
                                        <img src="assets/images/resource/about-1.jpg" alt="" />
                                    </div>
                                    <div className="about-one_image-three">
                                        <img src="assets/images/resource/about-3.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            {/* Content Column */}
                            <div className="about-one_content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="about-one_content-outer">
                                    {/* Sec Title */}
                                    <div className="sec-title">
                                        <div className="sec-title_title">About us</div>
                                        <h2 className="sec-title_heading">
                                            About Us
                                        </h2>
                                        <div className="sec-title_text">
                                            Magic Autopool is a USA-registered company that provides a smart
                                            and fully automated earning platform. Our system is based on a
                                            unique Auto-Pool model, where users can earn regular and
                                            automated income through pool participation and referral rewards.
                                            We combine the power of automated technology with crypto
                                            trading and dollar-based strategies to create consistent income
                                            opportunities for everyone. Whether you are active in referring
                                            others or prefer a hands-free approach, Magic Autopool offers
                                            multiple ways to grow your earnings.
                                            Our platform is simple, global, and designed for all users — from
                                            beginners to experienced individuals — with transparent systems,
                                            easy-to-follow plans, and daily income visibility.
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our mission */}
                <section className="trading-three">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Accordian Column */}
                            <div className="trading-three_accordian-column col-lg-6 col-md-12 col-sm-12">
                                <div className="trading-three_accordian-outer">
                                    {/* Sec Title */}

                                    <div className="sec-title_title">Our Mission
                                    </div>
                                    <h2 style={{ marginBottom: '30px' }} className="sec-title_heading">Our Mission
                                    </h2>
                                    {/* Accordion Box */}



                                    <div className="acc-content current">
                                        <div className="content">
                                            <p>
                                                At Magic Autopool, our mission is to empower people
                                                worldwide with a simple and fully automated platform
                                                that generates steady and recurring income. We
                                                believe everyone should have easy access to smart
                                                earning opportunities without complexity.
                                                We focus on building a transparent and trustworthy
                                                system where users of all levels can grow their income
                                                through automated pools, crypto trading, and network
                                                rewards.
                                                Our Mission
                                                MagicAutoPool
                                                Our goal is to create a strong global community driven by teamwork, innovation, and sustainable growth, helping
                                                everyone achieve long-term success. We are committed to continuous improvement and innovation to ensure our
                                                platform remains cutting-edge and user-friendly. By fostering trust and transparency, we aim to build lasting
                                                relationships with our community members.

                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* Video Column */}
                            <div className="trading-three_video-column col-lg-6 col-md-12 col-sm-12">
                                <div className="trading-three_video-outer">
                                    <figure className="image">
                                        <img src="https://lh5.googleusercontent.com/proxy/o_DvTpo3IOjZmJhNMQ26DOXrPCKr5pQHP2vy5S4MFknHnVa5LgXQnWw6lb2NBoG0FvUOF9klyFiGrHEGxRjsHtALCOTzfYlPx_RE0C4k9HOiqA" alt="" />
                                        <a
                                            href="https://www.youtube.com/watch?v=kxPCFljwJws"
                                            className="lightbox-video overlay-box"
                                        >
                                            <span className="flaticon-play">
                                                <i className="ripple" />
                                            </span>
                                        </a>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Our mission End */}
                {/* our Vision */}
                <section className="about-one">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Image Column */}
                            <div className="about-one_image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="about-one_image-outer">
                                    <div className="about-one_experiance">
                                        <div className="about-one_experiance-inner">
                                            <div className="count-box">
                                                <div className="counter-block_one-counter">
                                                    <span className="odometer" data-count={25} />
                                                    Years
                                                </div>
                                            </div>
                                            <div className="about-one_experiance-text">
                                                of Experience in the Finance Service
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="about-one_vector"
                                        style={{
                                            backgroundImage: "url(assets/images/icons/vector-1.png)"
                                        }}
                                    />
                                    <div
                                        className="about-one_vector-two"
                                        style={{
                                            backgroundImage: "url(assets/images/icons/vector-1.png)"
                                        }}
                                    />
                                    <div className="about-one_star">
                                        <img src="assets/images/icons/star.png" alt="" />
                                    </div>
                                    <div className="about-one_image">
                                        <img src="assets/images/resource/about-2.jpg" alt="" />
                                    </div>
                                    <div className="about-one_image-two">
                                        <img src="assets/images/resource/about-1.jpg" alt="" />
                                    </div>
                                    <div className="about-one_image-three">
                                        <img src="assets/images/resource/about-3.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            {/* Content Column */}
                            <div className="about-one_content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="about-one_content-outer">
                                    {/* Sec Title */}
                                    <div className="sec-title">
                                        <div className="sec-title_title">Our Vision</div>
                                        <h2 className="sec-title_heading">
                                            Our Vision
                                        </h2>
                                        <div className="sec-title_text">
                                            Our vision is to become a global leader in automated
                                            income platforms by providing innovative, reliable, and
                                            accessible earning opportunities for people
                                            everywhere. We aim to create a world where anyone
                                            can achieve financial freedom through smart
                                            technology and collaborative growth.
                                            We envision building a vibrant, supportive community
                                            that thrives on transparency, trust, and continuous
                                            innovation. By harnessing the power of automation and
                                            crypto technologies, Magic Autopool will empower
                                            individuals to unlock their full earning potential and
                                            enjoy sustainable success.

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Our Global Reasearch */}
                <section className="trading-three">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Accordian Column */}
                            <div className="trading-three_accordian-column col-lg-6 col-md-12 col-sm-12">
                                <div className="trading-three_accordian-outer">
                                    {/* Sec Title */}

                                    <div className="sec-title_title">Research
                                    </div>
                                    <h2 style={{ marginBottom: '30px' }} className="sec-title_heading">Our Global Research
                                    </h2>
                                    {/* Accordion Box */}



                                    <div className="acc-content current">
                                        <div className="content">
                                            <p>
                                                Magic Autopool is proud to serve a growing community
                                                of users from around the world. Our platform is
                                                designed to be accessible and user-friendly for people
                                                from diverse backgrounds, cultures, and countries.
                                                We support multiple currencies and provide 24/7
                                                automated earning opportunities, enabling members
                                                worldwide to participate and benefit regardless of their
                                                location.
                                                Our vision of a global network is supported by
                                                international rewards like tours and special bonuses,
                                                fostering a sense of unity and shared success among
                                                all members.
                                                Join us as we expand our footprint and create new
                                                pathways for global financial empowerment through
                                                innovation and teamwork.


                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* Video Column */}
                            <div className="trading-three_video-column col-lg-6 col-md-12 col-sm-12">
                                <div className="trading-three_video-outer">
                                    <figure className="image">
                                        <img src="https://media.istockphoto.com/id/1405728317/vector/global-network-connection-world-map-point-and-line-composition-concept-of-global-business.jpg?s=612x612&w=0&k=20&c=u_DZ9MwU6DFC0-TVD4qnZFmHDu2PoWYhDzppUaijv-c=" alt="" />
                                        <a
                                            href="https://www.youtube.com/watch?v=kxPCFljwJws"
                                            className="lightbox-video overlay-box"
                                        >
                                            <span className="flaticon-play">
                                                <i className="ripple" />
                                            </span>
                                        </a>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Our Global Research End */}

                {/* our vision end */}
                {/* End About One */}
                {/* Exchange One */}
                <section className="exchange-one">
                    <div
                        className="exchange-one_bg"
                        style={{ backgroundImage: "url(assets/images/background/4.jpg)" }}
                    />
                    <div className="auto-container">
                        {/* Sec Title */}
                        <div className="sec-title light centered">
                            <div className="sec-title_title">EXCHANGE CURRENCY</div>
                            <h2 className="sec-title_heading">Foreign Exchange Rate</h2>
                        </div>
                        {/* Exchange Info Tabs */}
                        <div className="exchange-info-tabs">
                            {/* Exchange Tabs */}
                            <div className="exchange-tabs tabs-box">
                                {/* Tab Btns */}
                                <ul className="tab-btns tab-buttons clearfix">
                                    <li data-tab="#foreign-exchange" className="tab-btn active-btn">
                                        Foreign Currency
                                    </li>
                                    <li data-tab="#crypto-exchange" className="tab-btn">
                                        Crypto Currency
                                    </li>
                                </ul>
                                {/* Tabs Container */}
                                <div className="tabs-content">
                                    {/* Tab */}
                                    <div className="tab active-tab" id="foreign-exchange">
                                        <div className="content d-flex align-items-center flex-wrap">
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/usd.jpg" alt="" />
                                                            </i>
                                                        </div>
                                                        usd
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/sweden.png" alt="" />
                                                            </i>
                                                        </div>
                                                        SEK
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/uk.png" alt="" />
                                                            </i>
                                                        </div>
                                                        GBP
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/japan.png" alt="" />
                                                            </i>
                                                        </div>
                                                        jpy
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img
                                                                    src="assets/images/icons/australia.png"
                                                                    alt=""
                                                                />
                                                            </i>
                                                        </div>
                                                        aud
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/canada.png" alt="" />
                                                            </i>
                                                        </div>
                                                        cad
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*Tab*/}
                                    <div className="tab" id="crypto-exchange">
                                        <div className="content d-flex align-items-center flex-wrap">
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/usd.jpg" alt="" />
                                                            </i>
                                                        </div>
                                                        usd
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/sweden.png" alt="" />
                                                            </i>
                                                        </div>
                                                        SEK
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/uk.png" alt="" />
                                                            </i>
                                                        </div>
                                                        GBP
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/japan.png" alt="" />
                                                            </i>
                                                        </div>
                                                        jpy
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img
                                                                    src="assets/images/icons/australia.png"
                                                                    alt=""
                                                                />
                                                            </i>
                                                        </div>
                                                        aud
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Currency Block One */}
                                            <div className="currency-block_one">
                                                <div className="currency-block_one-inner">
                                                    <div className="currency-block_one-upper">
                                                        <div className="currency-block_one-flag">
                                                            <i>
                                                                <img src="assets/images/icons/canada.png" alt="" />
                                                            </i>
                                                        </div>
                                                        cad
                                                    </div>
                                                    <ul className="currency-block_one-info">
                                                        <li>
                                                            send <span>62.82</span>
                                                        </li>
                                                        <li>
                                                            Receive <span>52.46</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Exchange One */}
                {/* App One */}
                <section className="app-one">
                    <div
                        className="app-one_bg"
                        style={{ backgroundImage: "url(assets/images/background/5.png)" }}
                    />
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* App One Title Column */}
                            <div className="app-one_image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="app-one_image-outer">
                                    <div className="app-one_image">
                                        <img src="assets/images/resource/app.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            {/* App One Content Column */}
                            <div className="app-one_content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="app-one_content-outer">
                                    {/* Sec Title */}
                                    <div className="sec-title">
                                        <div className="sec-title_title">Apply Your Card Now</div>
                                        <h2 className="sec-title_heading">
                                            Personalize Your Card &amp; Stand Out From Crowd
                                        </h2>
                                        <div className="sec-title_text">
                                            Desire that they cannot foresee the pain &amp; trouble that
                                            are bound too ensue equal blame belongs through shrinking.
                                        </div>
                                    </div>
                                    <ul className="app-one_list">
                                        <li>Great explorer of the master-builder</li>
                                        <li>The master-builder of great explorer</li>
                                    </ul>
                                    <h4 className="app-one_title">Apply for Credit Card</h4>
                                    <div className="app-one_form">
                                        <form
                                            method="post"
                                            action="https://themerange.net/html/nesaan/contact.html"
                                        >
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name="search-field"
                                                    defaultValue=""
                                                    placeholder="Enter your mail"
                                                    required=""
                                                />
                                                <button type="submit" className="theme-btn">
                                                    apply now
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End App One */}
                {/* Process One */}
                <section className="process-one">
                    <div className="auto-container">
                        {/* Sec Title */}
                        <div className="sec-title centered">
                            <div className="sec-title_title">Account Open PROCESS</div>
                            <h2 className="sec-title_heading">Open Bank Accounts</h2>
                        </div>
                        <div className="row clearfix">
                            {/* Process Block One */}
                            <div className="process-block_one col-lg-4 col-md-6 col-sm-12">
                                <div
                                    className="process-block_one-inner wow fadeInLeft"
                                    data-wow-delay="0ms"
                                    data-wow-duration="1500ms"
                                >
                                    <div className="process-block_one-icon_outer">
                                        <div className="process-block_one-number">01</div>
                                        <div className="process-block_one-icon">
                                            <i className="flaticon-document" />
                                        </div>
                                    </div>
                                    <div className="process-block_one-content">
                                        <h3 className="process-block_one-heading">
                                            Fill in The <br /> Required Form
                                        </h3>
                                        <div className="process-block_one-text">
                                            Must explain to you how work mistaken give you complete guide
                                            they cannot foresee pain.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Process Block One */}
                            <div className="process-block_one col-lg-4 col-md-6 col-sm-12">
                                <div
                                    className="process-block_one-inner wow fadeInUp"
                                    data-wow-delay="0ms"
                                    data-wow-duration="1500ms"
                                >
                                    <div className="process-block_one-icon_outer">
                                        <div className="process-block_one-number">02</div>
                                        <div className="process-block_one-icon">
                                            <i className="flaticon-email-1" />
                                        </div>
                                    </div>
                                    <div className="process-block_one-content">
                                        <h3 className="process-block_one-heading">
                                            Submit All Your Documents
                                        </h3>
                                        <div className="process-block_one-text">
                                            Business it will frequently occur that pleasures have to be
                                            repudiated and annoyances accepted.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Process Block One */}
                            <div className="process-block_one col-lg-4 col-md-6 col-sm-12">
                                <div
                                    className="process-block_one-inner wow fadeInRight"
                                    data-wow-delay="0ms"
                                    data-wow-duration="1500ms"
                                >
                                    <div className="process-block_one-icon_outer">
                                        <div className="process-block_one-number">03</div>
                                        <div className="process-block_one-icon">
                                            <i className="flaticon-trophy" />
                                        </div>
                                    </div>
                                    <div className="process-block_one-content">
                                        <h3 className="process-block_one-heading">
                                            Get Your Desire <br /> Account
                                        </h3>
                                        <div className="process-block_one-text">
                                            Being able to do what we like best every pleasure is to be
                                            welcomed and pain avoided but in certain.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Process One */}


                {/* Sidebar Cart Item */}
                <div className="xs-sidebar-group info-group">
                    <div className="xs-overlay xs-bg-black" />
                    <div className="xs-sidebar-widget">
                        <div className="sidebar-widget-container">
                            <div className="close-button">
                                <span className="fa-solid fa-xmark fa-fw" />
                            </div>
                            <div className="sidebar-textwidget">
                                {/* Sidebar Info Content */}
                                <div className="sidebar-info-contents">
                                    <div className="content-inner">
                                        {/* Title Box */}
                                        <div className="title-box">
                                            <h5>
                                                Banking at <span>Your Fingertips</span>
                                            </h5>
                                            <div className="price">$500 from free Commercial Bank</div>
                                        </div>
                                        {/* Empty Cart Box */}
                                        <div className="empty-cart-box">
                                            {/* No Product */}
                                            <div className="no-cart">
                                                <span className="icon fa-solid fa-cart-flatbed-suitcase fa-fw" />
                                                No products in cart.
                                            </div>
                                        </div>
                                        {/* Lower Box */}
                                        <div className="lower-box">
                                            <h5>
                                                Popular <span>Suggestions</span>
                                            </h5>
                                            {/* Post Block */}
                                            <div className="post-block">
                                                <div className="inner-box">
                                                    <div className="image">
                                                        <img
                                                            src="assets/images/resource/post-thumb-1.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h6>
                                                        <a href="#">Borrowing Accounts</a>
                                                    </h6>
                                                    <div className="rating">
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                    </div>
                                                    <div className="price-box">$49.00</div>
                                                    <a className="theme-btn bag-btn" href="#">
                                                        add to bag
                                                    </a>
                                                </div>
                                            </div>
                                            {/* Post Block */}
                                            <div className="post-block">
                                                <div className="inner-box">
                                                    <div className="image">
                                                        <img
                                                            src="assets/images/resource/post-thumb-2.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h6>
                                                        <a href="#">Digital Banking</a>
                                                    </h6>
                                                    <div className="rating">
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                    </div>
                                                    <div className="price-box">$59.00</div>
                                                    <a className="theme-btn bag-btn" href="#">
                                                        add to bag
                                                    </a>
                                                </div>
                                            </div>
                                            {/* Post Block */}
                                            <div className="post-block">
                                                <div className="inner-box">
                                                    <div className="image">
                                                        <img
                                                            src="assets/images/resource/post-thumb-3.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h6>
                                                        <a href="#">Mobile &amp; Web Banking</a>
                                                    </h6>
                                                    <div className="rating">
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                        <span className="fa fa-star" />
                                                    </div>
                                                    <div className="price-box">$69.00</div>
                                                    <a className="theme-btn bag-btn" href="#">
                                                        add to bag
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Sidebar Cart Item */}
                {/* Search Popup */}
                {/* <div className="search-popup">
                    <div className="color-layer" />
                    <button className="close-search">
                        <span className="flaticon-close" />
                    </button>
                    <form method="post" action="https://themerange.net/html/nesaan/blog.html">
                        <div className="form-group">
                            <input
                                type="search"
                                name="search-field"
                                defaultValue=""
                                placeholder="Search Here"
                                required=""
                            />
                            <button
                                className="fa fa-solid fa-magnifying-glass fa-fw"
                                type="submit"
                            />
                        </div>
                    </form>
                </div> */}
                {/* End Search Popup */}
                {/* Options Palate */}
                <div className="color-palate">
                    <div className="color-trigger">
                        <i className="fa fa-gear" />
                    </div>
                    <div className="color-palate-head">
                        <h6>Choose Options</h6>
                    </div>
                    {/* Colors */}
                    <div className="various-color clearfix">
                        <div className="colors-list">
                            <span
                                className="palate default-color active"
                                data-theme-file="assets/css/color-themes/default-color.css"
                            />
                            <span
                                className="palate blue-color"
                                data-theme-file="assets/css/color-themes/blue-color.css"
                            />
                            <span
                                className="palate olive-color"
                                data-theme-file="assets/css/color-themes/olive-color.css"
                            />
                            <span
                                className="palate orange-color"
                                data-theme-file="assets/css/color-themes/orange-color.css"
                            />
                            <span
                                className="palate purple-color"
                                data-theme-file="assets/css/color-themes/purple-color.css"
                            />
                            <span
                                className="palate green-color"
                                data-theme-file="assets/css/color-themes/green-color.css"
                            />
                            <span
                                className="palate brown-color"
                                data-theme-file="assets/css/color-themes/brown-color.css"
                            />
                            <span
                                className="palate yellow-color"
                                data-theme-file="assets/css/color-themes/yellow-color.css"
                            />
                        </div>
                    </div>
                    <h6>RTL Version</h6>
                    <ul className="rtl-version option-box">
                        {" "}
                        <li className="rtl">RTL Version</li> <li>LTR Version</li>{" "}
                    </ul>
                    <h6>Boxed Version</h6>
                    <ul className="box-version option-box">
                        {" "}
                        <li className="box">Boxed</li> <li>Full width</li>
                    </ul>
                    <h6>Want Sticky Header</h6>
                    <ul className="header-version option-box">
                        {" "}
                        <li className="box">No</li> <li>Yes</li>
                    </ul>
                </div>
                {/* End Options Palate */}
            </div>
            {/* End PageWrapper */}
            <div className="progress-wrap">
                <svg
                    className="progress-circle svg-content"
                    width="100%"
                    height="100%"
                    viewBox="-1 -1 102 102"
                >
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                </svg>
            </div>
        </>

    )
}

export default About