import React, { useContext, useState } from "react";
import { menuContext } from "./WordSeparator";
import WordMenu from './WordMenu';
import './Word.css';



function Word(prop: {id:number, word: string}) {
    const MenuContexts = useContext(menuContext)
    

    function wordMenuOpener(event:React.MouseEvent<HTMLDivElement>):void{
        let selectedWord = (event.target as HTMLElement)?.innerHTML;
        console.log(selectedWord);
        if(MenuContexts?.menuOpen !== prop.id) {
            MenuContexts?.changeWordId(prop.id);
        }else{
            MenuContexts?.changeWordId(-1);
        }
        
    }

    return (
        
            <div className="wordWrapper">
                <div className={`word ${MenuContexts?.menuOpen === prop.id? 'wordClick' : ''}`} onClick={wordMenuOpener}>
                    {prop.word + ' '}
                
                </div>
                {
                    MenuContexts?.menuOpen === prop.id ? 
                        <WordMenu word={prop.word} className={`WordMenu`}/>
                        :
                        <></>
                }
            </div>
    );
}

export default Word;
