import express from 'express';
import connectToMongoDB from './database.js';

const app = express();
const PORT = process.env.PORT || 3000;



// database connection
connectToMongoDB();

app.listen(PORT, ()=>{
  console.log(`server is running on http://localhost:${PORT}`);
})