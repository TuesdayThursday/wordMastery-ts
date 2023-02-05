import React, { useContext } from "react";
import { menuContext } from "../unit/WordSeparator";

const dictionaryBaseURL = "https://en.dict.naver.com/#/search?range=word&query=";

function WordMenu(prop:{word:string, className:string}) {
    const MenuContexts = useContext(menuContext)

    let wordTrimRegExp = new RegExp(/([A-Za-z-])+/gi);
    let wordTrim = '';
    if(prop.word) {
        let temp = wordTrimRegExp.exec(prop.word);
        wordTrim = temp ? temp[0] : '';
    }

    function addWord(){
        MenuContexts?.changeWordId(-1);
        
    }

    function searchDictionary() {
        MenuContexts?.changeWordId(-1);

        if(wordTrim){
            let dictionaryURL = dictionaryBaseURL + wordTrim;
            window.open(dictionaryURL , '_blank')?.focus();
        }
    }
    

    return (
        <div className={prop.className}>
            <ul>
                <li onClick={addWord}>
                    단어 추가
                </li>
                <li onClick={searchDictionary}>
                    단어 뜻
                </li>
            </ul>
        </div>
    )
}

export default WordMenu; 