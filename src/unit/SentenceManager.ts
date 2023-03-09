import { API_SERVER } from "../env"
import { getAccessToken } from "./Authentication"

//return fetch(`${API_SERVER}/sentencelists/${sentenceListId}/sentences/`, {method: 'GET'})

export const getCurrentSentence = async (sentenceListId: string, wordListId: string) => {
    const ACCESS_TOKEN = getAccessToken();
    return fetch(`${API_SERVER}/sentence-suggestion/current/?sentenceListId=${sentenceListId}&wordListId=${wordListId}`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ACCESS_TOKEN
        }
    })
}

export const nextSentence = async (sentenceListId: string, wordListId: string) => {
    const ACCESS_TOKEN = getAccessToken();
    return fetch(`${API_SERVER}/sentence-suggestion/next/?sentenceListId=${sentenceListId}&wordListId=${wordListId}`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ACCESS_TOKEN
        }
    })
}

export const addWord = async (wordListId: string, wordToAdd:string) => {
    const ACCESS_TOKEN = getAccessToken();
    return fetch(`${API_SERVER}/wordlists/${wordListId}/words/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN
        },
        body: JSON.stringify({
            word: wordToAdd
        })
    })
}

export const getUsersWordLists = () => {
    const ACCESS_TOKEN = getAccessToken();
    return fetch(`${API_SERVER}/wordlists/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN
        }
    })
}

export const getUsersFollowSentenceLists = () => {
    const ACCESS_TOKEN = getAccessToken();

    return fetch(`${API_SERVER}/following-sentencelists/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ACCESS_TOKEN
        }
    })
}

export const getDefaultListId = (language:string) => {
    //const defaultSentenceListId = "7SgWVPrWMGHBXTBk4e8pL";
    const defaultSentenceListId = "c7OgtTwshks3xfW-hJW9M";
    const defaultWordListId = "xXNxeJdzkwPi6VzqSgkZP"

    return {
        defaultSentenceListId,
        defaultWordListId
    }

}