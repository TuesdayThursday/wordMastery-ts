import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Auth from "../routes/Auth";
import WordLearn from "../routes/WordLearn";
import Register from "./Register";

const AppRouter = ({isLoggedIn} : {isLoggedIn:boolean}) => {
    

    return (
        <BrowserRouter>
            <Routes>
            {isLoggedIn ? 
                    <Route path={"/"} element={<WordLearn /> }/>
                : (
                    <Route path={"/"} element={<Auth />}/>
                        
                )
                }
                <Route path={"/register"} element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;