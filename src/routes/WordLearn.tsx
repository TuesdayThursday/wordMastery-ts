import React, { useEffect, useState, createContext, useContext, useCallback } from "react";
import WordSeparator from "../components/WordSeparator";
import Select from "../components/util/Select";
import { API_SERVER } from '../env'
import { getDefaultListId, getCurrentSentence, getUsersFollowSentenceLists, getUsersWordLists, nextSentence } from "../unit/SentenceManager";
import './WordLearn.css';
import SentenceManager from "../components/SentenceManager";
import { globalMenuProps, listIdInterface, sentenceMenuOpenType } from "../types/ContextTypes";


export const listIdContext = createContext<listIdInterface | undefined>(
    undefined
)
export const menuContext = createContext<globalMenuProps | undefined>(
    undefined
);
export const sentenceManagerOpenContext = createContext<sentenceMenuOpenType | undefined>(
    undefined
)

function WordLearn() {
    const MenuContexts = useContext(menuContext)
    const [revealStatus, setRevealStatus] = useState(false);
    const [sentence, setSentence] = useState({
        originalText: '',
        interpre: ''
    });
    //현재 선택된 단어 및 문장 장 아이디
    const [selectedSentenceList, setSelectedSentenceList] = useState<string>(getDefaultListId("english").defaultSentenceListId);
    const [selectedWordList, setSelectedWordList] = useState<string>(getDefaultListId("english").defaultWordListId);

    //서버에서 가져온 유저의 문장장 및 단어장 목록 
    const [wordLists, setWordLists] = useState<{value:string, label:string}[]>([])
    const [sentenceLists, setSentenceLists] = useState<{value:string,label:string}[]>([]);
    

    const [nextId, setNextId] = useState('');
    
    const [menuOpen, SetMenuOpen] = useState(-1);
    const changeWordId = useCallback(
        (wordId: number) => SetMenuOpen(wordId), []
    )

    useEffect(() =>{
        SetMenuOpen(-1);
        getCurrentSentence(selectedSentenceList, selectedWordList)
        .then(res => res.json())
        .then(data => {
            setSentence({
                originalText: data.sentence,
                interpre:data.sentenceInterpretation
            });
            //data.message는 오류 메시지 입니다.
            if(data.message) {
                setSentence({
                    originalText: data.message,
                    interpre:data.statusCode
                })
                console.log(data.message);

            }
        }).catch((e) => {
            console.error("Server has got problem. ", e)
        })
    },[nextId])
    
    useEffect(() => {
        getUsersWordLists()
        .then(res => res.json())
        .then(data => {
            if(data?.length > 0) {
                data.map((v:{id:string, name:string}) => {
                    setWordLists(wordLists => [...wordLists, {value:v.id, label:v.name}]);
                })
            }else {
                alert("단어장이 없습니다. 단어장을 만들어주세요.")
            }
            
        })
        
        getUsersFollowSentenceLists()
        .then(res => res.json())
        .then(data => {
            if(data?.length > 0) {
                data.map((v:{id:string, name: string}) => {
                    setSentenceLists(sentenceLists => [...sentenceLists, {value:v.id, label:v.name}]);
                })
            }
             
        })

    },[])

    function revealInterpretation(){
        setRevealStatus(true);

    }

    function nextBtnHandler() {
        nextSentence(selectedSentenceList, selectedWordList)
            .then(res => res.json())
            .then(data => {
                setNextId(data.sentenceId);
            }).catch((e) => {
                console.error("Server has got problem. ", e)
        })
        setRevealStatus(false);
        
    }
    function wordListChange(id:string) {
        setSelectedWordList(id);

        nextSentence(selectedSentenceList, selectedWordList)
        .then(res => res.json())
        .then(data => {
            setNextId(data.sentenceId);
        })
    }
    function sentenceListChange(id:string) {
        setSelectedSentenceList(id);

        nextSentence(selectedSentenceList, selectedWordList)
        .then(res => res.json())
        .then(data => {
            setNextId(data.sentenceId);
        })
    }
    function copySentence() {
        navigator.clipboard?.writeText(sentence.originalText);
        if(!navigator.clipboard){
            alert("https 아니여서안됨")
        }
        //HTTPS 에서만 작동됨.
    }

    let [wordManagerOpen, setWordManagerOpen] = useState(false);
    function wordManagerOpenHandler(id:string) {
        setWordManagerOpen(!wordManagerOpen);
    }
    let addWordListBtn = {
        value:'addWord',
        label:'단어장 추가',
        setting: {
            handler:wordManagerOpenHandler
        }
    }

    let [sentenceManagerOpen, setSentenceManagerOpen] = useState(false);
    function sentenceManagerOpenHandler(id: string) {
        setSentenceManagerOpen(!sentenceManagerOpen);
    }
    let addSentenListBtn = {
        value:'addSentence',
        label:'문장 찾아보기',
        setting: {
            handler:sentenceManagerOpenHandler
        }
    }


    return (
        <listIdContext.Provider value={{sentenceListId:selectedSentenceList,wordListId:selectedWordList}}>
            <div id="WordLearn">
                <div id="listSelector">
                    <div id="sentenceListSelector">
                        <Select default={{value:selectedSentenceList,label:sentenceLists.filter(e=>e.value==selectedSentenceList)[0]?.label || ''}} options={[addSentenListBtn,...sentenceLists]} handler={sentenceListChange}></Select>
                    </div>
                    <div id="wordListSelector">
                        <Select default={{value:selectedWordList,label:wordLists.filter(e=>e.value==selectedWordList)[0]?.label || ''}} options={[addWordListBtn,...wordLists]} handler={wordListChange}></Select>
                    </div>
                    
                </div>
                <div className="originalSentenceWrapper">
                    <menuContext.Provider value={{changeWordId,menuOpen}}>
                        <div id="originalSentence" className="sentenceBox">
                            <WordSeparator sentence={sentence.originalText} />
                        </div>
                        <div className="copyBtn" onClick={copySentence}>
                                📄
                        </div>
                    </menuContext.Provider>
                </div>
                {/* <div className={`sentenceBox ${revealStatus ? 'reveal' : 'interpretation'}`} onClick={revealInterpretation}>
                        {
                            revealStatus ? 
                                    sentence.interpre
                                :
                                '해석 보기'
                        }
                </div> */}
                
                <div id="nextSentenceBtn" onClick={nextBtnHandler}>
                        {'Next'}
                </div>
                {
                    sentenceManagerOpen ?
                            <sentenceManagerOpenContext.Provider value={{setFunc:sentenceManagerOpenHandler}}>
                                <SentenceManager />
                            </sentenceManagerOpenContext.Provider>

                        :
                        <></>
                }

            </div>
        </listIdContext.Provider>
    )

}


export default WordLearn;