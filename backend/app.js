// imports
require("dotenv").config();
//express - cors - bodyParser
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

//middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("uploads"));

//database connecttion
mongoose
.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex:true,
})

.then(() => console.log("connect databse"))
.catch((err) => console.log(err));

// router api
app.use("/api/post",require("./routes/router"));

//start server
app.listen(port,() => console.log(`server running at http://localhost:${port}`));




