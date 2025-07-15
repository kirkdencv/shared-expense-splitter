require('dotenv').config();

const  express = require('express');
const connectDB = require('./db/connect')

const app = express();

app.get('/', (req, res) =>{
    res.json({text: 'testing'})
});

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is listening at port ${PORT}...`))
    } catch (err) {
        console.log(err)
    }
}

start()
