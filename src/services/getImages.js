import config from '../data'

function getUrlPh ({keyword='default', page}, limit=10){

    return  `${config.API_URL_PH}search/photos/?client_id=${config.API_KEY_PH}&query=${keyword}&page=${page*limit}`
}

function getImage({keyword,page = 0}) {
    const URL_PH = getUrlPh({keyword: keyword, page})
    
    return fetch(URL_PH)
        .then(resp => resp.json())
        .then(responseI=>{
            const images = responseI.results.map(image => {
                const {urls, description, description_alt, id} = image
                const url_image = urls?.small

                return({title:description || description_alt, url:url_image, id:id})
            })

            return images
        })
}

export default getImage;