import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function MoviesList() {
  const [trendingMovies, setTrendingMovies] = useState([])
  let NumOfPaginations = new Array(13).fill(1).map((element, index) => index + 1)

  async function getTranding(pageNumber) {
    let { data } = await Axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=a631b24dc97d4274715c5fa6b5a60321&page=${pageNumber}`)
    setTrendingMovies(data.results)
  }

  useEffect(() => {
    getTranding(1)
  }, [])
  return (
    <>
      <div className="row py-5 justify-content-center">
        {trendingMovies ?
          trendingMovies.map((data, index) =>
            <div className='col-md-2' key={index}>
              <Link className="movie" to={"/moviesDetails/" + data.id}>
                <img src={'https://image.tmdb.org/t/p/w500/' + data.poster_path} className='w-100' />
                <h3 className='h6 my-2'>
                  {data.title}
                </h3>
              </Link>
            </div>
          )
          :
          <div>
            <i className='fas fa-spinner fa-spin fa-3x' />
          </div>
        }
        <nav aria-label="Page navigation example mt-5">
          <ul className="pagination d-flex justify-content-center">
            {NumOfPaginations.map((PageNum) =>
              <li key={PageNum} onClick={()=>getTranding(PageNum)}
               className="page-item cursor-pointer">
                <a className="page-link bg-transparent text-white">{PageNum}</a>
              </li>
              )
            }
          </ul>
        </nav>
      </div>

    </>
  )
}

