import mongoose from "mongoose";

const db = async (): Promise<typeof mongoose.connection> =>{
  try{
    await mongoose.connect(process.env.MONGOURL || 'mongodb://127.0.0.1:27017/socialnetworksDB');
    console.log('Connect to the Datbase.');
    return mongoose.connection;
  } catch (err){
    console.error('Database connection error: ' +err);
    throw new Error('Database connect failed.');
  }
}

export default db;