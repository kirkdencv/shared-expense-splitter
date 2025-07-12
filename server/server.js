require('dotenv').config();

const  express= require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(process.env.PORT);


app.get('/', (req, res) =>{         //test
    res.json({text: 'testing'})
});