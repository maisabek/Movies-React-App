import  Axios  from "axios";
import { createContext, useEffect, useState } from "react";

export let movieContext=createContext(0)

export default function MoviesContextProvider(props){
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
    }, []);


   return <movieContext.Provider value={{trendingMovies,trendingTV,trendingPerson}}>
      {props.children}
    </movieContext.Provider>
}