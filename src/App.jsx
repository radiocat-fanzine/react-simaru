import './App.css'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import NavBar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router'
import app from "../data/firebase"
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer'


export default function App() {
  const [ page, setPage ] = useState ("home")
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={ <ItemListContainer greeting ="Welcome to Simaru!🍃" /> }/>
        <Route path='/category/:categParam' element={<ItemListContainer/>} />
        <Route path='/detail/:idParam' element={ <ItemDetailContainer/>} />
        <Route path='/*' element={ <h1>404: Page not found</h1> } />
        <ItemListContainer/>
      </Routes>
    </BrowserRouter>)
}

