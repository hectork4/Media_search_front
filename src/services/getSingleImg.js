import config from '../data'

const fromApiResponseToImg = apiResponse => {
    const {urls, description, id} = apiResponse
    const url = urls.full
    return {title:description, id, url}
}

export default function getSingleImg({id=''}) {
    
    if(id){
    return (
        fetch(`${config.API_URL_PH}photos/${id}?client_id=${config.API_KEY_PH}`)
        .then(res => res.json())
        .then(fromApiResponseToImg)
    )}else{
        return
    }
}