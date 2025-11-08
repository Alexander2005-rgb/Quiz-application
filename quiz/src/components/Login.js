import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postServerData } from '../helper/helper';
import { setAuth } from '../redux/result_reducer';
import '../styles/Login.css';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const payload = isLogin ? { username, password } : { username, password, role };

            const response = await postServerData(endpoint, payload);

            if (response.token || response.msg) {
                if (isLogin) {
                    // Store token in localStorage
                    localStorage.setItem('token', response.token);

                    // Dispatch auth info to Redux
                    dispatch(setAuth({
                        token: response.token,
                        userId: response.user.id,
                        username: response.user.username,
                        role: response.user.role
                    }));

                    // Navigate to main page
                    navigate('/');
                } else {
                    // Registration successful, switch to login
                    setError('Registration successful! Please login.');
                    setIsLogin(true);
                }
            } else {
                setError(response.error || `${isLogin ? 'Login' : 'Registration'} failed`);
            }
        } catch (err) {
            setError(`An error occurred during ${isLogin ? 'login' : 'registration'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">{isLogin ? 'Login to Quiz Application' : 'Register for Quiz Application'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    )}
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>
                <div className="toggle-mode">
                    <button
                        type="button"
                        className="toggle-btn"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                    >
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
}
