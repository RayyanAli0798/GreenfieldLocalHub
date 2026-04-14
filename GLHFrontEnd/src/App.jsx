import './App.css'
import Header from './Components/Header/Header'
import Pages from './routing'
import Footer from './Components/Footer/Footer'
import axios from 'axios'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import { useProducts } from './Contexts/ProductContext'
import { useState } from 'react'


function App() {

  const url1 = `http://127.0.0.1:8001/products/getting_products`
  const url2 = `http://127.0.0.1:8001/orders/getting_Orders`
  const { setProductsList, setOrdersList } = useProducts()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  useEffect(() => {
    axios.get(url1)
      .then((res) => {
        setProductsList(res?.data)
        console.log("Data Loaded")
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
    axios.get(url2)
      .then((res) => {
        setOrdersList(res?.data)
        console.log("Data Loaded")
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
      

  }, [location])

  if (error) {
    console.log("something went wrong, please visit again soon")
  }
  if (loading) {
    console.log("data currently loading")
  }

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
        <Footer />
      </footer>
    </>
  )
}

export default App
