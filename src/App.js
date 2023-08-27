import './App.css';
import Navbar from './layouts/navbar';
import Footer from './layouts/footer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MoviesList from './components/Movies/Movies-list';
import Home from './components/home/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import MovieDetails from './components/Movies/MovieDetails';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Tv from './components/TV/tv';
import People from './components/people/people';
import TvDetails from './components/TV/TvDetails';
import PeopleDetails from './components/people/PeopleDetails';
import MoviesContextProvider from './store/store';

function App() {
  let [UserData, setUserData] = useState({})
  let navigate = useNavigate()
  function GetUserData() {
    let token = localStorage.getItem('token')
    let decodedToken = jwtDecode(token)
    setUserData(decodedToken)
  }
  function LogOut() {
    setUserData(null)
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home')
    }
  }, [])

  return (
    <>
        <Navbar LogOut={LogOut} userData={UserData} />
        <div className="container">
        <MoviesContextProvider>
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='movies' element={<MoviesList />} />
            <Route path='moviesDetails/:id' element={<MovieDetails />} />
            <Route path='tv' element={<Tv />} />
            <Route path='tv/:id' element={<TvDetails />} />
            <Route path='people' element={<People />} />

            <Route path='people/:id' element={<PeopleDetails />} />
          
            <Route path='login' element={<Login GetUserData={GetUserData} />} />
            <Route path='Register' element={<Register />} />
           
          </Routes>
          </MoviesContextProvider>
        </div>
        <Footer />
    </>
  );
}

export default App;
