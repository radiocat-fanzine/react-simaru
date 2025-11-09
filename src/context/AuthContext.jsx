import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userPhotoURL, setUserPhotoURL] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Efecto para cargar el estado desde localStorage al iniciar
    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        const photoURL = localStorage.getItem('userPhotoURL');

        if (loggedInStatus) {
        setIsLoggedIn(true);
        setUserPhotoURL(photoURL);
        }
        setIsLoading(false);
    }, []);

    // Funcion para Login
    const login = (photoUrl) => {
        //Actualiza estado: sesion iniciada
        setIsLoggedIn(true);
        setUserPhotoURL(photoUrl);

        //Actualiza la persistencia para mantener la sesion iniciada
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userPhotoURL', photoUrl);
    };

    //Funcion para Logout
    const logout = () => {
        //Actualiza estado: sesion cerrada
        setIsLoggedIn(false);
        setUserPhotoURL(null);

        //Actualiza la persistencia para limpiar el storage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userPhotoURL');
    };

    const value = {
        isLoggedIn,
        userPhotoURL,
        login,
        logout,
    };

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
};