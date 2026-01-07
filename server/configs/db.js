import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        mongoose.connection.on('connected', ()=> console.log('Database connected'));
        console.log('MONGODB_URI:', process.env.MONGODB_URI);

        await mongoose.connect(`${process.env.MONGODB_URI}/ShowVerse`)
    } catch (error) {
        console.log(error.message);
        
    }
}

export default connectDB;