const app = require('./app');
const sequelize = require('./config/db');  // Import the Sequelize instance
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Sync Sequelize models with the database
        await sequelize.sync();
        console.log('Database connected and models synced');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

startServer();
