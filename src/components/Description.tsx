import React from 'react';


function Description(prop : {state:boolean,setState:React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <div id="descriptionWrapper" onClick={()=>prop.setState(!prop.state)}>
            <div id="description">
                <h1>무슨 사이트죠?</h1>
                <div className="descriptionText">단어를 학습하는 데 있어 도움을 주는 사이트입니다.<br></br><br></br>저희는 외운다는 개념은 곧 "익숙해지는 과정"이라고 생각하였습니다. <br></br>이 사이트는 단어를 외우는 것이 아닌 <b>익숙해지게 하는 것</b>에 도움을 주는 사이트입니다.</div>
                <br></br>
                <h2>어떻게 사용하죠?</h2>
                <div className="descriptionText">모르는 단어가 나온다면 해당 단어를 클릭해 단어를 추가해주세요.<br></br> 거의 아는 단어라고 해도 조금이라도 헷갈린다면 단어를 추가해주세요.<br></br>단어를 추가한 후 단어 뜻을 찾아보세요. <br></br><b>단어를 외우려고 하지 말고</b> 가볍게만 해당 단어를 알아두고 다음 문장으로 나아갑니다. </div>
                <div className="descriptionText">다음 문장에서 모르는 단어가 나온다면 위와 같은 단계를 반복하시면 됩니다.</div>
                <h3>단어를 외우려고 하지 않는 것이 중요합니다.</h3>
                <br></br>
                <h2>누가 쓰면 좋나요?</h2>
                <div className="descriptionText">
                    언어의 문법보단 단어를 위주로 하는 사이트입니다. 해당 언어의 문법 등은 좀 알지만 단어만을 위주로 공부하는 사람에게 추천합니다.
                </div>
            </div>
      </div> 
    )
}


export default Description;