const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') // parses JSON data to JS object
const dotenv = require('dotenv')

dotenv.config()

const app = express()

//connect to database

mongoose.connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // findAndModify: false,
    // useUnifiedTopology: true,
    // useCreateIndex: true
})
.then(()=>{
    console.log('db connected');
})
.catch(err => console.log('DB CONNECTION ERROR:', err));

//import routes

const authRoutes = require('./routes/auth')

//app middlewares - should be on the top of route middlewares

app.use(morgan('dev')); //GET /api/signup 304 3.524 ms - -
app.use(bodyParser.json())
app.use(cors()); // allows all origins
if(process.env.NODE_ENV = 'development'){
    app.use(cors({origin: `http://localhost:3000`}))
} // to allow client/react side origin which runs on 3000 , as server is running on 8000


//middleware - between sending request and response processing
app.use('/api', authRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`API is running on port ${port}`)
})
