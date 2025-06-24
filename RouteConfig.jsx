import React from 'react'
import Home from './src/Pages/Home'
import Faq from './src/Pages/Faq'
import About from './src/Pages/About'
import Testimonials from './src/Pages/Testimonials'
import Privecy from './src/Pages/Privacy'
import Term from './src/Pages/Term'
import Contact from './src/Pages/Contact'
import CryptoServices from './src/Pages/CryptoServices'
import Login from './src/Pages/Login'
import UserDashboard from './src/user/UserDashboard'
import { Route, Routes } from 'react-router-dom'
import TermsServices from './src/Pages/TermsServices'



const RouteConfig = () => {
    return (
        <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/crypto_services' element={<CryptoServices />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/testimonials' element={<Testimonials />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/privecy-policy' element={<Privecy />} />
            <Route path='/terms' element={<TermsServices />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user/*' element={<UserDashboard />} />

        </Routes>
    )
}

export default RouteConfig