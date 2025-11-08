import mongoose from 'mongoose'; // Import the mongoose library

export default async function connect() {  // Export an asynchronous function to connect to the database
     try {
          await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quizapp', {
               useNewUrlParser: true,
               useUnifiedTopology: true,
          }); // Connect to the MongoDB database using the provided URI or default
          console.log('Connected to MongoDB');
     } catch (error) {
          console.error('Error connecting to MongoDB:', error);
          throw error; // Rethrow the error to be handled by the caller
     }
}
