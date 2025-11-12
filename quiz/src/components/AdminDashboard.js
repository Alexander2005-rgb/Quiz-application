import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServerData } from '../helper/helper';
import { clearAuth } from '../redux/result_reducer';
import '../styles/Main.css';

export default function AdminDashboard() {
    const { username, role } = useSelector((state) => state.result);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearAuth());
        navigate('/login');
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getServerData('/quizzes');
                setQuizzes(data);
            } catch (err) {
                setError('Failed to load quizzes');
            } finally {
                setLoading(false);
            }
        };

        if (role === 'admin') {
            fetchQuizzes();
        }
    }, [role]);

    if (role !== 'admin') {
        return <div>Access denied. Admin only.</div>;
    }

    return (
        <div className="container">
            <h1 className="title text-light">Admin Dashboard</h1>
            <p className="welcome-message">Welcome, {username}! ({role})</p>
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>

            <div className="admin-options">
                <div className="admin-buttons">
                    <Link className="btn admin-btn" to="/admin/add-quiz">
                        Add New Quiz
                    </Link>
                    <Link className="btn admin-btn" to="/admin/add-question">
                        Add Question to Quiz
                    </Link>
                </div>

                <div className="quizzes-list">
                    <h2>Existing Quizzes</h2>
                    {loading ? (
                        <p>Loading quizzes...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : quizzes.length === 0 ? (
                        <p>No quizzes found. Create your first quiz!</p>
                    ) : (
                        <ul>
                            {quizzes.map((quiz) => (
                                <li key={quiz._id}>
                                    <strong>{quiz.quizId}</strong> - Created on {new Date(quiz.createdAt).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="back-link">
                <Link className="btn" to="/">
                    Back to Main
                </Link>
            </div>
        </div>
    );
}
