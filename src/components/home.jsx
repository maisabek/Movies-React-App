import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import avater from '../assets/images/avatar-profile.jpg'
import { Link } from 'react-router-dom'
import $ from 'jquery' 

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTV, setTrendingTV] = useState([])
  const [trendingPerson, setTrendingPerson] = useState([])

  async function getTranding(MediaType, callback, pageNumber) {
    let { data } = await Axios.get(`https://api.themoviedb.org/3/trending/${MediaType}/day?api_key=a631b24dc97d4274715c5fa6b5a60321&page=${pageNumber}`)
    callback(data.results.slice(0,10))
  }

  useEffect(() => {
    getTranding('movie', setTrendingMovies, 1)
    getTranding('tv', setTrendingTV, 1)
    getTranding('person', setTrendingPerson, 1)
  }, [])
  return (
    <>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="line w-25 mb-3"></div>
            <h2 className='h3'>
              Trending <br /> Movies <br /> To Watch Right Now
            </h2>
            <p className='text-muted'>Top Trending Movies</p>
            <div className="line mt-3"></div>
          </div>
        </div>
        {
          trendingMovies.map((data, index) =>
            <div className='col-md-2' key={index}>
              <Link className="movie" to={"/moviesDetails/"+data.id}>
                <img src={'https://image.tmdb.org/t/p/w500/' + data.poster_path} className='w-100' />
                <h3 className='h6 my-2'>
                  {data.title}
                </h3>
              </Link>
            </div>
          )
        }
      </div>


      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="line w-25 mb-3"></div>
            <h2 className='h3'>
              Trending <br /> Tv <br /> To Watch Right Now
            </h2>
            <p className='text-muted'>Top Trending Tv</p>
            <div className="line mt-3"></div>
          </div>
        </div>
        {
          trendingTV.map((data, index) =>
            <div className='col-md-2' key={index}>
              <div className="movie">
                <img src={'https://image.tmdb.org/t/p/w500/' + data.poster_path} className='w-100' />
                <h3 className='h6 my-2'>
                  {data.name}
                </h3>
              </div>
            </div>
          )
        }
      </div>

  
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="line w-25 mb-3"></div>
            <h2 className='h3'>
              Trending <br /> Person <br />
            </h2>
            <p className='text-muted'>Top Trending Person</p>
            <div className="line mt-3"></div>
          </div>
        </div>
        {
          trendingPerson.map((data, index) =>
            <div className='col-md-2' key={index}>
              <div className="movie">
                {data.profile_path == null ? <img className='w-100' src={avater}/> :
                <img src={'https://image.tmdb.org/t/p/w500/' + data.profile_path} className='w-100' />
                }
                <h3 className='h6 my-2'>
                  {data.name}
                </h3>
              </div>
            </div>
          )
        }
      </div>
   
    </>
  )
}

