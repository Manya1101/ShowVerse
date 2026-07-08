import mongoose from 'mongoose';

const buildMongoUri = (uri, dbName = 'ShowVerse') => {
    if (!uri) {
        throw new Error('MONGODB_URI is not set');
    }

    // Keep URI as-is when a database name is already present.
    const dbPathMatch = uri.match(/\/\/[^/]+\/([^?]+)/);
    if (dbPathMatch?.[1]) {
        return uri;
    }

    const [base, query] = uri.split('?');
    const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
    return query ? `${normalizedBase}/${dbName}?${query}` : `${normalizedBase}/${dbName}`;
};

const connectDB = async () => {
    try {
        const mongoUri = buildMongoUri(process.env.MONGODB_URI);

        mongoose.connection.on('connected', () => console.log('Database connected'));
        mongoose.connection.on('error', (err) => console.error('Database connection error:', err.message));

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        throw error;
    }
};

export default connectDB;
