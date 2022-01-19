import React, { useContext, useState } from 'react'
import { Link, useRoute } from 'wouter'
import './styles.css'
import useUser from '../../hooks/useUser'
import GifContext from '../../context/gifsContext'

export default function Header() {
    
    const {isLogged, logout} = useUser()

    const {context, setContext, CONTEXTS_TYPE} = useContext(GifContext)

    const [match] = useRoute('/login')

    const [options, setOptions] = useState([
                                    context === CONTEXTS_TYPE.PICTURE ? 
                                    CONTEXTS_TYPE.GIF :
                                    CONTEXTS_TYPE.PICTURE, 
                                    context === CONTEXTS_TYPE.STICKER ?
                                    CONTEXTS_TYPE.GIF :
                                    CONTEXTS_TYPE.STICKER])

    const getName = ({option}) => {

        switch (option) {
            case CONTEXTS_TYPE.PICTURE:
                
                return 'Pictures';
        
            case CONTEXTS_TYPE.GIF:
                
                return 'Gifs';    

            case CONTEXTS_TYPE.STICKER:
                
                return 'Stickers';  
                
            default:
                break;
        }
    }

    const handleClick = e => {
        e.preventDefault();
        logout();
    }

    const handleChangeContext = ({pos}) => {
        const selected = options[pos]
        setOptions(prevState => prevState.map((eachState, index) => index === pos ? context : eachState))
        localStorage.setItem('searchContext', selected)
        setContext(selected)
    }

    const content = match ? 
                    null :
                    isLogged ?
                    <Link href='#' onClick={handleClick}>
                        Logout
                    </Link>
                    :
                    <>
                        <Link to='/login'>
                            Login
                        </Link>
                        <Link to='/register'>
                            Register
                        </Link>
                    </>

    return (
        <header className='gf-header'>
            <button onClick={() => handleChangeContext({pos:0})} className='changeContext'>{getName({option: options[0]})}</button>
            <button onClick={() => handleChangeContext({pos:1})} className='changeContext'>{getName({option: options[1]})}</button>
            {
                content
            }
        </header>
    )
}
