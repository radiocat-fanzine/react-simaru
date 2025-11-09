import { useState } from 'react';
import { User, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './LoginView.css'; 

export default function LoginView() {
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    
    // Estado local para el formulario y datos simulados
    const [email, setEmail] = useState('margarita.silvestre@mail.com');
    const [password, setPassword] = useState('123456');
    const SIMULATED_PHOTO_URL = "/imgs/user.jpg"; 

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (email === "margarita.silvestre@mail.com" && password === "123456") {
            login(SIMULATED_PHOTO_URL); 
            navigate('/profile'); 
        } else {
            alert("Username or password invalid.");
        }
    };
    
    if (isLoggedIn) {
        navigate('/profile');
        return null;
    }

    return (
        <div className="login-container">
            <h2>Welcome to Simaru</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // Lógica para rellenar al hacer clic
                    onClick={() => {
                        setEmail("margarita.silvestre@mail.com");
                        setPassword("123456");
                    }}
                    required
                />
                
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // Lógica para rellenar al hacer clic
                    onClick={() => {
                        setEmail("margarita.silvestre@mail.com");
                        setPassword("123456");
                    }}
                    required
                />

                <button type="submit" className="btn-sign-in">
                    Sign In
                </button>
            </form>

            <div className="login-footer">
                <p>
                    <a href="#" onClick={(e) => e.preventDefault()}>Forgot your password?</a> <Key size={14} style={{verticalAlign: 'middle'}}/>
                </p>
                <p>
                    <a href="#" onClick={(e) => e.preventDefault()}>Not a member? Register</a> <User size={14} style={{verticalAlign: 'middle'}}/>
                </p>
            </div>
        </div>
    );
}
