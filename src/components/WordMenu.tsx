import React from "react";


const dictionaryBaseURL = "https://en.dict.naver.com/#/search?range=word&query=";

function WordMenu(prop:{word:string}) {
    let wordTrimRegExp = new RegExp(/([A-Za-z-])+/gi);
    let wordTrim = '';
    if(prop.word) {
        let temp = wordTrimRegExp.exec(prop.word);
        wordTrim = temp ? temp[0] : '';
    }

    function addWord(){
        
    }

    function searchDictionary() {
        if(wordTrim){
            let dictionaryURL = dictionaryBaseURL + wordTrim;
            window.open(dictionaryURL , '_blank')?.focus();
        }
    }
    

    return (
        <div className="WordMenu">
            <ul>
                <li onClick={addWord}>
                    단어 추가
                </li>
                <li onClick={searchDictionary}>
                    사전검색
                </li>
            </ul>
        </div>
    )
}

export default WordMenu;