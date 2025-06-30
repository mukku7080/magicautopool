import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Components/Header'
import Footer from './Components/Footer'
import RouteConfig from '../RouteConfig'
import Cta from './Components/Cta'
import HeaderExample from './Components/HeaderExample'
import ModernHeader from './Components/ModernHeader'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()

  // Check if current route is a user dashboard route
  const isUserDashboard = location.pathname.startsWith('/user')

  return (
    <>
      {!isUserDashboard && <ModernHeader />}
      <RouteConfig />
      {!isUserDashboard && <Cta />}
      {!isUserDashboard && <Footer />}
    </>
  )
}

export default App
