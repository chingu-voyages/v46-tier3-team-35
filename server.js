require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/database");
const cors = require('cors')
const morgan = require('morgan')
const app = express();
const PORT = 3000;


app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
app.use(express.json())
app.use(morgan('dev'))


// test route
app.get("/", function (req, res) {
  res.send("<h1>Hello, world!</h1>");
});

app.use("/users", require("./routes/userRoutes.js"));
app.use("/crypto", require("./routes/cryptoRoutes"));


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}...`);
  connectToDB();
});


