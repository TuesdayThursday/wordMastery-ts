import React, { createContext, useEffect, useState, useCallback } from "react";
import Word from './Word';
import SentenceType from "../types/SentenceType";
import './WordSeparator.css';



interface globalMenuProps {
    changeWordId: (wordId: number) => void;
    menuOpen:number
}

export const menuContext = createContext<globalMenuProps | undefined>(
    undefined
);

function WordSeparator(props : SentenceType){

    let [words, setWords] = useState<string[]>([]);
    const [menuOpen, SetMenuOpen] = useState(-1);

    

    useEffect(()=>{
        let separatedWords = props.sentence?.split(' ');

        setWords(separatedWords?.map(x=>x));
    },[props.sentence])

    const changeWordId = useCallback(
        (wordId: number) => SetMenuOpen(wordId), []
    )


    if(props.sentence?.length === 0) return (<></>);
    return (
        <menuContext.Provider value={{changeWordId,menuOpen}}>
            <div className="wordList">   

                {words?.map((v,i)=>( 
                    <Word key={i} id={i} word={v}></Word>
                ))}

            </div>
            
        </menuContext.Provider>
    )
}

export default WordSeparator;