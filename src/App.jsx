import './App.css'
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import NavBar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext'
import { AuthProvider } from "./context/AuthContext";
import CartContainer from './Components/CartContainer/CartContainer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import LoginView from './Components/Auth/LoginView';
import WishlistView from './Components/WishlistView/WishlistView';

export default function App() {

  return (

    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <BrowserRouter>
            <NavBar />
            {/*Contenedor de notificaciones AddToCart */}
            <ToastContainer 
              position="bottom-right" 
              autoClose={3000} 
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored" 
            />
            {/*Rutas de Navegacion */}
            <Routes>
              <Route path='/' element={< ItemListContainer greeting="Welcome to Simaru!🍃" />} />
              <Route path='/category/:categParam' element={< ItemListContainer />} />
              <Route path='/detail/:idParam' element={< ItemDetailContainer />} />
              <Route path='/cart' element={< CartContainer />} />
              <Route path="/login" element={<LoginView />} /> 
              <Route path='/profile' element={< UserProfile />} />
              <Route path="/wishlist" element={<WishlistView />} />
              <Route path='/*' element={<h1>404: Page not found</h1>} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </CartProvider> 

    </AuthProvider>

    
  )
}

