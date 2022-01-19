import { useState, useEffect, useRef } from 'react'

export function useNearScreen({ distance = '100px', externalRef, once= true }){
    const [isNearScreen, setShow] = useState(false)

    const elementReference = useRef()
    useEffect(()=>{
        let observer;
        const elementRef = externalRef ? externalRef.current : elementReference.current

        const onChange = (entries, observer)=>{
            const element = entries[0]
            if(element.isIntersecting){ 
                setShow(true)
                once && observer.disconnect() 
            } else {
                !once && setShow(false)
            }
         }

         Promise.resolve(
             typeof IntersectionObserver !== 'undefined'
             ? IntersectionObserver
             : import('intersection-observer')
         ).then(()=>{
            observer = new IntersectionObserver(onChange,{
                rootMargin: distance 
            }) 
            elementRef && observer.observe(elementRef) 
              
         })

        return () => observer && observer.disconnect() 
    })

    return {isNearScreen, elementReference}
}