require('dotenv').config();

const  express= require('express');
const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

const app = express();

app.get('/', (req, res) =>{         //test
    res.json({text: 'testing'})
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, ()=>{
            console.log("Listening on port: ", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err)
    });
