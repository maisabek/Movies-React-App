import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import avater from '../../assets/images/avatar-profile.jpg'
import style from './people.module.css'
import { Link } from 'react-router-dom'

export default function People() {
    let [TrendingPeople, setTrendingPeople] = useState([])
    let paginationNums = new Array(13).fill(1).map((element, index) => index + 1)
    async function getTrendingPeople(pageNumber) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=a631b24dc97d4274715c5fa6b5a60321&page=${pageNumber}`)
        setTrendingPeople(data.results)
    }

    useEffect(() => {
        getTrendingPeople(1)
    }, [])
    return (
        <>
            <div className="row py-5">
                {
                    TrendingPeople.map((person, index) =>
                        <div className='col-md-3' key={index}>
                            <Link className="movie" to={"/people/" + person.id}>
                                <div className={style.imageHeight}>
                                    {
                                    person.profile_path == null ? 
                                        <img className='w-100 h-100' src={avater} /> :
                                        <img src={'https://image.tmdb.org/t/p/w500/' + person.profile_path} className='w-100 h-100' />
                                    }
                                </div>
                            </Link>
                            <h5 className='h6'>{person.name}</h5>

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
                                            onClick={() => getTrendingPeople(data)}>{data}</a>
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
