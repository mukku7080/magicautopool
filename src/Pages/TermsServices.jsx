import React from 'react'

const TermsServices = () => {
    return (
        <section className="trading-three">
            <div className="auto-container">
                <div className="row clearfix">
                    {/* Accordian Column */}
                    <div className="trading-three_accordian-column col-lg-6 col-md-12 col-sm-12">
                        <div className="trading-three_accordian-outer">
                            {/* Sec Title */}

                            <div className="sec-title_title">Terms</div>
                            <h2 style={{ marginBottom: '30px' }} className="sec-title_heading">Terms & Conditions</h2>
                            {/* Accordion Box */}
                            <ul className="accordion-box">
                                {/* Block */}

                                {
                                    poolRules.map((item, index) => {
                                        return (


                                            <p key={index}>
                                                {item?.text}

                                            </p>

                                        )
                                    })
                                }








                            </ul>
                        </div>
                    </div>
                    {/* Video Column */}
                    <div className="trading-three_video-column col-lg-6 col-md-12 col-sm-12">
                        <div className="trading-three_video-outer">
                            <figure className="image">
                                <img src="https://cbvsdindia.com/media/blog-img/term.png" alt="" />
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
    )
}
const poolRules = [
    { id: 1, text: "Minimum Deposit: $10" },
    { id: 2, text: "Minimum Withdrawal: $10" },
    { id: 3, text: "Accepted Asset: USDT (BEP-20 only)" },
    { id: 4, text: "Reinvestment is required after earning 3x returns from the Auto Pool." },
    { id: 5, text: "Requires 2 active direct referrals to start earning auto income." },
    { id: 6, text: "International Tour Package: No referral is required to qualify." },
    { id: 7, text: "Auto Pool Participation: To activate Auto Pool income, the direct referrals must either:" },
    { id: 8, text: "Join the same pool, or Have a combined investment value equal to 200% of the Auto Pool amount." },
    { id: 9, text: "Pool Completion:Upon completion of the Auto Pool, income is transferred to the main wallet." },
    { id: 10, text: "The principal amount is refunded." },
    { id: 11, text: "If the user chooses, a new Auto Pool can be initiated." }
];


export default TermsServices