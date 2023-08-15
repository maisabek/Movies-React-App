import Axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import logo from '../../assets/images/logo.webp'
export default function Register() {
  const [error, setError] = useState('')
  let [errorList, setErrorList] = useState([])
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    mobile: '',
    email: '',
    password: ''
  })

  function validateRegisterForm() {
    let schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      mobile: Joi.number().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required()
    })
    return schema.validate(user, { abortEarly: false })
  }

  function getUserData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }

  async function submitRegisterForm(e) {
    e.preventDefault()
    let ValidationResult = validateRegisterForm()
    if (ValidationResult.error) {
      setErrorList(ValidationResult.error.details)
    } else {
      let response = await Axios.post(`http://209.126.85.136/tableers/api/Auth/Register`, user)
      console.log(response.status);
      if (response.status) {

      } else {
        setError('Error')
      }
    }
  }

  return (
    <>
      <div className='w-75 mx-auto mt-5 my-5'>
        {error.length > 0 ? <div className='alert alert-danger'>{error}</div> : ''}
        {errorList ? errorList.map((error, index) =>
          error.context.label == 'password' ? <div className='alert alert-danger' key={index}>Password Invalid</div> : <div className='alert alert-danger' key={index}>{error.message}</div>) : ''}
        <div className="col-md-12 mb-3 d-flex justify-content-center">
          <img src={logo} className='w-25' />
        </div>
        <form onSubmit={submitRegisterForm} className='row mt-1'>
          <div className="col-md-6">
            <label htmlFor="firstName">First Name : </label>
            <input type="text" id='firstName' name='firstName'
              className='form-control mb-3' onChange={getUserData} />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName">Last Name : </label>
            <input type="text" id='lastName' name='lastName'
              className='form-control mb-3' onChange={getUserData} />
          </div>

          <div className="col-md-6">
            <label htmlFor="username">username : </label>
            <input type="text" id='username' name='username'
              className='form-control mb-3' onChange={getUserData} />
          </div>

          <div className="col-md-6">
            <label htmlFor="mobile">mobile : </label>
            <input type="number" id='mobile' name='mobile'
              className='form-control mb-3' onChange={getUserData} />
          </div>

          <div className="col-md-6">
            <label htmlFor="email">Email : </label>
            <input type="email" id='email' name='email'
              className='form-control mb-3' onChange={getUserData} />
          </div>

          <div className="col-md-6">
            <label htmlFor="password">Password : </label>
            <input type="password" id='password' name='password'
              className='form-control mb-3' onChange={getUserData} />
          </div>


          <div className="col-md-12 d-flex justify-content-end mt-1">
            <button type='submit' className='btn btn-outline-info'>Register</button>
          </div>
        </form>
      </div>
    </>
  )
}
