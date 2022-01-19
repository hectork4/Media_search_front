import React, { useState } from 'react'

const CONTEXTS_TYPE = {
    GIF: 'gifs',
    PICTURE: 'img',
    STICKER: 'stickers'
}

const GifContext = React.createContext({})

export function GifContextProvider({children}) {

    const [gifs, setGifs] = useState([]) 
    const [context, setContext] = useState(localStorage.getItem('searchContext') || CONTEXTS_TYPE.GIF)
    const [blockFetch, setBlockFetch] = useState(false)
    
    return <GifContext.Provider value={{gifs, setGifs, context, setContext, CONTEXTS_TYPE, blockFetch, setBlockFetch}}>
        {children}
    </GifContext.Provider>
}

export default GifContext
