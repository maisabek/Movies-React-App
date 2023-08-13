import './App.css';
import Navbar from './layouts/navbar';
import Footer from './layouts/footer';
import { Route, Routes } from 'react-router-dom';
import MoviesList from './components/Movies/Movies-list';
import Home from './components/home';
import Login from './components/auth/login';
import Register from './components/auth/register';

function App() {
  return (
    <div>
      <Navbar />
       <div  className="container">
         <Routes>
          <Route path='' element={<Home />}/>
          <Route path='home' element={<Home />}/>
          <Route path='movies' element={<MoviesList />}/>
          <Route path='login' element={<Login />}/>
          <Route path='Register' element={<Register />}/>

         </Routes>
       </div>
      <Footer />
    </div>
  );
}

export default App;
