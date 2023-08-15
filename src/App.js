import './App.css';
import Navbar from './layouts/navbar';
import Footer from './layouts/footer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MoviesList from './components/Movies/Movies-list';
import Home from './components/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import MovieDetails from './components/Movies/MovieDetails';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Tv from './components/TV/tv';
import People from './components/people/people';

function App() {
  let [UserData,setUserData]=useState({})
  let navigate=useNavigate()
  function GetUserData(){
    let token =localStorage.getItem('token')
    let decodedToken = jwtDecode(token)
    setUserData(decodedToken)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
     navigate('/home')
    }
  },[])
  
  return (
    <div>
      <Navbar userData={UserData}/>
       <div  className="container">
         <Routes>
          <Route path='' element={<Home />}/>
          <Route path='home' element={<Home />}/>
          <Route path='movies' element={<MoviesList />}/>
          <Route path='moviesDetails/:id' element={<MovieDetails />}/>
          <Route path='tv' element={<Tv />}/>
          <Route path='people' element={<People />}/>

          <Route path='login' element={<Login GetUserData={GetUserData}/>}/>
          <Route path='Register' element={<Register />}/>

         </Routes>
       </div>
      <Footer />
    </div>
  );
}

export default App;
