const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect
(process.env.MONGODB_URL, 
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    }).then(() =>{
        console.log("Connected to MongoDB");
    }).catch((err) =>{
        console.log("Error connecting to MongoDB: ", err);
    }
);

const userRouter = require('./routes/userRoutes');
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});







