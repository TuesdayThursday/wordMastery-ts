import React, { useContext, useState, useEffect } from "react";
import { listIdContext } from "../routes/WordLearn";
import { addWord } from "../unit/SentenceManager";
import { menuContext } from "./WordSeparator";
import { translator } from "../unit/Translator"
const dictionaryBaseURL = "https://en.dict.naver.com/#/search?range=word&query=";

function WordMenu(prop:{word:string, className:string}) {
    const listIdContexts = useContext(listIdContext)
    const MenuContexts = useContext(menuContext)
    const [translatedWord, setTranslatedWord] = useState(prop.word);

    let wordTrimRegExp = new RegExp(/([A-Za-z-])+/gi);
    let wordTrim = '';

    useEffect(()=>{
        if(prop.word) {
            let temp = wordTrimRegExp.exec(prop.word);
            wordTrim = temp ? temp[0] : '';
            // translator(wordTrim, 0, 1)
            // .then(res=>res.json())
            // .then(data => {
            //     console.log(data);
            //     setTranslatedWord(data);
            // })
        }

    },[])

    function addWordBtnHandler(){
        MenuContexts?.changeWordId(-1);
        if(listIdContexts?.wordListId)
            addWord(listIdContexts?.wordListId, wordTrim)
            .then(res=>res.json())
            .then(data=>
                console.log(data)    
            )

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
                <li onClick={addWordBtnHandler}>
                    단어 추가
                </li>
                <li onClick={searchDictionary}>
                    {
                    //단어 뜻
                    translatedWord
                    }
                </li>
            </ul>
        </div>
    )
}

export default WordMenu; 