import React, { useContext } from 'react';
import { sentenceManagerOpenContext } from '../routes/WordLearn';
import './SentenceManager.css';


function SentenceManager() {
    const SentenceManagerOpenContext = useContext(sentenceManagerOpenContext);


    function close() {
        SentenceManagerOpenContext?.setFunc('')
    }


    return (
        <div id="sentenceManagerWrapper">
            <div id="sentenceManager">
                <div id="quitSentenceManager" onClick={close}>X</div>
                <div id="sentenceFindTools">
                    <input type="text" placeholder="이름으로 검색하기" />
                    <select>
                        <option value="0">{`영어`}</option>
                        <option value="1">{`일본어`}</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SentenceManager;