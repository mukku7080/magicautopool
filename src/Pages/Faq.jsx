import React from 'react'

const Faq = () => {
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
                        <h2>FAQ’s</h2>
                        <ul className="bread-crumb clearfix">
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>FAQ’s</li>
                        </ul>
                    </div>
                </section>
                {/* End Page Title */}
                {/* Faq Two */}
                <section className="faq-two">
                    <div className="auto-container">
                        <div className="inner-container">
                            {/* Sec Title */}
                            <div className="sec-title">
                                <div className="sec-title_title">Courses Offered</div>
                                <h2 className="sec-title_heading">
                                    Courses To Get You <br /> Started
                                </h2>
                            </div>
                            {/* Faq Info Tabs */}
                            <div className="faq-info-tabs">
                                {/* Faq Tabs */}
                                <div className="faq-tabs tabs-box">
                                    {/* Tab Btns */}
                                    <ul className="tab-btns tab-buttons clearfix">
                                        <li data-tab="#account" className="tab-btn active-btn">
                                            Account
                                        </li>
                                        <li data-tab="#company" className="tab-btn">
                                            Company
                                        </li>
                                        <li data-tab="#education" className="tab-btn">
                                            Education
                                        </li>
                                        <li data-tab="#forex" className="tab-btn">
                                            Forex
                                        </li>
                                        <li data-tab="#trading" className="tab-btn">
                                            Trading
                                        </li>
                                        <li data-tab="#withdraw" className="tab-btn">
                                            Withdrawals
                                        </li>
                                    </ul>
                                    {/* Tabs Container */}
                                    <div className="tabs-content">
                                        {/* Tab */}
                                        <div className="tab active-tab" id="account">
                                            {/* Accordion Box */}
                                            <ul className="accordion-box">
                                                {/* Block */}
                                                <li className="accordion block active-block">
                                                    <div className="number">1</div>
                                                    <div className="acc-btn active">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is margin?
                                                    </div>
                                                    <div className="acc-content current">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">2</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How can I start trading Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">3</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How much money do I need to start?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">4</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        Can I lose more than I invest in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">5</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What questions to ask about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">6</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is 90% rule in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">7</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What do I need to know about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">8</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What are the golden rules of Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Tab */}
                                        <div className="tab" id="company">
                                            {/* Accordion Box */}
                                            <ul className="accordion-box">
                                                {/* Block */}
                                                <li className="accordion block active-block">
                                                    <div className="number">1</div>
                                                    <div className="acc-btn active">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is margin?
                                                    </div>
                                                    <div className="acc-content current">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">2</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How can I start trading Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">3</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How much money do I need to start?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">4</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        Can I lose more than I invest in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">5</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What questions to ask about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">6</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is 90% rule in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">7</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What do I need to know about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">8</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What are the golden rules of Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Tab */}
                                        <div className="tab" id="education">
                                            {/* Accordion Box */}
                                            <ul className="accordion-box">
                                                {/* Block */}
                                                <li className="accordion block active-block">
                                                    <div className="number">1</div>
                                                    <div className="acc-btn active">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is margin?
                                                    </div>
                                                    <div className="acc-content current">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">2</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How can I start trading Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">3</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How much money do I need to start?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">4</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        Can I lose more than I invest in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">5</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What questions to ask about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">6</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is 90% rule in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">7</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What do I need to know about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">8</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What are the golden rules of Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Tab */}
                                        <div className="tab" id="forex">
                                            {/* Accordion Box */}
                                            <ul className="accordion-box">
                                                {/* Block */}
                                                <li className="accordion block active-block">
                                                    <div className="number">1</div>
                                                    <div className="acc-btn active">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is margin?
                                                    </div>
                                                    <div className="acc-content current">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">2</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How can I start trading Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">3</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How much money do I need to start?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">4</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        Can I lose more than I invest in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">5</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What questions to ask about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">6</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is 90% rule in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">7</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What do I need to know about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">8</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What are the golden rules of Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Tab */}
                                        <div className="tab" id="trading">
                                            {/* Accordion Box */}
                                            <ul className="accordion-box">
                                                {/* Block */}
                                                <li className="accordion block active-block">
                                                    <div className="number">1</div>
                                                    <div className="acc-btn active">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is margin?
                                                    </div>
                                                    <div className="acc-content current">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">2</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How can I start trading Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">3</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How much money do I need to start?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">4</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        Can I lose more than I invest in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">5</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What questions to ask about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">6</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is 90% rule in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">7</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What do I need to know about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">8</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What are the golden rules of Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Tab */}
                                        <div className="tab" id="withdraw">
                                            {/* Accordion Box */}
                                            <ul className="accordion-box">
                                                {/* Block */}
                                                <li className="accordion block active-block">
                                                    <div className="number">1</div>
                                                    <div className="acc-btn active">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is margin?
                                                    </div>
                                                    <div className="acc-content current">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">2</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How can I start trading Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">3</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        How much money do I need to start?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">4</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        Can I lose more than I invest in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">5</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What questions to ask about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">6</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What is 90% rule in Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Block */}
                                                <li className="accordion block">
                                                    <div className="number">7</div>
                                                    <div className="acc-btn">
                                                        <div className="icon-outer">
                                                            <span className="icon fa-solid fa-angle-down fa-fw" />
                                                        </div>
                                                        What do I need to know about Forex?
                                                    </div>
                                                    <div className="acc-content">
                                                        <div className="content">
                                                            <p>
                                                                Optio cumque nihil impedit quo minus id quod maxime
                                                                placeat facere commodo Nunc tempor amet massa diam
                                                                mauris Risus sodales interdum.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Faq Two */}


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
                <div className="search-popup">
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
                </div>
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

export default Faq