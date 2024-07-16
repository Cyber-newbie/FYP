const express = require('express');
const cors = require('cors')
//path to env config/.env
require('dotenv').config({
    path: './config/.env'
})
const connectDB = require('./config/db');
const authRoute = require('./routes/auth.route')
// Initialize the Express app
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
const port = process.env.PORT || 5050;
connectDB()

//routes
app.use('/api/auth', authRoute)

// Start the server
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (error) => {
    process.kill(process.pid)
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
    process.exit(0)
})

const shutdown = () => {
    server.close(() => {
        console.log('Server gracefully terminated');
        process.exit(0);
    });
};



// Handle nodemon restarts
process.on('SIGUSR2', () => {
    server.close(() => {
        console.log('Server gracefully terminated due to nodemon restart');
        process.kill(process.pid, 'SIGUSR2');
    });
});