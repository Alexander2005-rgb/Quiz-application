//components/Main.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "../redux/result_reducer";
import "../styles/Main.css";

export default function Main() {
    const { username, role } = useSelector((state) => state.result);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearAuth());
        navigate('/login');
    };

    return (
        <div className="container">
            <h1 className="title text-light">Quiz Application</h1>
            <p className="welcome-message">Welcome, {username}! ({role})</p>
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>

            {role === 'admin' ? (
                <div className="admin-options">
                    <h2>Admin Dashboard</h2>
                    <div className="admin-buttons">
                        <Link className="btn admin-btn" to="/admin/add-quiz">
                            Add New Quiz
                        </Link>
                        <Link className="btn admin-btn" to="/admin/add-question">
                            Add Question to Quiz
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <ol>
                        <li>You will be asked 10 questions one after another.</li>
                        <li>10 points is awarded for the correct answer.</li>
                        <li>
                            Each question has three options. You can choose only one options.
                        </li>
                        <li>You can review and change answers before the quiz finish.</li>
                        <li>The result will be declared at the end of the quiz.</li>
                    </ol>

                    <div className="start">
                        <Link className="btn" to="/quiz-list">
                            View Available Quizzes
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
