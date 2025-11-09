import { useState, useEffect } from 'react';

const WISHLIST_KEY = 'miWishlist';

//Se guarda los items elegidos en el localStorage
const getInitialWishlist = () => {
    const savedList = localStorage.getItem(WISHLIST_KEY);
    return savedList ? JSON.parse(savedList) : [];
};

//Funcion para comparar IDs de entrada y salidad
const checkExistence = (list, productId) => {
    return list.some(item => String(item.id) === String(productId));
};

//Funcion para obtener los items guardados
//Y que puedan ser visualizados en la route/WishlistView sin asincronias
export const useWishlist = () => {
    const [wishlist, setWishlist] = useState(getInitialWishlist);

useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}, [wishlist]);

//Funcion para usar strings
const isInWishlist = (productId) => {
        return checkExistence(wishlist, productId);
    };

    const toggleWishlistItem = (product) => {
        setWishlist(prevList => {
        const targetId = product.id; 
        const exists = checkExistence(prevList, targetId);

        if (exists) {
            return prevList.filter(item => String(item.id) !== String(targetId));
        } else 
            return [...prevList, {
                id: targetId,
                title: product.title,
                price: product.price,
                imgURL: product.imgURL
            }];
        }
    );
};

    return { 
        wishlist, 
        toggleWishlistItem, 
        isInWishlist 
    };
};