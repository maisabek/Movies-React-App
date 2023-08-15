import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MovieDetails() {
    const [movieDetails, SetMovieDetails] = useState({})
    async function GetMovieDetails(mediaType, id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=a631b24dc97d4274715c5fa6b5a60321&language=en-US&page=1`);
        SetMovieDetails(data)
    }
    let params = useParams()

    useEffect(() => {
        GetMovieDetails('movie', params.id)
    }, [])
    return (
        <>
        {movieDetails ? 
            <div className="row py-5">
                <div className="col-md-4">
                <img src={'https://image.tmdb.org/t/p/w500/' + movieDetails.poster_path} className='w-100' />
                </div>
                <div className="col-md-8">
                    <h6 className='mt-5'> {movieDetails.title} </h6>
                    <p className='py-3'> {movieDetails.overview}</p>
                    <ul className='list-unstyled'>
                        <li>- Budgets : {movieDetails.budget}</li>
                        <li>- Vote : {movieDetails.vote_count}</li>
                        <li>- Status : {movieDetails.status}</li>
                    </ul>
                </div>
            </div>
            : <div className='d-flex justify-content-center align-items-center vh-100'>
                <i className='fas fa-spinner fa-spin fa-3x'/>
              </div>
        }
           
        </>
    )
}
