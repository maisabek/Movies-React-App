import Axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Joi from 'joi';

export default function Login(props) {
  let [user, setUser] = useState({
    email: '',
    password: ''
  })

  let [ApiError, setApiError] = useState('')
  let [ErrorList, setErrorList] = useState([])
  let [loading, setLoading] = useState(false)

  let navigate = useNavigate()
  function getUserData(e) {
    let User = { ...user }
    User[e.target.name] = e.target.value;
    setUser(User)
  }

  function validateLoginForm() {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
    return schema.validate(user, { abortEarly: false })
  }
  async function submitLoginForm(e) {
    e.preventDefault()
    setLoading(true)
    let ValidationResult = validateLoginForm()
    console.log(ValidationResult);
    if(ValidationResult.error){
      setErrorList(ValidationResult.error.details)
      setLoading(false)
    } else {
      let response = await Axios.post(`http://209.126.85.136/tableers/api/Auth/Login`, user)
      console.log("response = ",response);

      if (response.status) {
        // localStorage.setItem("token", response.token)
        navigate('/home')
        setLoading(false)
        props.GetUserData()
      } else {
        // setApiError(response.error)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
   if(localStorage.getItem('token')){
    navigate('/home')
   }
  }, [])
  return (
    <>
    <div  className="mx-auto w-75 mt-5 py-5">
      {ApiError ? <div className="alert alert-danger">{ApiError}</div> : ''}
      {ErrorList ? ErrorList.map((error, index) =>
        <div className="alert alert-danger" key={index}>{error.message}</div>) : ''
      }

      <form onSubmit={submitLoginForm}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" className="form-control mb-3"
            onChange={getUserData} />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-control"
            onChange={getUserData} />
        </div>

        <button type="submit" className="btn btn-outline-info">
          Login
          {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : ''}
        </button>
      </form>
      </div>
    </>
  )
}