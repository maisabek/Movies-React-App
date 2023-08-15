import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import style from './people.module.css'
import avater from '../../assets/images/avatar-profile.jpg'

export default function PeopleDetails() {
    const [PeopleDetails, SetPeopleDetails] = useState({})
    async function GetPeopleDetails(mediaType, id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=a631b24dc97d4274715c5fa6b5a60321&language=en-US&page=1`);
        SetPeopleDetails(data)
    }
  
    let params = useParams()

    useEffect(() => {
        GetPeopleDetails('person', params.id)
    }, [])
    return (
        <>
            <div className="row py-2 justify-content-center">
                <div className="col-md-12 mt-4 mb-4 d-flex justify-content-between align-items-center">
                    <h4> {PeopleDetails.name} </h4>
                   {PeopleDetails.homepage? <Link className='btn btn-outline-info' to={PeopleDetails.homepage}>Home Page</Link> : ''} 
                </div>
                {PeopleDetails ?
                    <>
                        <div className="col-md-4 mt-2">
                            <div className={style.imageHeight}>
                                {PeopleDetails.profile_path == null ? <img className='w-100 h-100' src={avater} /> :
                                    <img src={'https://image.tmdb.org/t/p/w500/' + PeopleDetails.profile_path}
                                        className='w-100 h-100' />
                                }
                            </div>
                        </div>
                        <div className="col-md-8">
                            <p className='py-3'> {PeopleDetails.biography}</p>
                        </div>

                    </>
                    : <div className='d-flex justify-content-center align-items-center vh-100'>
                        <i class="fa-solid fa-spinner fa-spin fa-3x"></i>
                    </div>
                }

            </div>
        </>
    )
}
