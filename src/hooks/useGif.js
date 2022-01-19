import React, { useCallback, useContext, useEffect, useState } from 'react'
import getGifs from '../services/getGifs'
import GifContext from '../context/gifsContext'
import getImage from '../services/getImages'

const INITIAL_PAGE = 0
export function useGif({ keyword  = 'default', rating } = { keyword: null }) {
    const [page, setPage] = useState(INITIAL_PAGE)
    const [loading, setLoading] = useState(true)
    const [loadingNP, setLoadingNP] = useState(false)
    const {gifs, setGifs, context, setBlockFetch, blockFetch, CONTEXTS_TYPE} = useContext(GifContext)

  /*El usestate devuelve un array de dos posiciones. La primera es el valor del estado, y la segunda es la funcion para actualizar ese valor*/

  /* useEffect, nos permite ejecutar una funcion de forma arbitraria cada vez que se renderice 
  el componente. Sin agregar luego de la función una dependencia, el usefect se ejecutará
  cada vez que renderiza. De agregar una dependencia vacía [] se ejecutará solo la primera 
  vez (esto equivale a componentDidMount). De agregar [dependencyVar] le asigno las variables 
  que de cambiarlas, se ejecutará el efecto. De agregar un return en la función del useEffect, 
  se ejecutará lo que esté dentro del return cuando el componente se desmonte, se utiliza generalmente
  cuando se crean listener en el useEffect y se necesita dejar de escuchar luego de que el
  componente se desmonte. (equivale al componentUnMount) */

    useEffect(()=>{
        async function fetchData(keyword, rating){
            setLoading(true)
            const newGifs = context !== CONTEXTS_TYPE.PICTURE ? 
                            await getGifs({keyword, rating, type:context}) : 
                            await getImage({keyword, rating})
            setGifs((prevGifs) => {
                newGifs.length < 2 ? setBlockFetch(true) : setBlockFetch(false)
                return newGifs
            })
            setLoading(false)
            localStorage.setItem('lastKeyword',keyword)
        }
        const KeywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'
        fetchData(KeywordToUse, rating)
    },[keyword, setGifs, rating, context, CONTEXTS_TYPE, setBlockFetch])


   /* useEffect(()=>{
        if(page === INITIAL_PAGE) return
        setLoadingNP(true)
        getGifs({keyword, page, rating})
        .then(nextGifs => {
            setGifs(prevGifs => prevGifs.concat(nextGifs))  /* a la función de actualizar de un useState si se coloca una función se puede tener acceso al último estado como parametro 
            setLoadingNP(false)
        })
    },[page, keyword, setGifs, rating])*/

    const getNewItems4Page = useCallback(
        async() => {
            setLoadingNP(true)
            const newGifs = context !== CONTEXTS_TYPE.PICTURE ? 
                                        await getGifs({keyword, rating, page, type:context}) : 
                                        await getImage({keyword, rating, page})
            setGifs(prevGifs => {
                newGifs.length < 2 ? setBlockFetch(true) : setBlockFetch(false)
                return prevGifs.concat(newGifs)
            }) 
            setLoadingNP(false)
        },
        [keyword, rating, page, context, setGifs, CONTEXTS_TYPE, setBlockFetch],
       );


    useEffect(()=>{
        if(page === INITIAL_PAGE) return
        getNewItems4Page()
    },[page, getNewItems4Page])

    return ({loading, gifs, setPage, loadingNP, blockFetch})
}
