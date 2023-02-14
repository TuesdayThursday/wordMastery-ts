export const translator = (sourceSentence: string, sourceLangConst: number, toLangConst: number) => {
    let sourceLang = LangConstantToString(sourceLangConst);
    let toLang = LangConstantToString(toLangConst);


    return fetch(`https://openapi.naver.com/v1/papago/n2mt?source=${sourceLang} &target=${toLang} &text=${sourceSentence}`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'X-Naver-Client-Id' : 'fBp2xg09zWAoOPvux2QW',
            'X-Naver-Client-Secret' : 'qk1nSOyFPf'
        }
    })
}

export function LangConstantToString(constant: number) {
    let lang = '';
    switch (constant) {
        case 0:
            lang = 'en';
            return lang;
        case 1:
            lang = 'ko';
            return lang;
        case 2:
            lang =  'ja';
            return lang;
    }
}