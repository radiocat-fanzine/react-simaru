import './App.css'
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import NavBar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router'
import { CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext'
import CartContainer from './Components/CartContainer/CartContainer'
import app, { getProducts } from './data/firebase'


export default function App() {
  getProducts();

  return (
    <CartProvider>
      <SearchProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={< ItemListContainer greeting="Welcome to Simaru!🍃" />} />
            <Route path='/category/:categParam' element={< ItemListContainer />} />
            <Route path='/detail/:idParam' element={< ItemDetailContainer />} />
            <Route path='/cart' element={< CartContainer />} />
            <Route path='/*' element={<h1>404: Page not found</h1>} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </CartProvider>
  )
}

