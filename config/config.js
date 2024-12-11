const config = {
    env: process.env.NODE_ENV || 'development', // 'production' in deployment
    port: process.env.PORT || 3001,            // Render assigns a dynamic port
    jwtSecret: process.env.JWT_SECRET || "default_secret_key", // Use a secure secret in production
    mongoUri: process.env.MONGO_URI ||        // Use Render environment variables for MongoDB
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/mernproject'
};

export default config;

// mongodb+srv://CanTrade:CanTrade%401324@cluster0.pnvyo.mongodb.net/CanTrade?retryWrites=true&w=majority&appName=Cluster0