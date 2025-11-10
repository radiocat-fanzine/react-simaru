import { Link } from "react-router-dom";
import { ChevronLeft, LogIn, CreditCard, ShoppingBag, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoginView from '../Auth/LoginView';
import './UserProfile.css';

export default function UserProfile() {

    //Login simulado
    const { isLoggedIn, logout, userPhotoURL } = useAuth();

    //Datos del usuario Modelo para autollenado

    const userData = {
        username: "@margarita_silvestre",
        fullName: "Margarita Silva",
        email: "margarita.silvestre@mail.com",
        address: "Am Waldrand 12, 10115 Munchen, Germany",
        orders: 17,
        joined: "October 2023",
    };
    
    // Datos para el menu lateral
    const profileMenu = [
        { name: "My Purchases", icon: ShoppingBag, path: "/profile/purchases" },
        { name: "Payment Methods", icon: CreditCard, path: "/profile/payments" },
        { name: "Edit Profile", icon: Settings, path: "/profile/edit" },
        { name: "Sign Out", icon: LogIn, action: logout },
    ];

    // Componente para Dashboard del Usuario
    const DashboardView = () => (
        <div className="profile-main-container">
        
        <Link to="/" className="back-to-home">
            <ChevronLeft size={20} /> <span>Back to Home</span>
        </Link>

        <div className="dashboard-grid">
            <div className="sidebar-menu">
            
            <div className="profile-header-info">
                <div className="profile-picture-container">
                <img src={userPhotoURL} alt="User Profile" /> 
                </div>
                <h3>Hello, {userData.fullName}!</h3>
                <p>{userData.username}</p>
            </div>

            <h4>My Account</h4>
            <nav>
                {profileMenu.map(item => (
                <a 
                    key={item.name}
                    href="#" 
                    onClick={(e) => { e.preventDefault(); if (item.action) item.action(); }}
                    className="profile-link"
                >
                    <item.icon size={18} /> {item.name}
                </a>
                ))}
            </nav>

        </div>

        <div className="main-content">
            <h2>Personal Information</h2>

            <div className="content-section notitle">
                <p><strong>Full Name:</strong> {userData.fullName}</p>
                <p><strong>Email Address:</strong> {userData.email}</p>
                <p><strong>Member Since:</strong> {userData.joined}</p>
                <p><strong>Completed Orders:</strong> {userData.orders}</p>
            </div>

            <hr />

            <div className="content-section title">
                <h3>Shipping Address</h3>
                <p>{userData.address}</p>
                <a href="#" onClick={(e) => e.preventDefault()}>Manage Addresses</a>
            </div>

            <hr />
            <div className="content-section title">
                <h3>Payment Summary</h3>
                <p>Visa ending in **4567**</p>
                <p>PayPal linked.</p>
            </div>
            </div>
        </div>
        </div>
    );

    return isLoggedIn ? <DashboardView /> : <LoginView />;
}