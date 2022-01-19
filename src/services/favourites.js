const ENDPOINT = 'https://desolate-cliffs-81980.herokuapp.com'

export default function addFav({favourites, jwt}){
    
    return fetch(`${ENDPOINT}/user/updateUser`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": jwt
        },
        body: JSON.stringify({favourites})
    }).then(res => {
        if(!res.ok) throw new Error("Response is NOT ok")
        return res.json()
    }).then(res => {
        return res
    })
}