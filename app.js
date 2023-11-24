const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const connctDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const projectRoute = require('./routes/projectRoute');
const todoRoute = require('./routes/todoRoutes');


connctDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/content',contentRoutes);
app.use('/api/v1/auth',projectRoute);
app.use('/api/v1/to-do',todoRoute);
app.get('/',(req,res)=>{
    res.send('<h1>Hello Learning app</h1>')
})

const PORT = process.env.PORT|| 8080;
const DEV_MODE = process.env.DEV_MODE;
app.listen(PORT,()=>{
    console.log(`Server is running in ${DEV_MODE} on ${PORT} port`);
})