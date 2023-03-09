import React from "react";
import './Option.css';

function Option(prop:{className:string, value:string, label:string, setOption:(id:string)=>void, close:()=>void}) {

    function select(e:React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
        prop.close();

        prop.setOption(prop.value);
    }

    return (
        <div className={`customOption ${prop.className}`} onMouseDown={(e) => e.preventDefault()} onClickCapture={select}>
            {prop.label}
        </div>
    );
}

export default Option;