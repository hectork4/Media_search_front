import React, { useState } from 'react'
import useUser from '../../hooks/useUser'
import './styles.css' 
import Modal from '../Modal'
import Login from '../Login'

export default function Fav({id}) {

    const {isLogged, addGifFav, deleteGifFav, isFaved} = useUser()
    const [showModal, setShowModal] = useState(false);
    const isItemFaved = isFaved({id})

    const handleClick = () => {
        if(!isLogged) return setShowModal(true)
        isItemFaved ? deleteGifFav({id}) : addGifFav({id})
    }

    const handleCloseModal = () =>{
      setShowModal(false)
    }

    const handleLogin = () => {
      setShowModal(false)
    }

    const [
        label,
        emoji
      ] = isItemFaved
        ? [
          'Remove Gif from favorites',
          '❤️'
        ] : [
          'Add Gif to favorites',
          '🤍'
        ]

    return (
      <>
        <button 
          className='gf-Fav' 
          onClick={handleClick}
        >
            <span role='img' aria-label={label} >{emoji}</span>
        </button>
        {showModal && 
        <Modal 
          onClose={handleCloseModal}       
          title={'Login'}   
        >
          <Login 
            onLogin={handleLogin}
          />
        </Modal>} 
      </>
    )
}
