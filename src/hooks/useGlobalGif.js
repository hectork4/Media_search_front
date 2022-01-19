import { useContext } from "react";
import GifContext from "../context/gifsContext";


export default function useGlobalGifs(){
    const contexto = useContext(GifContext)
    const {gifs} = contexto
    return gifs
}