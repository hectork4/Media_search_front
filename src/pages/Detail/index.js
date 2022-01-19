import React from 'react'
import Gif from '../../components/Gif/Gif'
import useSingleGif from '../../hooks/useSingleGif'
import Spinner from '../../components/Spinner'
import { Redirect } from 'wouter'
import useSeo from '../../hooks/useSeo'

export default function Detail ({ params }) {

  const {gif, isLoading, isError} = useSingleGif({id: params.id})

  const title = gif ? gif.title : 'GifDetails';
  const description = gif ? `Detalles de ${gif.title}` : 'Detalles del gif'
  useSeo({title:title, description:description})

  if(isLoading) return <Spinner /> 
  if(isError) return <Redirect to='/404' />
  if(!gif) return null

  return <>
      <h3 className="App-title">{ `Gif con id ${params.id}` }</h3>
      <Gif {...gif} />
    </>
}

