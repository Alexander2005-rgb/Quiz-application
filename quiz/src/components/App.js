//components/App.js

import '../styles/App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/** import components */
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import AddQuiz from './AddQuiz';
import AddQuestion from './AddQuestion';
import QuizList from './QuizList';
import { CheckUserExist } from '../helper/helper';


/** react routes */
const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <CheckUserExist><Main /></CheckUserExist>
    },
    {
        path: '/quiz-list',
        element: <CheckUserExist><QuizList /></CheckUserExist>
    },
    {
        path: '/quiz/:quizId',
        element: <CheckUserExist><Quiz /></CheckUserExist>
    },
    {
        path: '/result',
        element: <CheckUserExist><Result /></CheckUserExist>
    },
    {
        path: '/admin',
        element: <CheckUserExist><AdminDashboard /></CheckUserExist>
    },
    {
        path: '/admin/add-quiz',
        element: <CheckUserExist><AddQuiz /></CheckUserExist>
    },
    {
        path: '/admin/add-question',
        element: <CheckUserExist><AddQuestion /></CheckUserExist>
    },
])

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
