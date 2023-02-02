import React, { createContext, useContext, useState } from "react";
import { menuContext } from "../unit/WordSeparator";
import WordMenu from './WordMenu';
import './Word.css';



function Word(prop: {id:number, word: string}){
    const MenuContexts = useContext(menuContext)
    
    function wordMenuOpener(e:any){
        let selectedWord = e.target.innerHTML;
        
        
        if(MenuContexts?.menuOpen != prop.id) {
            MenuContexts?.changeWordId(prop.id);
        }else{
            MenuContexts?.changeWordId(-1);
        }
            
    }

    return (
        
            <div className="wordWrapper">
                <div className="word" onClick={wordMenuOpener}>
                    {prop.word + ' '}
                
                </div>
                {
                    MenuContexts?.menuOpen == prop.id ? 
                        <WordMenu word={prop.word} />
                        :
                        <></>
                }
            </div>
    );
}

export default Word;
