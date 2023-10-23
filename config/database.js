const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI
const db = mongoose.connection

module.exports = function() {
    mongoose.set("strictQuery", true)
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

// Listen for error, open, or close on connection
db.on("error", (error) => console.log(error))
db.on("open", () => console.log('Connected to MongoDB'))
db.on("close", () => console.log('MongoDB disconnected'))