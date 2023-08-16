import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import style from './home.module.css'
import avater from '../../assets/images/avatar-profile.jpg'
import { movieContext } from '../../store/store'

export default function Home() {
let {trendingMovies,trendingTV,trendingPerson} =useContext(movieContext)
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
              <Link className="movie" to={'/tv/'+data.id}>
                <img src={'https://image.tmdb.org/t/p/w500/' + data.poster_path} className='w-100' />
                <h3 className='h6 my-2'>
                  {data.name}
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
              Trending <br /> Person <br />
            </h2>
            <p className='text-muted'>Top Trending Person</p>
            <div className="line mt-3"></div>
          </div>
        </div>
        {
          trendingPerson.map((data, index) =>
            <div className='col-md-2' key={index}>
              <Link className="movie" to={"/people/"+data.id}>
              <div className={style.imageHeight}>
                {
                data.profile_path == null ? 
                <img className='w-100 h-100' src={avater}/> :
                <img src={'https://image.tmdb.org/t/p/w500/' + data.profile_path} 
                className='w-100 h-100' />
                }
                </div>
                <h3 className='h6'>
                  {data.name}
                </h3>
              </Link>
            </div>
          )
        }
      </div>
   
    </>
  )
}

