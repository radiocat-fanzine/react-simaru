import { useState, useEffect } from 'react';
import { ChevronDown } from "lucide-react";
import './Banner.css'; 

//Array de mensajes de Banner
const messages_en = [
    "✨ New Collection Drop! Get Up to 35% OFF on selected items.",
    "FREE SHIPPING on all orders over €75!",
    "Pay in interest-free installments! 💳 Explore flexible payment options."
];

//Logica de la rotacion de los mensajes en Banner

export default function Banner() {
    const [announcementIndex, setAnnouncementIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setAnnouncementIndex(prevIndex => (prevIndex + 1) % messages_en.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="announcement-bar">
            <div className="announcement-content">
                {messages_en[announcementIndex]}
            </div>
            
            <div className="announcement-utilities">
                <div className="utility-selector">
                    € EUR <ChevronDown size={14} />
                </div> 
                
                <div className="utility-selector">
                    🇬🇧 EN <ChevronDown size={14} />
                </div> 
            </div>
        </div>
    );
}