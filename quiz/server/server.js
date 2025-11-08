/* Express framework for building web applications */
import express from 'express'
/* HTTP request logger middleware */
import morgan from 'morgan'
import cors from 'cors'/* Environment variable management */
import { config } from 'dotenv' /* Database connection module */
import router from './router/router.js';
import connect from './database/conn.js';

/* Load environment variables from a .env file */


config();

const app = express(); /* Create an Express application instance */

app.use(morgan('tiny')); /* Use morgan middleware for logging HTTP requests */
app.use(cors()); /* Enable CORS for all routes */
app.use(express.json()); /* Middleware to parse JSON request bodies */     

const port = process.env.PORT || 3000; /* Define the port to run the server on */

app.use('/api', router); /* Use the router for API routes */

app.get('/', (req, res) => {
     try {
          res.json("Get Request")
     } catch (error) {
          res.json(error)
     }
}); /* Define a root route that responds with a JSON message */     

connect().then(() => {
     app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
     });
     
}).catch((error) => {
     console.error("Database connection failed:", error);
}); /* Connect to the database and start the server */