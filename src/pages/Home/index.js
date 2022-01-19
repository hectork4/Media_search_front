import React, { useCallback } from 'react'
import { Link, useLocation } from 'wouter'
import ListOfGifs from '../../components/ListOfGifs'
import SearchForm from '../../components/SearchForm'
import Spinner from '../../components/Spinner'
import LazyTrending from '../../components/TendingSearches'
import { useGif } from '../../hooks/useGif'
import useSeo from '../../hooks/useSeo'

export default function Home() {    
    
    const [path, pushLocation] = useLocation()
    const { gifs, loading } = useGif() 

    const handleSubmit = useCallback(({keyword, rating}) =>{
        pushLocation(`/search/${keyword}/${rating}`)
    }, [pushLocation])

    useSeo({title: 'Home', description: 'Home de gifs' })
    return (
        <>
            <SearchForm onSubmit={handleSubmit} />
            <div className="App-main">
                <div className="App-results">
                    <h3>Ultima busqueda </h3>
                        {loading ? <Spinner /> : <ListOfGifs gifs={gifs} />}
                    <h3>Populars gifs</h3>
                </div>

            </div>
            <div className="App-category">
                    <LazyTrending />
            </div>
        </>
    )
}
