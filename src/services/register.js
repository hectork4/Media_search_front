const ENDPOINT = 'https://desolate-cliffs-81980.herokuapp.com'

export default function register({email, password}){
   return fetch(`${ENDPOINT}/user/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then(res => {
        if(!res.ok) throw new Error("Response is NOT ok")
        return true
    })
}