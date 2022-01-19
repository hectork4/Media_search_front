import React, { useEffect, useState } from 'react'
import getUserData from '../services/getFavs'

const UserContext = React.createContext({})

export function UserContextProvider({children}) {
    const [favourites, setFavs] = useState([])
    const [jwt, setJwt] = useState(()=> window.sessionStorage.getItem('jwt')) 
    
    useEffect(()=>{
        if(!jwt) setFavs([])
        getUserData({jwt}).then(res=>{
            setFavs(res.favourites)
        })
    },[jwt])

    return <UserContext.Provider value={{favourites, setFavs, jwt, setJwt}}>
        {children}
    </UserContext.Provider>
}

export default UserContext