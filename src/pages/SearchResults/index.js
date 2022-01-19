import debounce from 'just-debounce-it'
import React, { useCallback, useEffect, useRef } from 'react'
import ListOfGifs from '../../components/ListOfGifs'
import SearchForm from '../../components/SearchForm'
import Spinner from '../../components/Spinner'
import { useGif } from '../../hooks/useGif'
import { useNearScreen } from '../../hooks/useNearScreen'
import useSeo from '../../hooks/useSeo'
import { Link, useLocation } from 'wouter'

export default function SearchResults({ params }) {

    const { keyword, rating = 'g' } = params

    const { gifs, loading, setPage, blockFetch } = useGif({keyword, rating}) 

    const debounceHandleNextPage = useCallback(debounce( 
        () => setPage(lastPage => lastPage +1), 200
    ), [setPage])

    const externalRef = useRef()
    const {isNearScreen } = useNearScreen({externalRef : loading ? null : externalRef, once: false}) 

    useEffect(()=>{
        if(isNearScreen && !blockFetch) debounceHandleNextPage()
    })

    useSeo({title: gifs?`${gifs.length} resultados de ${keyword}`:'', description:gifs?`Detalles de ${keyword}`:`Resultados de busqueda` })

    const [path, pushLocation] = useLocation()
    const handleSubmit = useCallback(({keyword, rating:ratingToSearch}) =>{
        pushLocation(`/search/${keyword}/${ratingToSearch}`)
    }, [pushLocation])

    return (<>
            {loading?
            <Spinner />:
            <>
                <SearchForm onSubmit={handleSubmit} initialKeyword={keyword} initialRating={rating} />
                <h3>{decodeURI(keyword)}</h3>
                <ListOfGifs gifs={gifs} />
                <div id='visor' ref={externalRef} description='used to check when de screen is near the end'> </div>
            </>}
        </>
    )
}
