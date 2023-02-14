import React, { useState } from 'react';
import { CLIENT_SERVER } from '../env';
import { idDuplicationCheck, register } from '../unit/Authentication';
import './Register.css';

function Register(){
    const [idCheck, setIdCheck] = useState(false);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');


    let idRegExp = new RegExp(/[a-z0-9]{6,20}$/i);

    function idHandleChange(event:React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        
        idDuplicationCheck(value).then(res=>res.json())
        .then(data=>{
            const duplicationCheck = data.isIdExist

            if(idRegExp.test(value) && duplicationCheck === false){
                setIdCheck(true);
                setId(value);
            }else {
                setIdCheck(false);
                setId('');
            }
        });


    }

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        const name = event.target.name;
        const value = event.target.value;
        switch(name) {
            case "nick":
                setNick(value);
                break;
            case "pw":
                setPw(value);
                break;
            case "email":
                setEmail(value);
                
        }

    }

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        register(id,pw,email,nick)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.statusCode == 400) {
                alert("데이터를 검토하세요.")
            }else {
                window.location.href = CLIENT_SERVER
            }
        }).catch(error => {
            console.log(error);
        });

    }


    return (
        <div className="registerFormWrapper">
            <form className="registerForm" onSubmit={handleSubmit}>
                
                <input type="text" name="id" placeholder="아이디" onChange={idHandleChange} required/>
                {
                    idCheck === false ?
                        <div className="cantUseId">사용 불가능한 아이디입니다.</div>
                        :
                        <div className="canUseId">사용 가능한 아이디입니다.</div>
                }
                
                <input type="text" name="nick" placeholder="닉네임" onChange={handleChange} maxLength={40} required/>
                <input type="password" name="pw" placeholder="비밀번호" onChange={handleChange} maxLength={40} required/>
                <input type="email" name="email" placeholder="이메일" onChange={handleChange} maxLength={40} required/>
                <input type="submit" value="회원가입"/>
                
            </form>
            
        </div>
    )
}   

export default Register;