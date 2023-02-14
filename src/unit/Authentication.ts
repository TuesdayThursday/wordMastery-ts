import { API_SERVER } from '../env'

export const getAccessToken = () => localStorage.getItem('access_token');

export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const isAuthenticated = () => !!getAccessToken()
const inOneHour = new Date(new Date().getTime() + 60*60*1000);
export const setAccessToken = (token:string) => localStorage.setItem('access_token', token);


export const authenticate = async () =>{
    if(getAccessToken()) {
        return true;
    }

    return false;
}




export const login = async <T>(id:string,pw:string):Promise<T> => {
    return fetch(`${API_SERVER}/auth/login/`, {
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

export const idDuplicationCheck = async (value:string) => {
    return fetch(`${API_SERVER}/auth/isIdExist/?id=${value}`, {
        method: 'GET',
    })
}

export const register = async (id:string,pw:string,email:string,nick:string) => {
    return fetch(`${API_SERVER}/auth/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            id:id,
            password:pw,
            email: email,
            nickname:nick,

        })
    })
    .catch((error: Error) => {
        throw error
    })
}