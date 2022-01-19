const ENDPOINT = 'https://desolate-cliffs-81980.herokuapp.com'

export default function login({email, password}){
    return fetch(`${ENDPOINT}/auth/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then(res => {
        if(!res.ok) throw new Error("Response is NOT ok")
        return res.json()
    }).then(res => {
        const {token:jwt} = res
        return jwt
    })
}