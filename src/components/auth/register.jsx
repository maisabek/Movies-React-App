import  Axios  from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'

export default function Register() {
   const [error,setError] =useState('')
   let [errorList,setErrorList] =useState([])
   const [user,setUser]=useState({
    firstName:'',
    lastName:'',
    username:'',
    mobile:'',
    email:'',
    password:''
   })

  function validateRegisterForm(){
   let schema =Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    username:Joi.string().required(),
    mobile:Joi.number().required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds:{allow:['com','net']}}).required(),
    password:Joi.string().pattern(new RegExp('^[a-z][A-Z]{1,9}$')).required()
   })
   return schema.validate(user,{ abortEarly: false })
  }
   
   function getUserData(e){
    let myUser={...user} 
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
   }

   async function submitRegisterForm(e){
    e.preventDefault()
    let ValidationResult = validateRegisterForm()
    console.log(ValidationResult);
    if(ValidationResult.error){
      setErrorList(ValidationResult.error.details)
    }else{
      let response = await Axios.post(`http://209.126.85.136/tableers/api/Auth/Register`,user)
      console.log(response.status);
      if(response.status){
  
      }else{
        setError('Error')
      }
    }
   }

  return (
    <>
      <div className='w-75 mx-auto mt-5 my-5'>
        {error.length > 0 ?<div className='alert alert-danger'>{error}</div> :''}  
        {errorList ? errorList.map((error,index)=><div className='alert alert-danger' key={index}>{error.message}</div> ):''}
        <h5 className='mt-5'>Register Now</h5>
        <form onSubmit={submitRegisterForm}>
          <label htmlFor="firstName">First Name : </label>
          <input type="text" id='firstName' name='firstName'
            className='form-control mb-3' onChange={getUserData}/>

          <label htmlFor="lastName">Last Name : </label>
          <input type="text" id='lastName' name='lastName'
            className='form-control mb-3' onChange={getUserData}/>

          <label htmlFor="username">username : </label>
          <input type="text" id='username' name='username'
            className='form-control mb-3' onChange={getUserData}/>

           <label htmlFor="mobile">mobile : </label>
          <input type="number" id='mobile' name='mobile'
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
