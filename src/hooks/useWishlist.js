import { useState } from 'react';

const WISHLIST_KEY = 'miWishlist';

// Se guarda los items elegidos en el localStorage
const getInitialWishlist = () => {
    const savedList = localStorage.getItem(WISHLIST_KEY);
    return savedList ? JSON.parse(savedList) : [];
};

// Funcion de soporte para guardar la lista en localStorage
const saveToLocalStorage = (newlist) => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(newlist));
};

// Funcion para comparar IDs de entrada y salida
const checkExistence = (list, productId) => {
    return list.some(item => String(item.id) === String(productId));
};

// Funcion para obtener los items guardados
export const useWishlist = () => {
    const [wishlist, setWishlist] = useState(getInitialWishlist);

    const isInWishlist = (productId) => {
        return checkExistence(wishlist, productId);
    };

    // Funcion para agregar/eliminar datos en el LocalStorage
    const toggleWishlistItem = (product) => {
        setWishlist(prevList => {
            const targetId = product.id; 
            let updatedList;

            if (checkExistence(prevList, targetId)) {
                updatedList = prevList.filter(item => String(item.id) !== String(targetId));
            } else {
                updatedList = [...prevList, {
                    id: targetId,
                    title: product.title,
                    price: product.price,
                    imgURL: product.imgURL
                }];
            }
            
            saveToLocalStorage(updatedList);

            return updatedList;
        });
    };

    // Funcion para eliminar un ítem específico del Wishlist
    const removeWishlistItem = (productId) => {
        setWishlist(prevList => {
            
            const updatedList = prevList.filter(item => String(item.id) !== String(productId));

            saveToLocalStorage(updatedList);
            
            return updatedList;
        });
    };

    return { 
        wishlist, 
        toggleWishlistItem, 
        isInWishlist,
        removeWishlistItem
    };
};