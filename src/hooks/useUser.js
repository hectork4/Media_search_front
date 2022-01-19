/* hook para acceder al estado global del contexto de Usuario */

import { useCallback, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import loginServices from '../services/login'
import addFavServices from '../services/favourites'
import GifContext from "../context/gifsContext";

export default function useUser(){
    const {jwt, setJwt, setFavs, favourites} = useContext(UserContext)
    const {context, CONTEXTS_TYPE} = useContext(GifContext)
    const [state, setState] = useState({loading: false, error: false})

    const login = useCallback(({email, password}) =>{
        setState({loading:true, error: false})
        loginServices({email, password})
        .then(rjwt => {
            setJwt(rjwt)
            window.sessionStorage.setItem('jwt', rjwt)
        })      
        .catch(error =>{
            console.error(error)
            setState({loading:false, error: true})
            window.sessionStorage.setItem('jwt', null)
        })  
        setState({...state, loading:false})
    }, [setJwt, state])

    const logout = useCallback(() =>{
        setJwt(null)
        window.sessionStorage.setItem('jwt', null)
    }, [setJwt])

    const addGifFav = useCallback(({id}) =>{
        const newFavs = context !== CONTEXTS_TYPE.PICTURE ? 
                        {...favourites, gif:[...favourites.gif, id]} : 
                        {...favourites, img:[...favourites.img, id]}
        setFavs(newFavs)
        addFavServices({favourites:newFavs, jwt})
        .then(console.log("sucess"))
        .catch(error => console.error(error))
    },[jwt, setFavs, favourites, context, CONTEXTS_TYPE])

    const deleteGifFav = useCallback(({id}) =>{
        const newFavs = context !== CONTEXTS_TYPE.PICTURE ? 
                                    {...favourites, gif: favourites.gif.filter(eachGif => eachGif !== id)} : 
                                    {...favourites, img: favourites.img.filter(eachGif => eachGif !== id)}
        setFavs(newFavs)
        addFavServices({favourites:newFavs, jwt})
        .then(res=>console.log(res))
        .catch(error => console.error(error))
    },[jwt, setFavs, favourites, CONTEXTS_TYPE, context])

    const isFaved = useCallback(({id}) => {
        return context !== CONTEXTS_TYPE.PICTURE ? 
                    favourites?.gif?.some(favId => favId === id ) :
                    favourites?.img?.some(favId => favId === id )
    },[CONTEXTS_TYPE, context, favourites])

    return{
        isLogged: jwt !== 'null' && jwt !== null ? true : false,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login, 
        logout, 
        addGifFav,
        deleteGifFav,
        favourites,
        isFaved
    }
}