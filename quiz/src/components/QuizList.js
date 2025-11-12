import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getServerData } from '../helper/helper';
import '../styles/Main.css';

export default function QuizList() {
    const { username, role } = useSelector((state) => state.result);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

        fetchQuizzes();
    }, []);

    return (
        <div className="container">
            <h1 className="title text-light">Available Quizzes</h1>
            <p className="welcome-message">Welcome, {username}! ({role})</p>

            <div className="quizzes-list">
                {loading ? (
                    <p>Loading quizzes...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : quizzes.length === 0 ? (
                    <p>No quizzes available at the moment. Please check back later!</p>
                ) : (
                    <ul>
                        {quizzes.map((quiz) => (
                            <li key={quiz._id} className="quiz-item">
                                <div className="quiz-info">
                                    <strong>{quiz.quizId}</strong> - Created on {new Date(quiz.createdAt).toLocaleDateString()}
                                </div>
                                <Link className="btn" to={`/quiz/${quiz.quizId}`}>
                                    Start Quiz
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="back-link">
                <Link className="btn" to="/">
                    Back to Main
                </Link>
            </div>
        </div>
    );
}
