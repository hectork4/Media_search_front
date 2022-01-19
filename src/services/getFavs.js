const ENDPOINT = 'https://desolate-cliffs-81980.herokuapp.com'

export default function getUserData({jwt}){
    return fetch(`${ENDPOINT}/user/getUser`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": jwt
        }
    }).then(function (response) {
        return response.json()
    })
    .then(function (response) {
        
        return response
    })
    .catch(err => {
        throw new Error(err)
      })
}