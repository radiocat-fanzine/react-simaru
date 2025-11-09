import { useState, useEffect } from 'react';
import './EmptyStateCarousel.css';

// URLs de imágenes para carrusel
const IMAGE_URLS = [
    '/imgs/BG-01.jpg',
    '/imgs/BG-02.jpg',
    '/imgs/BG-03.jpg',
    '/imgs/BG-04.jpg',
    '/imgs/BG-05.jpg',
    '/imgs/BG-06.jpg',
];

const EmptyStateCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Lógica para cambiar la imagen cada 3 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                (prevIndex + 1) % IMAGE_URLS.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel-container">
            {IMAGE_URLS.map((url, index) => (
                <img
                    key={index}
                    src={url}
                    alt={`Product recommendation ${index + 1}`}
                    className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                />
            ))}
        </div>
    );
};

export default EmptyStateCarousel;