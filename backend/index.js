require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rootRouter = require("./routes/index");

const app = express();
app.use(cookieParser());
// app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://pay-u.vercel.app'); // replace '*' with the exact origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true); // to allow cookies
    next();
  });
app.use(express.json());

app.use("/api/v1", rootRouter);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;
mongoose.connect(MONGO_URL)
    .then((res) => {
        app.listen(PORT, () => console.log(`Server up and running on port:${PORT}`));
    })
    .catch((err) => {
        console.log("Oops, something went wrong.", err);
    });

app.get("/", (req, res) => {
    res.send("Hello world");
});
