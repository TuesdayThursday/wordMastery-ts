import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export const getRefreshToken = () => Cookies.get('refresh_token');
export const isAuthenticated = () => !!getAccessToken()
const inOneHour = new Date(new Date().getTime() + 60*60*1000);
export const setAccessToken = (token:string) => Cookies.set('access_token', token, {expires:inOneHour});


export const authenticate = async () =>{
    if(getAccessToken()) {
        return true;
    }

    return false;
}




export const login = async <T>(id:string,pw:string):Promise<T> => {
    return fetch('http://115.140.186.199:3000/auth/login/', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            password: pw
        })
    })
    .then(res => {
        if(!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json()
    })
    .then(data => {
        return data
    })
    .catch((error:Error) => {
        throw error
    })
}