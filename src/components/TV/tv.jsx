import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Tv() {
    let [trendingTV, setTrendingTV] = useState([])
    let paginationNums = new Array(13).fill(1).map((element, index) => index + 1)
    async function getTrendingTV(pageNumber) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=a631b24dc97d4274715c5fa6b5a60321&page=${pageNumber}`)
        setTrendingTV(data.results)
    }

    useEffect(() => {
        getTrendingTV(1)
    }, [])

    return (
        <>
            <div className="row py-5 justify-content-center">
                {
                    trendingTV.map((data, index) =>
                        <div className='col-md-2' key={index}>
                            <Link className="movie" to={'/tv/' + data.id}>
                                <img src={'https://image.tmdb.org/t/p/w500/' + data.poster_path} className='w-100' />
                                <h3 className='h6 my-2'>
                                    {data.name}
                                </h3>
                            </Link>
                        </div>
                    )
                }
                <div className="col-md-12 mt-5">
                    <nav aria-label="Page navigation  example">
                        <ul className="pagination d-flex justify-content-center">
                            {
                                paginationNums.map((data, index) =>
                                    <li className="page-item" key={index}>
                                        <a className="page-link bg-transparent text-white"
                                            onClick={() => getTrendingTV(data)}>{data}</a>
                                    </li>
                                )
                            }
                        </ul>
                    </nav>
                </div>
            </div>

        </>
    )
}
