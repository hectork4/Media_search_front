import { useEffect, useRef, useState } from 'react';
import './styles.css'

const SEARCH_TEXT= [
    {
        letter:'S',
        color:'#4C83F0'
    },
    {
        letter:'E',
        color:'#D1333B'
    },
    {
        letter:'A',
        color:'#EEB80B'
    },
    {
        letter:'R',
        color:'#4C83F0'
    },
    {
        letter:'C',
        color:'#1CAF60'
    },
    {
        letter:'H',
        color:'#D1333B'
    }
]

const getColour = (counter) => {

    switch (counter) {
        case 0:
            
            return '#4C83F0';
    
        case 1:
            
            return '#D1333B';    

        case 2:
            
            return '#EEB80B';  

        case 3:
            
            return '#1CAF60';  
            
        default:
            return '#1CAF60';
    }
}


const SearchBox = ( { value, onChange, children } ) => {

    const inputRef = useRef()
    const wrapperRef = useRef()
    const [searchText, setSearchText] = useState(SEARCH_TEXT)

    useEffect(() => {

        let counter = 0;
        const newPlaceholder = value ?
                                    [...value].filter((eachLetter, index) => {
                                        if(index < 10) return eachLetter 
                                    }).map((eachLetter, index) => {
                                        const colour = getColour(counter)
                                        counter < 3 ? counter++ : counter = 0
                                        return {
                                            letter: index === 9 ? '...' : eachLetter,
                                            color: colour
                                        }
                                    }) :
                                SEARCH_TEXT

        setSearchText(newPlaceholder)

    }, [value])

    const getSearchText = () => 
        searchText.map((eachLetter, index) => {

            return <div className={`bubble ${index % 2 ? 'animate' : 'animate-pair'}`} style={{left: `${index*50}px`}}>
                        <p style={{color: eachLetter.color}}>
                            {eachLetter.letter}
                        </p>
                    </div>
        }) 

    return (
        <>
            <div 
                ref={wrapperRef} 
                className="search-wrapper" 
                >            
                <div id="searchBox"
                    style={{width: `${(searchText.length*50)+100}px`, minWidth: '100px'}}
                >
                    <input 
                        ref={inputRef} 
                        class={`inputSearch `} 
                        type="text" 
                        name="search" 
                        id="searcInput" 
                        value={value}
                        onChange={onChange}
                        style={{width: `${searchText.length*50}px`, minWidth: '100px'}}
                    />                   
                    {getSearchText()}

                    <input 
                        className="bubble animate input-submit" 
                        value='🔎' 
                        type='submit' 
                        style={{left: `${searchText.length*50 < 100 ? 100 : searchText.length*50}px`}}
                    />     
                    <div style={{left: `${(searchText.length*50) + 60 < 160 ? 160 : (searchText.length*50) +60}px`, position: 'absolute', top:0, border:'none'}}>              
                        {children}

                    </div>  
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{height: '0px'}}>
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                            </filter>
                        </defs>
                    </svg>                                 
                </div>

            </div>

        </>
    )
}

export default SearchBox
