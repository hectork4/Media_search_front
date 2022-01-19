import React from 'react'
import Gif from '../Gif/Gif'
import './styles.css'

export default function ListOfGifs({ gifs }) {

    return (
        <div className='ListOfGifs'>
        {
            gifs.map((eachGif)=>{
                return( 
                <Gif
                    key={eachGif.id}
                    title={eachGif.title}
                    url={eachGif.url}
                    id={eachGif.id}
                />
                )
            })
          }
        </div>
    )
}
