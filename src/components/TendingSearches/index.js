import React, { Suspense, useRef } from 'react'
import { useNearScreen } from '../../hooks/useNearScreen'
import Spinner from '../Spinner'

const TrendingSearchesLazy = React.lazy(
    () => import('./TrendingSearches') 
) 

export default function LazyTrending () {
   
    const trendingRef = useRef()
    const {isNearScreen} = useNearScreen({distance : '150px', externalRef: trendingRef})

    return <div ref={trendingRef} >
       <Suspense fallback={<Spinner />}>
            {isNearScreen ? <TrendingSearchesLazy /> : null}
        </Suspense>
    </div>
}


