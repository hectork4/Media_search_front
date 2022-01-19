import { useReducer } from "react"
    
    const ACTIONS = {
        UPDATE_KEYWORD: 'changeKeyword',
        UPDATE_RATING: 'changeRating'
    }
    
    export const useForm = ({initialKeyword = '', initialRating = 'g'} = {}) => {

    const reducer = (state, action) =>{ 
        switch (action.type) {
            case ACTIONS.UPDATE_KEYWORD:
                return {
                    ...state,
                    keyword:  action.payload,
                    words:  action.payload.length
                }
            case ACTIONS.UPDATE_RATING:
                return {
                    ...state,
                    rating: action.payload
                }        
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        keyword: decodeURIComponent(initialKeyword),
        words: 0,
        rating: initialRating
    })

    const {keyword, words, rating} = state 

    return {
        keyword, 
        words, 
        rating, 
        updateKeyword: ({keyword}) => dispatch({payload:keyword, type:ACTIONS.UPDATE_KEYWORD}), 
        updateRating: ({rating}) => dispatch({payload:rating, type:ACTIONS.UPDATE_RATING}) }
    }