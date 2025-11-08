import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postServerData } from '../helper/helper';
import '../styles/Login.css';

export default function AddQuiz() {
    const { role } = useSelector((state) => state.result);
    const [quizName, setQuizName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await postServerData('/quizzes', { quizName });

            if (response.msg) {
                navigate('/admin');
            } else {
                setError(response.error || 'Failed to create quiz');
            }
        } catch (err) {
            setError('An error occurred while creating the quiz');
        } finally {
            setLoading(false);
        }
    };

    if (role !== 'admin') {
        return <div>Access denied. Admin only.</div>;
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">Add New Quiz</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="quizName">Quiz Name</label>
                        <input
                            type="text"
                            id="quizName"
                            value={quizName}
                            onChange={(e) => setQuizName(e.target.value)}
                            required
                            placeholder="Enter quiz name"
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Creating Quiz...' : 'Create Quiz'}
                    </button>
                </form>
                <div className="toggle-mode">
                    <button
                        type="button"
                        className="toggle-btn"
                        onClick={() => navigate('/admin')}
                    >
                        Back to Admin Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
