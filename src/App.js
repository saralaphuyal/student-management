import { Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AddUpdate from './pages/AddUpdate';
import About from './pages/About';
import Search from './pages/Search';


function App() {
  return (
<>
<Navbar/>

<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/add" element={<AddUpdate/>}/>
  <Route path="/update/:id" element={<AddUpdate/>}/>
  <Route path="/search" element={<Search/>}/>
</Routes>
</>
  );
}

export default App;
