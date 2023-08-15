import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MovieDetails() {
    const [movieDetails, SetMovieDetails] = useState({})
    const [videos, SetVideoSource] = useState([])
    async function GetMovieDetails(mediaType, id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=a631b24dc97d4274715c5fa6b5a60321&language=en-US&page=1`);
        SetMovieDetails(data)
    }
    async function GetVideoSource(id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a631b24dc97d4274715c5fa6b5a60321&language=en-US`);
        SetVideoSource(data.results.slice(0,2))
    }
    let params = useParams()

    useEffect(() => {
        GetMovieDetails('movie', params.id)
        GetVideoSource(params.id)
    }, [])
    return (
        <>
            <div className="row py-2 justify-content-center align-items-center">
                <div className="col-md-12 mt-4 mb-4 d-flex justify-content-between align-items-center">
                    <h4> {movieDetails.title} </h4>
                    <p>{movieDetails.status}</p>
                </div>
                {
                    videos.map((video,index)=>
                    <div className="col-md-12 mb-5" key={index}>
                    <div className="video-trailer">
                        <iframe width="100%" height="455"
                            src={'https://www.youtube.com/embed/' + video.key}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>)
                }
               

                {movieDetails ?
                    <>
                        <div className="col-md-4 mt-2">
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
                    </>
                    : <div className='d-flex justify-content-center align-items-center vh-100'>
                        <i className='fas fa-spinner fa-spin fa-3x' />
                    </div>
                }

            </div>
        </>
    )
}
