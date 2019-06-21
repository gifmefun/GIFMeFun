require('dotenv').config()
const express = require('express');
const app = express();
const router = require('./routers')
const cors = require('cors')
const volleyball = require('volleyball')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.connect((process.env.MONGOOSE_CONNECT || 'mongodb://localhost:27017/mwp'), { useNewUrlParser: true }, (err) => {
 if(err)console.log(`couldn't connect the mongo db`)
 else console.log(`connected to database on ${process.env.MONGOOSE_CONNECT}`)
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use(volleyball)

app.use('/test',(req,res)=>{res.send('success')})
app.use('/',router)


app.use(function (error, req, res, next) {
    console.log(error)
    // if (error.fromRoute) console.log(error.fromRoute)
    if (!error.statusCode) error.statusCode = 500   
    if(error.errors){
        if (error.errors.email) { error.statusCode = 400; error.message = error.errors.email.message }
    }
    res.status(error.statusCode).json({ message: error.message, error });
});

app.listen(port, () => console.log(`listening on port ${port}`));

