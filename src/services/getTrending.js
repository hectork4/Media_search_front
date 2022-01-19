import config from '../data'

const fromApiResponseToGifs = apiResponse => {
  const {data = []} = apiResponse
  return data
}

export default function getTrending () {
  const apiURL = `${config.API_URL}gifs/trending?api_key=${config.API_KEY}&limit=10`

  return fetch(apiURL)
    .then(res => res.json())
    .then(fromApiResponseToGifs)
}