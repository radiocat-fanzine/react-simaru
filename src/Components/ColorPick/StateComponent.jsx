import { useState } from "react";
import './StateComponent.css';

const COLORS = {
    BEIGE: '#F5F5DC',     
    BROWN: '#4E342E',      
    BLACK: '#1C1D1D'
};

export default function StateComponent (){
    const [ color, setColor ] = useState(COLORS.BEIGE);
    
    return (
        <div className="box-container">
            <p>Choose Your Hue:
            </p>
            <div className="color-picker-container">
                <button className="color-button" 
                    style={{ backgroundColor: COLORS.BLACK }}
                    onClick={ () => setColor(COLORS.BLACK)}
                    aria-label="Select color black"></button>
                <button className="color-button" 
                    style={{ backgroundColor: COLORS.BROWN }}
                    onClick={ () => setColor(COLORS.BROWN)}
                    aria-label="Select color brown"></button>
                <button className="color-button" 
                    style={{ backgroundColor: COLORS.BEIGE }}
                    onClick={ () => setColor(COLORS.BEIGE)}
                    aria-label="Select color beige"></button>
            </div>
        </div>
    )
}