import './App.css'
import Header from './Components/Header/Header'
import Pages from './routing'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
      {/* Contains the header */}
      <header className='header'>
        <Header />
      </header>
      {/* Will contain all main content */}
      <main className='main-section'>
        <Pages />
      </main>

      {/* will contain the footer */}
      <footer className='footer'>
        <Footer/>
      </footer>
    </>
  )
}

export default App
