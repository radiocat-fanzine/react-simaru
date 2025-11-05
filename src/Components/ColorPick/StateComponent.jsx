import { useState } from "react";
import './StateComponent.css';

export default function StateComponent (){
    const [ color, setColor ] = useState("#000000");
    
    return (
        <div className="box-container">
            <p>Select your color:
                <span className="color-preview" style={{backgroundColor: color}}></span>
            </p>
            <div className="button-container">
                <button className="button" onClick={ () => setColor("#000000")}>black</button>
                <button className="button" onClick={ () => setColor("#4ec72fff")}>green</button>
                <button className="button" onClick={ () => setColor("#d49c00ff")}>orange</button>
            </div>
        </div>
    )
}