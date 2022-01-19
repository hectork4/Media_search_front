import config from '../data'

export default function getGifs({ keyword='freezer', page = 0, rating, type='gifs' } ={}) {  
    return fetch(config.API_URL+`${type}/search?api_key=`+config.API_KEY+`&q=${keyword}&limit=15&offset=${page * 15}&rating=${rating}&lang=en`)
    .then(res => res.json())
    .then(response => {
      const {data=[]} = response
      const gifs = data.map(image => {          
          const url = image.images.downsized_medium.url;
          const { title, id } = image
          return { url, title, id}
        })
      return gifs
    })
}
