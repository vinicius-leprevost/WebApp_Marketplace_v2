const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://CanTrade:CanTrade@1324@cluster0.pnvyo.mongodb.net/CanTrade?retryWrites=true&w=majority&appName=Cluster0" ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/mernproject'
}
export default config

//mongodb+srv://CanTrade:CanTrade@1324@cluster0.pnvyo.mongodb.net/CanTrade?retryWrites=true&w=majority&appName=Cluster0