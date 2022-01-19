import React from 'react'
import { useForm } from '../../hooks/useForm';
import SearchBox from '../SearchBox';
import './styles.css'

const RATINGS = ['g', 'pg', 'pg-13', 'r'];


 function SearchForm({onSubmit: handleSubmitFromHome, initialKeyword='', initialRating=''}) { 

    const {keyword, rating, updateKeyword, updateRating} = useForm({initialKeyword, initialRating})



    const handleSubmit = (evt) =>{
        evt.preventDefault()
        !keyword && updateKeyword({keyword:'random'})
        handleSubmitFromHome({keyword: keyword || 'random', rating})  
    }

    const handleChange = (evt) =>{
        updateKeyword({keyword:evt.target.value}) 
    }

    const handleChangeRating = (evt) =>{
        updateRating({rating:evt.target.value})
    }

    return (
        <form onSubmit={handleSubmit}>
            <SearchBox value={keyword} onChange={handleChange}>
            <select value={rating} onChange={handleChangeRating}>
                <option disabled>Ratings</option>
                {RATINGS.map(eachRating => <option key={eachRating}>{eachRating}</option>)}
            </select>
            </SearchBox>
        </form>
    )
}

export default React.memo(SearchForm)