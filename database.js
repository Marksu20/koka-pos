import mongoose from 'mongoose';

export default async function connectToMongoDB(){
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('connected to mongo database');
  } catch (error) {
    console.log(error);
  }
}