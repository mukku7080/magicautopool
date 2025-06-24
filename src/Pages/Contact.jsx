import React, { useEffect } from 'react'

const Contact = () => {


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

                {/* Page Title */}
                <section
                    className="page-title"
                    style={{ backgroundImage: "url(assets/images/background/21.jpg)" }}
                >
                    <div className="auto-container">
                        <h2>Contact Us</h2>
                        <ul className="bread-crumb clearfix">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </section>
                {/* End Page Title */}
                {/* Contact One */}
                <section className="contact-one" id="contact">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Info Column */}
                            <div className="contact-one_info-column col-lg-5 col-md-12 col-sm-12">
                                <div className="contact-one_info-column">
                                    {/* Sec Title */}
                                    <div className="sec-title">
                                        <div className="sec-title_title">Have Questions?</div>
                                        <h2 className="sec-title_heading">Get in Touch!</h2>
                                    </div>
                                    <ul className="info-blocks_one">
                                        <li>
                                            <span className="flaticon-maps-and-flags" />
                                            <strong>Office Address</strong>
                                            301 Princes Street, Sunset Blv. Palo <br /> Alto, California
                                        </li>
                                        <li>
                                            <span className="flaticon-telephone" />
                                            <strong>Phone Number</strong>
                                            <a href="tel:+92-207-823-7766">+92 207 823 7766</a> <br />
                                            <a href="tel:+92-207-253-4488">+92 207 253 4488</a>
                                        </li>
                                        <li>
                                            <span className="flaticon-envelope" />
                                            <strong>Mail Address</strong>
                                            <a href="mailto:info@exampler.com ">info@exampler.com</a>{" "}
                                            <br />
                                            <a href="mailto:example@mail.com">example@mail.com</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Form Column */}
                            <div className="contact-one_form-column col-lg-7 col-md-12 col-sm-12">
                                <div className="contact-one_form-column">
                                    {/* Contact Form */}
                                    <div className="comment-form contact-form">
                                        <form
                                            method="post"
                                            action="https://themerange.net/html/nesaan/blog.html"
                                        >
                                            <div className="row clearfix">
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        placeholder="Name"
                                                        required=""
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        placeholder="Email"
                                                        required=""
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="subject"
                                                        placeholder="subject"
                                                        required=""
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        placeholder="Phone"
                                                        required=""
                                                    />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <textarea
                                                        className=""
                                                        name="message"
                                                        placeholder="Your text here..."
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <div className="check-box">
                                                        <input
                                                            type="checkbox"
                                                            name="remember-password"
                                                            id="type-1"
                                                        />
                                                        <label htmlFor="type-1">
                                                            I agree that my submitted data is collected and
                                                            stored.
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <button className="theme-btn btn-style-one">
                                                        <span className="btn-wrap">
                                                            <span className="text-one">Send message</span>
                                                            <span className="text-two">Send message</span>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/* End Contact Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Contact One */}
                {/* Map One */}
                <section className="map-one">
                    <div className="auto-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d805184.6331292129!2d144.49266890254142!3d-37.97123689954809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1574408946759!5m2!1sen!2s"
                            allowFullScreen=""
                        />
                    </div>
                </section>
                {/* End Map One */}


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

export default Contact