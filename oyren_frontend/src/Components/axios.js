const BASE_URL='http://127.0.0.1:8000/oyren'
export let config={
    headers:{
        Authorization :'Bearer'+ ' ' + localStorage.getItem('access_token'),
        'Content-Type':'application/json'

    }
}




export default BASE_URL