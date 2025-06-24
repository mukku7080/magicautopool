import React, { useEffect } from 'react'

const Home = () => {


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
            <div className="page-wrapper" style={{ width: '100%' }}>
                {/* Cursor */}
                {/* <div className="cursor" /> */}
                {/* <div className="cursor-follower" /> */}
                {/* Cursor End */}
                {/* Preloader */}
                <div className="preloader">
                    <div className="box" />
                </div>
                {/* Main Header / Header Style Three */}
                {/* End Main Header */}
                {/* Slider Four */}
                <section className="slider-four">
                    <div className="single-item-carousel swiper-container">
                        <div className="swiper-wrapper">
                            {/* Slide */}
                            <div className="swiper-slide">
                                <div
                                    className="slider-four_image-layer"
                                    style={{
                                        backgroundImage: "url(assets/images/main-slider/6.jpg)"
                                    }}
                                />
                                <div className="auto-container">
                                    <div className="d-flex justify-content-end">
                                        {/* Content Column */}
                                        <div className="slider-four_content">
                                            <div className="slider-four_content-inner">
                                                <h1 className="slider-four_heading">
                                                    Trading for Anyone. Anywhere. Anytime.
                                                </h1>
                                                <div className="slider-four_text">
                                                    Trade over 1000 Instruments. Forex, CFDs on Stock Indices,{" "}
                                                    <br /> Commodities, Stocks, Metals and Energies.
                                                </div>
                                                <div className="slider-four_button d-flex align-items-center flex-wrap">
                                                    <a
                                                        href="register.html"
                                                        className="theme-btn btn-style-one"
                                                    >
                                                        <span className="btn-wrap">
                                                            <span className="text-one">Create Account</span>
                                                            <span className="text-two">Create Account</span>
                                                        </span>
                                                    </a>
                                                    <a href="about.html" className="theme-btn btn-style-one">
                                                        <span className="btn-wrap">
                                                            <span className="text-one">About us</span>
                                                            <span className="text-two">About us</span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Slide */}
                            <div className="swiper-slide">
                                <div
                                    className="slider-four_image-layer"
                                    style={{
                                        backgroundImage: "url(assets/images/main-slider/7.jpg)"
                                    }}
                                />
                                <div className="auto-container">
                                    <div className="d-flex justify-content-end">
                                        {/* Content Column */}
                                        <div className="slider-four_content">
                                            <div className="slider-four_content-inner">
                                                <h1 className="slider-four_heading">
                                                    Trading for Anyone. Anywhere. Anytime.
                                                </h1>
                                                <div className="slider-four_text">
                                                    Trade over 1000 Instruments. Forex, CFDs on Stock Indices,{" "}
                                                    <br /> Commodities, Stocks, Metals and Energies.
                                                </div>
                                                <div className="slider-four_button d-flex align-items-center flex-wrap">
                                                    <a
                                                        href="register.html"
                                                        className="theme-btn btn-style-one"
                                                    >
                                                        <span className="btn-wrap">
                                                            <span className="text-one">Create Account</span>
                                                            <span className="text-two">Create Account</span>
                                                        </span>
                                                    </a>
                                                    <a href="about.html" className="theme-btn btn-style-one">
                                                        <span className="btn-wrap">
                                                            <span className="text-one">About us</span>
                                                            <span className="text-two">About us</span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Slide */}
                            <div className="swiper-slide">
                                <div
                                    className="slider-four_image-layer"
                                    style={{
                                        backgroundImage: "url(assets/images/main-slider/8.jpg)"
                                    }}
                                />
                                <div className="auto-container">
                                    <div className="d-flex justify-content-end">
                                        {/* Content Column */}
                                        <div className="slider-four_content">
                                            <div className="slider-four_content-inner">
                                                <h1 className="slider-four_heading">
                                                    Trading for Anyone. Anywhere. Anytime.
                                                </h1>
                                                <div className="slider-four_text">
                                                    Trade over 1000 Instruments. Forex, CFDs on Stock Indices,{" "}
                                                    <br /> Commodities, Stocks, Metals and Energies.
                                                </div>
                                                <div className="slider-four_button d-flex align-items-center flex-wrap">
                                                    <a
                                                        href="register.html"
                                                        className="theme-btn btn-style-one"
                                                    >
                                                        <span className="btn-wrap">
                                                            <span className="text-one">Create Account</span>
                                                            <span className="text-two">Create Account</span>
                                                        </span>
                                                    </a>
                                                    <a href="about.html" className="theme-btn btn-style-one">
                                                        <span className="btn-wrap">
                                                            <span className="text-one">About us</span>
                                                            <span className="text-two">About us</span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-four-arrow">
                            {/* If we need navigation buttons */}
                            <div className="single-item-carousel_prev fas fa-arrow-left fa-fw" />
                            <div className="single-item-carousel_next fas fa-arrow-right fa-fw" />
                        </div>
                    </div>
                </section>
                {/* End Main Slider Section */}
                {/* Rates One */}
                <section className="rates-one style-two">
                    <div className="auto-container">
                        <div className="animation_mode">
                            {/* Coin One */}
                            <div className="coin-one">
                                <div className="coin-one_inner">
                                    <div className="coin-one_name">
                                        Ripple <span>-0.03</span>
                                    </div>
                                    <div className="coin-one_info">
                                        $0.6285 <span>-5.11%</span> $62846327808.735
                                    </div>
                                </div>
                            </div>
                            {/* Coin One */}
                            <div className="coin-one">
                                <div className="coin-one_inner">
                                    <div className="coin-one_name">
                                        Ethereum Classic <span>-1.06</span>
                                    </div>
                                    <div className="coin-one_info">
                                        $18.88 <span>-5.32%</span> $2719215894.5977
                                    </div>
                                </div>
                            </div>
                            {/* Coin One */}
                            <div className="coin-one">
                                <div className="coin-one_inner">
                                    <div className="coin-one_name">
                                        Litecoin <span>-0.84</span>
                                    </div>
                                    <div className="coin-one_info">
                                        $71.22 <span>-1.16%</span> $5261153554.8576
                                    </div>
                                </div>
                            </div>
                            {/* Coin One */}
                            <div className="coin-one">
                                <div className="coin-one_inner">
                                    <div className="coin-one_name">
                                        Ethereum <span>-78.12</span>
                                    </div>
                                    <div className="coin-one_info">
                                        $1,977.50 <span>-3.80%</span> $237806063605.17
                                    </div>
                                </div>
                            </div>
                            {/* Coin One */}
                            <div className="coin-one">
                                <div className="coin-one_inner">
                                    <div className="coin-one_name">
                                        Bitcoin <span>-1,021.00</span>
                                    </div>
                                    <div className="coin-one_info">
                                        $35,493.2 <span>-2.80%</span> $693629785031.29
                                    </div>
                                </div>
                            </div>
                            {/* Coin One */}
                            <div className="coin-one">
                                <div className="coin-one_inner">
                                    <div className="coin-one_name">
                                        DigitalCash <span>-1.02</span>
                                    </div>
                                    <div className="coin-one_info">
                                        $31.14 <span>-3.17%</span> $359278952.22048
                                    </div>
                                </div>
                            </div>
                            {/* Coin One */}
                            <div className="coin-one">
                                <div className="coin-one_inner">
                                    <div className="coin-one_name">
                                        Cardano <span>0.00</span>
                                    </div>
                                    <div className="coin-one_info">
                                        $0.3566 <span>-0.85%</span> $16046576751.859
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Rates One */}
                {/* Trading Two */}
                <section className="trading-two">
                    <div
                        className="trading-two_image-layer"
                        style={{ backgroundImage: "url(assets/images/background/25.png)" }}
                    />
                    <div className="auto-container">
                        {/* Sec Title */}
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <div className="sec-title_title">Income Types</div>
                            <h2 className="sec-title_heading">Income Types</h2>
                        </div>
                        <div className="row clearfix">
                            {/* Trading Block Two */}
                            <div className="trading-block_two col-lg-4 col-md-6 col-sm-6">
                                <div className="trading-block_two-inner">
                                    <div className="trading-block_two-icon">
                                        <i className="flaticon-bitcoin" />
                                    </div>
                                    <h5 className="trading-block_two-title">
                                        <a href="service-detail.html">Auto Pool Income </a>
                                    </h5>
                                    <div className="trading-block_two-text">
                                        Traders with professional accounts gain access to a wide range
                                        of benefits, including enhanced trading platforms
                                    </div>
                                    <a href="service-detail.html" className="trading-block_two-more">
                                        read more <i className="fa-solid fa-angles-right fa-fw" />
                                    </a>
                                </div>
                            </div>
                            {/* Trading Block Two */}
                            <div className="trading-block_two col-lg-4 col-md-6 col-sm-6">
                                <div className="trading-block_two-inner">
                                    <div className="trading-block_two-icon">
                                        <i className="flaticon-currencies" />
                                    </div>
                                    <h5 className="trading-block_two-title">
                                        <a href="service-detail.html">Reward Income</a>
                                    </h5>
                                    <div className="trading-block_two-text">
                                        Traders with professional accounts gain access to a wide range
                                        of benefits, including enhanced trading platforms
                                    </div>
                                    <a href="service-detail.html" className="trading-block_two-more">
                                        read more <i className="fa-solid fa-angles-right fa-fw" />
                                    </a>
                                </div>
                            </div>
                            {/* Trading Block Two */}
                            <div className="trading-block_two col-lg-4 col-md-6 col-sm-6">
                                <div className="trading-block_two-inner">
                                    <div className="trading-block_two-icon">
                                        <i className="flaticon-save-money" />
                                    </div>
                                    <h5 className="trading-block_two-title">
                                        <a href="service-detail.html">Monthly ROI</a>
                                    </h5>
                                    <div className="trading-block_two-text">
                                        Traders with professional accounts gain access to a wide range
                                        of benefits, including enhanced trading platforms
                                    </div>
                                    <a href="service-detail.html" className="trading-block_two-more">
                                        read more <i className="fa-solid fa-angles-right fa-fw" />
                                    </a>
                                </div>
                            </div>
                            {/* Trading Block Two */}
                            <div className="trading-block_two col-lg-4 col-md-6 col-sm-6">
                                <div className="trading-block_two-inner">
                                    <div className="trading-block_two-icon">
                                        <i className="flaticon-save-money" />
                                    </div>
                                    <h5 className="trading-block_two-title">
                                        <a href="service-detail.html">Magic Pool</a>
                                    </h5>
                                    <div className="trading-block_two-text">
                                        Traders with professional accounts gain access to a wide range
                                        of benefits, including enhanced trading platforms
                                    </div>
                                    <a href="service-detail.html" className="trading-block_two-more">
                                        read more <i className="fa-solid fa-angles-right fa-fw" />
                                    </a>
                                </div>
                            </div>
                            {/* Trading Block Two */}
                            <div className="trading-block_two col-lg-4 col-md-6 col-sm-6">
                                <div className="trading-block_two-inner">
                                    <div className="trading-block_two-icon">
                                        <i className="flaticon-save-money" />
                                    </div>
                                    <h5 className="trading-block_two-title">
                                        <a href="service-detail.html">Referral Income</a>
                                    </h5>
                                    <div className="trading-block_two-text">
                                        Traders with professional accounts gain access to a wide range
                                        of benefits, including enhanced trading platforms
                                    </div>
                                    <a href="service-detail.html" className="trading-block_two-more">
                                        read more <i className="fa-solid fa-angles-right fa-fw" />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                {/* End Trading Two */}
                {/* Trading Three */}
                <section className="trading-three">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Accordian Column */}
                            <div className="trading-three_accordian-column col-lg-6 col-md-12 col-sm-12">
                                <div className="trading-three_accordian-outer">
                                    {/* Sec Title */}

                                    <div className="sec-title_title">Home</div>
                                    <h2 style={{ marginBottom: '30px' }} className="sec-title_heading">MAGIC AUTOPOOL</h2>
                                    {/* Accordion Box */}
                                    <ul className="accordion-box">
                                        {/* Block */}
                                        <li className="accordion block active-block">


                                            <div className="acc-content current">
                                                <div className="content">
                                                    <p>
                                                        Magic Autopool is revolutionizing the way people
                                                        earn by combining fully automated income pools
                                                        with cutting-edge crypto trading strategies to
                                                        deliver consistent and sustainable growth
                                                        worldwide.

                                                    </p>
                                                </div>
                                            </div>
                                        </li>

                                        <h3>Your Gateway to Automated
                                            Income and Growth</h3>
                                    </ul>
                                </div>
                            </div>
                            {/* Video Column */}
                            <div className="trading-three_video-column col-lg-6 col-md-12 col-sm-12">
                                <div className="trading-three_video-outer">
                                    <figure className="image">
                                        <img src="assets/images/resource/video-1.jpg" alt="" />
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
                {/* End Trading Three */}
                {/* Counter One */}
                <section className="counter-one">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Counter Column */}
                            <div className="counter-block_one col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div
                                    className="counter-block_one-inner wow flipInX"
                                    data-wow-delay="0ms"
                                    data-wow-duration="1500ms"
                                >
                                    <span className="counter-block_one-icon flaticon-user" />
                                    <div className="counter-block_one-counter">
                                        <span className="odometer" data-count={25} />+
                                    </div>
                                    <div className="counter-block_one-text">Years of Experience</div>
                                </div>
                            </div>
                            {/* Counter Column */}
                            <div className="counter-block_one col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div
                                    className="counter-block_one-inner wow flipInX"
                                    data-wow-delay="150ms"
                                    data-wow-duration="1500ms"
                                >
                                    <span className="counter-block_one-icon flaticon-globe" />
                                    <div className="counter-block_one-counter">
                                        <span className="odometer" data-count={56} />k
                                    </div>
                                    <div className="counter-block_one-text">Worlds Clients</div>
                                </div>
                            </div>
                            {/* Counter Column */}
                            <div className="counter-block_one col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div
                                    className="counter-block_one-inner wow flipInX"
                                    data-wow-delay="300ms"
                                    data-wow-duration="1500ms"
                                >
                                    <span className="counter-block_one-icon flaticon-save-money" />
                                    <div className="counter-block_one-counter">
                                        <span className="odometer" data-count={42} />M
                                    </div>
                                    <div className="counter-block_one-text">Investment</div>
                                </div>
                            </div>
                            {/* Counter Column */}
                            <div className="counter-block_one col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div
                                    className="counter-block_one-inner wow flipInX"
                                    data-wow-delay="450ms"
                                    data-wow-duration="1500ms"
                                >
                                    <span className="counter-block_one-icon flaticon-success" />
                                    <div className="counter-block_one-counter">
                                        <span className="odometer" data-count={52} />k
                                    </div>
                                    <div className="counter-block_one-text">Awards</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Counter One */}
                {/* Trading Four */}
                <section className="trading-four">
                    <div className="auto-container">
                        <div style={{ textAlign: 'center', marginBottom: "50px" }} >
                            <div className="sec-title_title" >Global Partners</div>
                            <h2 className="sec-title_heading">Our Global Partners</h2>
                        </div>
                        <p style={{ fontSize: "18px" }}>
                            Magic Autopool works closely with a network of trusted partners from around the world who bring expertise in
                            crypto trading, blockchain technology, payment processing, and marketing. These collaborations allow us to
                            build a secure, efficient, and scalable platform that meets the needs of our diverse global community. Our
                            partners provide us with access to the latest technologies and market insights, helping us expand into new
                            regions and connect with a wider audience. By working together, we ensure transparent operations and timely
                            delivery of rewards and support to all members. Through these strong international partnerships, Magic
                            Autopool continues to innovate and empower users across the globe.

                        </p>
                    </div>
                </section>
                <section>
                    <div className="marquee-wrapper py-4">
                        <div className="marquee-content d-flex">
                            {images.map((src, index) => (
                                <div key={index} className="marquee-item me-3">
                                    <img
                                        src={src}
                                        alt={`Image ${index + 1}`}
                                        className="rounded shadow"
                                        style={{ height: '150px', width: 'auto' }}
                                    />
                                </div>
                            ))}
                            {/* Duplicate to create seamless loop */}
                            {images.map((src, index) => (
                                <div key={`dup-${index}`} className="marquee-item me-3">
                                    <img
                                        src={src}
                                        alt={`Image ${index + 1}`}
                                        className="rounded shadow"
                                        style={{ height: '150px', width: 'auto' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* End Trading Four */}
                {/* Exchange One */}
                <section className="exchange-one style-two">
                    <div
                        className="exchange-one_bg"
                        style={{ backgroundImage: "url(assets/images/background/4.jpg)" }}
                    />
                    <div className="auto-container">
                        {/* Sec Title */}
                        <div className="sec-title light title-anim centered">
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
                {/* Process Two */}
                <section className="process-two">
                    <div className="auto-container">
                        {/* Sec Title */}
                        <div className="sec-title title-anim centered">
                            <div className="sec-title_title">Process</div>
                            <h2 className="sec-title_heading">How It Works</h2>
                        </div>
                        <div className="row clearfix">
                            {/* Process Two Content Column */}
                            <div className="process-two_content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="process-two_content-outer">
                                    {/* Process Block Two */}
                                    <div className="process-block_two">
                                        <div className="process-block_two-inner">
                                            <div className="process-block_two-content">
                                                <div className="process-block_two-number">01</div>
                                                <h4 className="process-block_two-title">
                                                    Sign up, It's Free!
                                                </h4>
                                                <div className="process-block_two-text">
                                                    Our team will set up your account and help you build job
                                                    to easy-to-use web dashboard.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Process Block Two */}
                                    <div className="process-block_two">
                                        <div className="process-block_two-inner">
                                            <div className="process-block_two-content">
                                                <div className="process-block_two-number">02</div>
                                                <h4 className="process-block_two-title">
                                                    Find best Deals and Invest
                                                </h4>
                                                <div className="process-block_two-text">
                                                    Our team will set up your account and help you build job
                                                    to easy-to-use web dashboard.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Process Block Two */}
                                    <div className="process-block_two">
                                        <div className="process-block_two-inner">
                                            <div className="process-block_two-content">
                                                <div className="process-block_two-number">03</div>
                                                <h4 className="process-block_two-title">
                                                    Get you profit back
                                                </h4>
                                                <div className="process-block_two-text">
                                                    Our team will set up your account and help you build job
                                                    to easy-to-use web dashboard.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Process Two Image Column */}
                            <div className="process-two_image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="process-two_image-outer">
                                    <div className="process-two_image">
                                        <img src="assets/images/resource/process.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Process Two */}
                {/* Award One */}
                <section className="award-one">
                    <div
                        className="award-one_image-layer"
                        style={{ backgroundImage: "url(assets/images/background/25.png)" }}
                    />
                    <div className="auto-container">
                        {/* Sec Title */}
                        <div className="sec-title title-anim centered">
                            <div className="sec-title_title">AWARDED BY THE BEST</div>
                            <h2 className="sec-title_heading">Globally Awarded</h2>
                        </div>
                        {/* Award Block One */}
                        <div className="award-block_one">
                            <div className="award-block_one-inner">
                                <div className="award-block_one-content d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="award-block_one-number">01</div>
                                    <h4 className="award-block_one-title">
                                        <a href="#">The Best Trading Platform, UK</a>
                                    </h4>
                                    <div className="award-block_one-category">x1</div>
                                    <h4 className="award-block_one-logo">
                                        <a href="#">
                                            <img src="assets/images/clients/11.png" alt="" />
                                        </a>
                                    </h4>
                                    <div className="award-block_one-year">2005</div>
                                </div>
                            </div>
                        </div>
                        {/* Award Block One */}
                        <div className="award-block_one">
                            <div className="award-block_one-inner">
                                <div className="award-block_one-content d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="award-block_one-number">02</div>
                                    <h4 className="award-block_one-title">
                                        <a href="#">Awards Interior Excellence</a>
                                    </h4>
                                    <div className="award-block_one-category">x2</div>
                                    <h4 className="award-block_one-logo">
                                        <a href="#">
                                            <img src="assets/images/clients/11.png" alt="" />
                                        </a>
                                    </h4>
                                    <div className="award-block_one-year">2010</div>
                                </div>
                            </div>
                        </div>
                        {/* Award Block One */}
                        <div className="award-block_one">
                            <div className="award-block_one-inner">
                                <div className="award-block_one-content d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="award-block_one-number">03</div>
                                    <h4 className="award-block_one-title">
                                        <a href="#">The Best Trading Platform, UK</a>
                                    </h4>
                                    <div className="award-block_one-category">x3</div>
                                    <h4 className="award-block_one-logo">
                                        <a href="#">
                                            <img src="assets/images/clients/11.png" alt="" />
                                        </a>
                                    </h4>
                                    <div className="award-block_one-year">2015</div>
                                </div>
                            </div>
                        </div>
                        {/* Award Block One */}
                        <div className="award-block_one">
                            <div className="award-block_one-inner">
                                <div className="award-block_one-content d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="award-block_one-number">04</div>
                                    <h4 className="award-block_one-title">
                                        <a href="#">Advance HighTechnology Trade</a>
                                    </h4>
                                    <div className="award-block_one-category">x4</div>
                                    <h4 className="award-block_one-logo">
                                        <a href="#">
                                            <img src="assets/images/clients/11.png" alt="" />
                                        </a>
                                    </h4>
                                    <div className="award-block_one-year">2020</div>
                                </div>
                            </div>
                        </div>
                        {/* Award Block One */}
                        <div className="award-block_one">
                            <div className="award-block_one-inner">
                                <div className="award-block_one-content d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="award-block_one-number">05</div>
                                    <h4 className="award-block_one-title">
                                        <a href="#">The Best Trading Platform, London</a>
                                    </h4>
                                    <div className="award-block_one-category">x5</div>
                                    <h4 className="award-block_one-logo">
                                        <a href="#">
                                            <img src="assets/images/clients/11.png" alt="" />
                                        </a>
                                    </h4>
                                    <div className="award-block_one-year">2025</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Award One */}
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
                                    <div className="sec-title title-anim">
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

                {/* CTA One */}

                {/* End App One */}
                {/* Main Footer */}
                {/* ----------------------------- */}
                {/* End Footer Style */}
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


const images = [
    'assets/images/1.png',
    'assets/images/2.png',
    'assets/images/3.png',
    'assets/images/4.png',
    'assets/images/5.png',
    'assets/images/6.png',
    'assets/images/7.png',
    'assets/images/8.png',
    'assets/images/9.png',
    'assets/images/10.png',
    'assets/images/11.png',
];
export default Home