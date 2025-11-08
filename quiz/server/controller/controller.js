//controller/controller.js

import Questions from "../models/questionSchema.js"; // import Questions model
import Results from "../models/resultSchema.js";// import Results model
import User from "../models/userSchema.js"; // import User model
import questions, { answers } from '../database/data.js'// import questions and answers from data.js
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

/** get all questions */
export async function getQuestions(req, res) {// async function to get questions async function means it returns a promise
    try {
        const { quizId } = req.query; // Get quizId from query parameters
        let q;

        if (quizId) {
            // Filter questions by quizId
            q = await Questions.find({ quizId });
            if (q.length === 0) {
                // If no questions found for the quiz, return empty array
                return res.json([]);
            }
        } else {
            // If no quizId provided, return all questions (for backward compatibility)
            q = await Questions.find();
            if (q.length === 0) {
                await Questions.insertMany({ questions, answers });// insert questions and answers if no questions found
                q = await Questions.find();// find again after insertion
            }
        }

        res.json(q); // send questions as json response
    } catch (error) {
        res.json({ error });
    }
}

/** insert all questinos */
export async function insertQuestions(req, res) {
    try {
        Questions.insertMany({ questions: questions, answers: answers })
    } catch (error) {
        res.json({ error })
    }
}

/** Delete all Questions */
export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!" });
    } catch (error) {
        res.json({ error })
    }
}

/** get all result */
export async function getResult(req, res) {
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;
        if (!username && !result) throw new Error('Data Not Provided...!');

        const newResult = await Results.create({ username, result, attempts, points, achived });
        res.json({ msg: "Result Saved Successfully...!", result: newResult });

    } catch (error) {
        res.json({ error });
    }
}

/** delete all result */
export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({ msg: "Result Deleted Successfully...!" })
    } catch (error) {
        res.json({ error })
    }
}

/** Register user */
export async function registerUser(req, res) {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword,
            role: role || 'user'
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Login user */
export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Middleware to verify JWT token */
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

/** Middleware to check if user is admin */
export const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

/** Create a new quiz */
export async function createQuiz(req, res) {
    try {
        const { quizName } = req.body;

        if (!quizName) {
            return res.status(400).json({ error: 'Quiz name is required' });
        }

        // Check if quiz already exists
        const existingQuiz = await Questions.findOne({ quizId: quizName });
        if (existingQuiz) {
            return res.status(400).json({ error: 'Quiz already exists' });
        }

        // Create a new quiz document with empty questions and answers
        const newQuiz = new Questions({
            quizId: quizName,
            questions: [],
            answers: []
        });

        await newQuiz.save();
        res.status(201).json({ msg: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: error.message });
    }
}

/** Add a question to a quiz */
export async function addQuestion(req, res) {
    try {
        const { quizId, question, options, correctAnswer } = req.body;

        if (!quizId || !question || !options || correctAnswer === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (options.length !== 3) {
            return res.status(400).json({ error: 'Exactly 3 options are required' });
        }

        if (correctAnswer < 0 || correctAnswer > 2) {
            return res.status(400).json({ error: 'Correct answer must be 0, 1, or 2' });
        }

        const quiz = await Questions.findOne({ quizId });
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Add the question and answer
        quiz.questions.push({
            id: quiz.questions.length + 1,
            question,
            options
        });
        quiz.answers.push(correctAnswer);

        await quiz.save();
        res.json({ msg: 'Question added successfully', quiz });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: error.message });
    }
}

/** Get all quizzes */
export async function getQuizzes(req, res) {
    try {
        const quizzes = await Questions.find({}, 'quizId createdAt');
        res.json(quizzes);
    } catch (error) {
        console.error('Error getting quizzes:', error);
        res.status(500).json({ error: error.message });
    }
}
