import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Account from './pages/Account'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Footer from './components/Footer'
import Analytics from './pages/Analytics'
import Focus from './pages/Focus'
import { isLoggedIn } from './functions'
import InvisNavbar from './components/InvisNavbar'
import Tasks from './pages/Tasks'


const App = () => {

  // Use state to store if the user is logged in or not
  const [loggedState, setLoggedState] = useState(isLoggedIn())

  // Function to change the background once logged in
  function backgroundChange() {
    if (!loggedState) {
      return ("bg-[url('./assets/mountain-bg-phone.jpg')] bg-no-repeat bg-cover bg-top sm:bg-[url('./assets/mountain-bg-cropped2.jpg')] bg-cover bg-fixed")
    } else {
      return ("bg-[url('./assets/mountain-bg2-cropped.jpg')] bg-cover bg-[center_top_2rem] bg-no-repeat")
    }
  }

  // loggedState prop passed to change the loggedState useState in this file
  // Route to pages using react-router-dom
  return (
    <>
      <div className={backgroundChange()}>
        <div>
          <Navbar setLoggedState={setLoggedState} loggedState={loggedState} />
          <InvisNavbar />
        </div>
        <div>
          <Routes>
            <Route index element={<Home setLoggedState={setLoggedState} loggedState={loggedState} />} />
            <Route path="Account" element={<Account loggedState={loggedState} />} />
            <Route path="Tasks" element={<Tasks loggedState={loggedState} />} />
            <Route path="Focus" element={<Focus loggedState={loggedState} />} />
            <Route path="Analytics" element={<Analytics loggedState={loggedState} />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </div>
        
      </div>
      <div className='bottom-0'>
        <Footer loggedState={loggedState} />
      </div>
    </>
  )
}

export default App