import React, {useState, useEffect} from "react";
import Option from "./Option";
import './Select.css';

interface optionType {
    value:string,
    label:string,
    setting?: {
        handler?:()=>void,
        styleName?:string
    }
}

interface defaultType {
    value:string,
    label:string
}

function Select(props: {options:optionType[], default:defaultType, handler:(id:string)=>void }){
    let options = props.options;
    let defaultOption = props.default;
    const [openStatus, setOpenStatus] = useState(false);
    const [selectedOptionValue, setSelectedOptionValue] = useState({value:'',label:''});

    useEffect(() => {
        setSelectedOptionValue(defaultOption);
    })

    function setOption(id:string) {
        props.handler(id);
    }

    function openOptions() {
        setOpenStatus(!openStatus);
    }

    function closeOptions() {
        setOpenStatus(false);
        document.getElementById("customSelect")?.blur();
    }
    
    return (
        <div className="selectWrapper">
            <input id="customSelect" className={`customSelect ${openStatus ? 'customSelectFocus' : ''}`} value={selectedOptionValue?.label} onClick={openOptions} onBlur={(e)=>{closeOptions()}} readOnly />
            <div className="optionList">
                {
                    openStatus ? 
                        options.map((v,i) => <Option key={i} className={`${v?.value === defaultOption?.value ? 'selectedOption' : ''}`} value={v?.value} label={v.label} setOption={v.setting?.handler ? v.setting.handler : setOption} close={closeOptions}></Option>)
                        //<Option value={"test"} label={"label"} setOption={setOption} close={closeOptions}></Option>
                            :
                        <></>
                }
                
            </div>

        </div>
    )
    

}

export default Select;