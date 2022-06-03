const mongoose = require("mongoose")

require('dotenv').config();

const connectionstr = process.env.MONGODB_URL

mongoose.connect(connectionstr)

mongoose.connection.on('connected', ()=> {
    console.log(`{${new Date().toLocaleTimeString()}} - MongoDB connected`)
})

mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error', error)
})

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected')
}
)