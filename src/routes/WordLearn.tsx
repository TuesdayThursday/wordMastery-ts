import React, { useEffect, useState } from "react";
import WordSeparator from "../unit/WordSeparator";

import './WordLearn.css';




function WordLearn() {
    const [reveal, setReveal] = useState(false);
    const [sentence, setSentence] = useState({
        originalText: '',
        interpre: ''
    });


    useEffect(() =>{
        fetch('http://115.140.186.199:3000/sentencelists/7SgWVPrWMGHBXTBk4e8pL/sentences/', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setSentence({
                originalText: data[0].sentence,
                interpre:data[0].interpretation
            });
        })
        
    },[])
    
    
    function revealInterpretation(){
        setReveal(true);
        const interpretationObject = document.getElementById("interpretation");

        if(interpretationObject){
            interpretationObject.style.backgroundColor = "white";
            interpretationObject.style.color = "black";
            interpretationObject.style.cursor = "default";
        }

    }

    return (
        <div id="WordLearn">
           <div id="originalSentence" className="sentenceBox">
            <WordSeparator sentence={sentence.originalText} />
           </div>
           <div id="interpretation" className="sentenceBox" onClick={revealInterpretation}>
                {
                    reveal ? 
                            sentence.interpre
                        :
                        '해석 보기'
                }
           </div>
           <div id="nextSentenceBtn">
                {'>'}
           </div>
        </div>
    )

}


export default WordLearn;