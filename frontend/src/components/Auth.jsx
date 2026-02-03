import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../DesignSystem.css';

const Auth = ({ setGlobalUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('farmer'); // 'farmer' or 'rice_mill'
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        location: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const url = isLogin ? 'http://localhost:8000/api/login/' : 'http://localhost:8000/api/register/';

        const payload = isLogin
            ? { username: formData.username, password: formData.password }
            : {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                profile: { phone: formData.phone, location: formData.location }
            };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.ok) {
                setGlobalUser(data);
                setGlobalUser(data);
                localStorage.setItem('krishi_user', JSON.stringify(data));
                localStorage.setItem('user_role', role); // Save Role
                navigate('/');
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Connection failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-card animate-fade-in">
                <h2 className="text-gradient">{isLogin ? 'Farmer Login' : 'Join Krishi AI'}</h2>
                <p>{isLogin ? 'Welcome back, अन्नदाता!' : 'Start your digital farming journey'}</p>

                {error && <p className="error-msg">{error}</p>}

                {/* Role Switcher Removed as per request */}


                <form onSubmit={handleSubmit}>
                    <input
                        type="text" placeholder="Username" required
                        value={formData.username}
                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                    />
                    {!isLogin && (
                        <input
                            type="email" placeholder="Email (Optional)"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    )}
                    <input
                        type="password" placeholder="Password" required
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                    {!isLogin && (
                        <>
                            <input
                                type="text" placeholder="Phone Number"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                            <input
                                type="text" placeholder="Village / District (Required)" required
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                            />
                        </>
                    )}
                    <button type="submit" className="btn-primary full-width">
                        {isLogin ? 'Login' : 'Signup'}
                    </button>
                </form>

                <p className="toggle-auth">
                    {isLogin ? "Don't have an account?" : "Already registered?"}
                    <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? ' Sign Up' : ' Login'}</span>
                </p>
            </div>

            <style>{`
        .auth-container { 
          display: flex; justify-content: center; align-items: center; 
          min-height: 80vh; 
        }
        .auth-card { width: 400px; text-align: center; display: flex; flex-direction: column; gap: 1rem; }
        .auth-card form { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .auth-card input { padding: 1rem; border-radius: 10px; border: 1px solid #ddd; }
        .error-msg { color: #d9480f; background: rgba(217, 72, 15, 0.1); padding: 0.5rem; border-radius: 10px; }
        .toggle-auth { font-size: 0.9rem; margin-top: 1rem; }
        .toggle-auth span { color: var(--primary-green); font-weight: 700; cursor: pointer; }
        .full-width { width: 100%; justify-content: center; }
        .role-switcher { display: flex; gap: 1rem; margin-bottom: 1rem; justify-content: center; }
        .role-btn {
            flex: 1; padding: 0.8rem; border: 1px solid #ddd; border-radius: 10px;
            background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.2s;
            font-weight: 600;
        }
        .role-btn.active {
            background: var(--primary-green); color: white; border-color: var(--primary-green);
            transform: scale(1.05); box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
        }
      `}</style>
        </div>
    );
};

export default Auth;
