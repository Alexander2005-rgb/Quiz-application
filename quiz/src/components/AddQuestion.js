import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postServerData, getServerData } from '../helper/helper';
import '../styles/Login.css';

export default function AddQuestion() {
    const { role } = useSelector((state) => state.result);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getServerData('/quizzes');
                setQuizzes(data);
            } catch (err) {
                setError('Failed to load quizzes');
            }
        };

        if (role === 'admin') {
            fetchQuizzes();
        }
    }, [role]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!selectedQuiz || !question || options.some(opt => !opt) || correctAnswer === '') {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        try {
            const response = await postServerData('/questions/add', {
                quizId: selectedQuiz,
                question,
                options,
                correctAnswer: parseInt(correctAnswer)
            });

            if (response.msg) {
                navigate('/admin');
            } else {
                setError(response.error || 'Failed to add question');
            }
        } catch (err) {
            setError('An error occurred while adding the question');
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
                <h1 className="login-title">Add Question to Quiz</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="quizSelect">Select Quiz</label>
                        <select
                            id="quizSelect"
                            value={selectedQuiz}
                            onChange={(e) => setSelectedQuiz(e.target.value)}
                            required
                        >
                            <option value="">Choose a quiz</option>
                            {quizzes.map((quiz) => (
                                <option key={quiz._id} value={quiz.quizId}>
                                    {quiz.quizId}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="question">Question</label>
                        <textarea
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                            placeholder="Enter the question"
                            rows="3"
                        />
                    </div>
                    {options.map((option, index) => (
                        <div key={index} className="form-group">
                            <label htmlFor={`option${index}`}>Option {index + 1}</label>
                            <input
                                type="text"
                                id={`option${index}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                                placeholder={`Enter option ${index + 1}`}
                            />
                        </div>
                    ))}
                    <div className="form-group">
                        <label htmlFor="correctAnswer">Correct Answer</label>
                        <select
                            id="correctAnswer"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            required
                        >
                            <option value="">Select correct answer</option>
                            <option value="0">Option 1</option>
                            <option value="1">Option 2</option>
                            <option value="2">Option 3</option>
                        </select>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Adding Question...' : 'Add Question'}
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
