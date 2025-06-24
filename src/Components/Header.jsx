import React from 'react'

const Header = () => {
    return (
        <header className="main-header header-style-four">
            {/* Header Top */}

            {/* Header Lower */}
            <div className="header-lower">
                <div className="auto-container">
                    <div className="inner-container">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <div className="left-box d-flex align-items-center flex-wrap">
                                {/* Logo Box */}
                                <div className="logo-box">
                                    <div className="logo">
                                        <a href="/">
                                            <img src="assets/images/MagicAutpool Logo.png" alt="" title="" />
                                        </a>
                                    </div>
                                </div>
                                {/* End Logo Box */}
                                {/* Nav Outer */}
                                <div className="nav-outer">
                                    {/* Main Menu */}
                                    <nav className="main-menu navbar-expand-md">
                                        <div className="navbar-header">
                                            {/* Toggle Button */}
                                            <button
                                                className="navbar-toggler"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target="#navbarSupportedContent"
                                                aria-controls="navbarSupportedContent"
                                                aria-expanded="false"
                                                aria-label="Toggle navigation"
                                            >
                                                <span className="icon-bar" />
                                                <span className="icon-bar" />
                                                <span className="icon-bar" />
                                            </button>
                                        </div>
                                        <div
                                            className="navbar-collapse collapse clearfix"
                                            id="navbarSupportedContent"
                                        >
                                            <ul className="navigation clearfix">
                                                <li>
                                                    <a href="/">Home</a>

                                                </li>
                                                <li >
                                                    <a href="/about">About</a>

                                                </li>

                                                <li >
                                                    <a href="/crypto_services">Plan</a>

                                                </li>

                                                <li>
                                                    <a href="/contact">Contact</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                {/* End Nav Outer */}
                            </div>
                            {/* Outer Box */}
                            <div className="outer-box d-flex align-items-center flex-wrap">

                                {/* Header Phone Box */}
                                <div className="header-phone_box">
                                    <div className="header-phone_box-inner">
                                        <button style={{ padding: '15px', backgroundColor: '#f04a52', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>Join Us</button>
                                    </div>
                                </div>
                                {/* Mobile Navigation Toggler */}
                                <div className="mobile-nav-toggler">
                                    <span className="icon flaticon-menu" />
                                </div>
                            </div>
                            {/* End Outer Box */}
                        </div>
                    </div>
                </div>
            </div>
            {/* End Header Lower */}
            {/* Mobile Menu  */}
            <div className="mobile-menu">
                <div className="menu-backdrop" />
                <div className="close-btn">
                    <span className="icon flaticon-close" />
                </div>
                <nav className="menu-box">
                    <div className="nav-logo">
                        <a href="index.html">
                            <img src="assets/images/logo.svg" alt="" title="" />
                        </a>
                    </div>
                    <div className="menu-outer">
                        {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
                    </div>
                </nav>
            </div>
            {/* End Mobile Menu */}

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
        </header>
    )
}

export default Header