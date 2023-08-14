import  Axios  from 'axios';
import React, { useState } from 'react'

export default function Register() {
   const [error,setError] =useState('')
   const [user,setUser]=useState({
    first_name:'',
    last_name:'',
    age:'',
    email:'',
    password:''
   })
   
   function getUserData(e){
    let myUser={...user} // copy user
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
   }

   async function submitRegisterForm(e){
    // refresh form اللى الايفنت دة بيعملة اللى هو هنا ال behavior يمنع ال 
    e.preventDefault() 
   let response = await Axios.post(`https://64d8effe5f9bf5b879ceb829.mockapi.io/signup`,user)
    console.log(response.status);
    if(response.status){

    }else{
      setError('Error')
    }
   }

  return (
    <>
      <div className='w-75 mx-auto'>
        {error.length > 0 ?<div className='alert alert-danger'>{error}</div> :''}  
        <h5 className='mt-5'>Register Now</h5>
        <form onSubmit={submitRegisterForm}>
          <label htmlFor="first_name">First Name : </label>
          <input type="text" id='first_name' name='first_name'
            className='form-control mb-3' onChange={getUserData}/>

          <label htmlFor="last_name">Last Name : </label>
          <input type="text" id='last_name' name='last_name'
            className='form-control mb-3' onChange={getUserData}/>

          <label htmlFor="age">Age : </label>
          <input type="number" id='age' name='age'
            className='form-control mb-3' onChange={getUserData}/>

          <label htmlFor="email">Email : </label>
          <input type="email" id='email' name='email'
            className='form-control mb-3' onChange={getUserData}/>

          <label htmlFor="password">Password : </label>
          <input type="password" id='password' name='password'
            className='form-control mb-3' onChange={getUserData}/>

         <button type='submit' className='btn btn-outline-info'>Register</button>
        </form>
      </div>
    </>
  )
}
