import React from 'react'

const Cta = () => {
    return (
        <section className="cta-one">
            <div
                className="cta-one_bg"
                style={{ backgroundImage: "url(assets/images/background/6.png)" }}
            />
            <div className="auto-container">
                <div className="row clearfix">
                    {/* CTA One Image Column */}
                    <div className="cta-one_image-column col-lg-6 col-md-12 col-sm-12">
                        <div className="cta-one_image-outer">
                            <div className="cta-one_image">
                                <img src="assets/images/resource/cta.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    {/* CTA One Content Column */}
                    <div className="cta-one_content-column col-lg-6 col-md-12 col-sm-12">
                        <div className="cta-one_content-outer">
                            <h2 className="cta-one_title">
                                Subscribe Us To Recieve Career Updates
                            </h2>
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
                                            Subscribe Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cta