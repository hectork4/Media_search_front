import {useState, useEffect, useContext, useCallback} from 'react'
import { useGif } from './useGif'
import getSingleGif from '../services/getSingleGif'
import GifContext from '../context/gifsContext'
import getSingleImg from '../services/getSingleImg'

export default function useSingleGif({ id }) {
    const { gifs } = useGif()
    const gifFromCache = gifs.find( singleGif => singleGif.id === id)
    const {context, CONTEXTS_TYPE} = useContext(GifContext)
    const [gif, setGif] = useState(gifFromCache)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const getSingleElement = useCallback(async() => {

        try {
            const element = context === CONTEXTS_TYPE.PICTURE ?
            await getSingleImg({id}) : 
            await getSingleGif({id, context})
            setIsLoading(false)
            setIsError(false)
            setGif(element)
        } catch (error){
            setIsError(true)
            setIsLoading(false)
        }

    },[context, id, CONTEXTS_TYPE])

    useEffect(()=>{
        if(!gif) {
            setIsLoading(true)
            getSingleElement()
        }
    },[getSingleElement, gif])

    return { gif, isLoading, isError }
}