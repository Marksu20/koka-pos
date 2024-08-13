import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './config/database.js';
import { router } from './routes/user.Routes.js'
import { requireAuth, checkUser } from './config/isAuth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(checkUser);

// set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// database connection
connectToMongoDB();


// ROOT
app.get('/', (req, res) => {
  res.render('sign-in')
})

// POS
app.use('/pos', router); 

app.use('/api/auth', router)

app.get('/index', requireAuth, (req, res) => {
  res.render("index", {
    user: res.locals.user
  });
});

// import the user route
// app.use("/api/v1/user", router)

// Listened to the PORT
app.listen(PORT, ()=>{
  console.log(`server is running on http://localhost:${PORT}`);
})