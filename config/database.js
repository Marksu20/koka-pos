import mongoose from 'mongoose';

export default async function connectToMongoDB(){
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connection Established...');
  } catch (error) {
    console.error(error.message);
  }
}