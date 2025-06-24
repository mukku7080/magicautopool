import React from 'react'

const Footer = () => {
    return (
        <footer className="main-footer">
            <div
                className="main-footer_bg"
                style={{ backgroundImage: "url(assets/images/background/7.jpg)" }}
            />
            <div className="auto-container">
                <div className="inner-container">
                    {/* Widgets Section */}
                    <div className="widgets-section">
                        <div className="row clearfix">
                            {/* Big Column */}
                            <div className="big-column col-lg-6 col-md-12 col-sm-12">
                                <div className="row clearfix">
                                    {/* Footer Column */}
                                    <div className="footer_column col-lg-7 col-md-6 col-sm-12">
                                        <div className="footer-widget footer-two_logo-widget">
                                            <div className="footer-logo">
                                                <a href="index.html">
                                                    <img src="assets/images/MagicAutpool White Logo.png" alt="" title="" />
                                                </a>
                                            </div>
                                            <div className="footer-text">
                                                Our goal is to help our companies all maintains of
                                                achieve best position team work occurings works the wise
                                                man therefore always holds these in matters to this
                                                principle.
                                            </div>
                                        </div>
                                    </div>
                                    {/* Footer Column */}
                                    <div className="footer_column col-lg-5 col-md-6 col-sm-12">
                                        <div className="footer-widget links-widget">
                                            <h4 className="footer-title">Usefull Links</h4>
                                            <ul className="footer-list">
                                                <li>
                                                    <a href="/about">About Us</a>
                                                </li>
                                                <li>
                                                    <a href="/faq">Faq</a>
                                                </li>
                                                <li>
                                                    <a href="/testimonials">Testimonial</a>
                                                </li>
                                                <li>
                                                    <a href="/privecy-policy">Privacy Policy</a>
                                                </li>
                                                <li>
                                                    <a href="/terms">Term & Condition</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Big Column */}
                            <div className="big-column col-lg-6 col-md-12 col-sm-12">
                                <div className="row clearfix">
                                    {/* Footer Column */}
                                    <div className="footer_column col-lg-5 col-md-6 col-sm-12">
                                        <div className="footer-widget contact-widget">
                                            <h4 className="footer-title">contact us</h4>
                                            <ul className="contact-options">
                                                <li>
                                                    <span>Email: </span>
                                                    <a href="mailto:hello@company.com">
                                                        hello@company.com
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    {/* Footer Column */}
                                    <div className="footer_column col-lg-6 col-md-6 col-sm-12">
                                        <div className="footer-widget community-widget">
                                            <h4 className="footer-title">our community</h4>
                                            <div className="footer-text">
                                                Here you'll find regular market updates, expert tips
                                                &amp; stories.
                                            </div>
                                            <div className="community-one_form">
                                                <form
                                                    method="post"
                                                    action="https://themerange.net/html/nesaan/contact.html"
                                                >
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            name="search-field"
                                                            defaultValue=""
                                                            placeholder="Enter Address"
                                                            required=""
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="theme-btn flaticon-email"
                                                            style={{
                                                                background:' linear-gradient(135deg,rgba(255, 12, 12, 0.8) 10 %,rgba(255, 77, 77, 0.7) 30 %,rgba(0, 32, 168, 0.8) 100 %)'
                                                            }}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="main-footer_copyright">
                            Copyright 2025 MagicAutoPool. Designed by{" "}
                            <a href="https://themeforest.net/user/noor_tech">noor_tech</a>
                        </div>
                        {/* Social Box */}
                        <div className="footer_socials">
                            <a href="https://facebook.com/">
                                <i className="fa-brands fa-facebook-f" />
                            </a>
                            <a href="https://twitter.com/">
                                <i className="fa-brands fa-twitter" />
                            </a>
                            <a href="https://youtube.com/">
                                <i className="fa-brands fa-youtube" />
                            </a>
                            <a href="https://instagram.com/">
                                <i className="fa-brands fa-instagram" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer