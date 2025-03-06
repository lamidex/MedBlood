const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./src/config/db.js');
const bloodRoutes = require('./src/routes/blood.routes.js');
const userRoutes = require('./src/routes/user.routes')


dotenv.config();
const app = express();
const port = process.env.PORT;

//Middleware
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.get ('/', (req, res) => {
    res.send('Welcome to MedBlood Samples')
});

app.use('/api/v1', bloodRoutes)
app.use('/api/v1', userRoutes)



app.listen(port, () => {
    connectDb();
    console.log((`Server is runing on port ${port}`));
});