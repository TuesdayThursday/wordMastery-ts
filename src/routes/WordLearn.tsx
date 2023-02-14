import React, { useEffect, useState, createContext } from "react";
import WordSeparator from "../components/WordSeparator";
import { API_SERVER } from '../env'
import { getDefaultListId, getSentence, nextSentence } from "../unit/SentenceManager";
import './WordLearn.css';

interface listIdInterface {
    sentenceListId: string,
    wordListId: string
}
export const listIdContext = createContext<listIdInterface | undefined>(
    undefined
)

function WordLearn() {
    const [revealStatus, setRevealStatus] = useState(false);
    const [sentence, setSentence] = useState({
        originalText: '',
        interpre: ''
    });
    const [selectedSentenceList, setSelectedSentenceList] = useState<string>(getDefaultListId("english").defaultSentenceListId);
    const [selectedWordList, setSelectedWordList] = useState<string>(getDefaultListId("english").defaultWordListId);
    const [nextId, setNextId] = useState('');

    useEffect(() =>{


        getSentence(selectedSentenceList, selectedWordList)
        .then(res => res.json())
        .then(data => {
            setSentence({
                originalText: data.sentence,
                interpre:data.sentenceInterpretation
            });
        }).catch((e) => {
            console.error("Server has got problem. ", e)
        })
    },[nextId])
    
    
    function revealInterpretation(){
        setRevealStatus(true);

    }

    function nextBtnHandler() {
        nextSentence(selectedSentenceList, selectedWordList)
            .then(res => res.json())
            .then(data => {
                setSentence({
                    originalText: data.sentence,
                    interpre:data.sentenceInterpretation
                });
                setNextId(data.sentenceId);
            }).catch((e) => {
                console.error("Server has got problem. ", e)
            })
        console.log(sentence.originalText);
        setRevealStatus(false);
        
    }
    return (
        <listIdContext.Provider value={{sentenceListId:selectedSentenceList,wordListId:selectedWordList}}>
            <div id="WordLearn">
                <div id="listSelector">
                    <div id="sentenceListSelector">
                        <select>
                            <option value="test">문장장</option>
                            <option value="test">문장</option>
                            <option value="test">숭그리</option>
                            <option value="test">당당</option>
                            <option value="test">숭</option>
                            <option value="test">당</option>
                            <option value="test">당</option>
                        </select>
                    </div>
                    <div id="wordListSelector">
                        <select>
                            <option value="test">단어장</option>
                        </select>
                    </div>
                </div>
                <div id="originalSentence" className="sentenceBox">
                    <WordSeparator sentence={sentence.originalText} />
                </div>
                <div className={`sentenceBox ${revealStatus ? 'reveal' : 'interpretation'}`} onClick={revealInterpretation}>
                        {
                            revealStatus ? 
                                    sentence.interpre
                                :
                                '해석 보기'
                        }
                </div>
                <div id="nextSentenceBtn" onClick={nextBtnHandler}>
                        {'Next'}
                </div>
            </div>
        </listIdContext.Provider>
    )

}


export default WordLearn;