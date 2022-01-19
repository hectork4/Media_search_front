import React, { useEffect, useState } from 'react'
import getTrending from '../../services/getTrending'
import Category from '../Category'

export default function TrendingSearches() {
    const [trends, setTrends] = useState([])

    useEffect(function(){
        getTrending()
            .then(res => {
                setTrends(res)
            })
    }, [])

    return <Category options={trends} name='Trends'/>
}