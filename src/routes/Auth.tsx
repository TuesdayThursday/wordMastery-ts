import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login, setAccessToken } from "../unit/Authentication";
import { CLIENT_SERVER } from "../env"
import './Auth.css';


interface loginData {
    id: string,
    pw: string
}

function Auth() {
    const [id, setId] = useState<string>('');
    const [pw, setPw] = useState<string>('');

    function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;

        if(name === "id") {
            setId(values=>value) 
        }
        else { 
            setPw(values=>value)
        }
        
    }

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        login<{token:string}>(id,pw)
        .then(data=>{
            setAccessToken(data.token);
            window.location.href = CLIENT_SERVER;
        })
        .catch(error => {
            alert("잘못된 로그인 정보입니다.")
        });
    }

    return (
        <div className="AuthPage">
            <div className="wordyAnimation">
                <div className="animationTextBox">
                    <span>This is </span>
                    <span className="pointWord">Apple </span>
                    <span>bla bla</span>
                </div>
            </div>
            <div className="loginFormSection">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <input type="text" name="id" id="loginID" onChange={handleChange} placeholder="ID를 입력해주세요" />
                    <input type="password" name="pw" id="loginPW" onChange={handleChange} placeholder="비밀번호를 입력해주세요" />
                    <input type="submit" value="로그인"/>
                </form>
                <div>
                    <Link id="registerLink" to="/register">회원가입</Link>
                </div>
            </div>
            <div id="footer"> 혹시 모를 footer군 </div>
        </div>
    )
}
export default Auth;