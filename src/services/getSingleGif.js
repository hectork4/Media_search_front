import config from '../data'

export default function getSingleGif({ id, context }) {
    return fetch(`${config.API_URL}${context}/${id}?api_key=${config.API_KEY}`)
    .then(res => res.json())
    .then(response => {
        const {data=[]} = response  
        const url = data.images.downsized_medium.url;
        const { title, id } = data
        return { url, title, id}
      })
}
