import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'

const app = express()

dotenv.config()

app.listen(5000, () => {
  connectDB()
  console.log("Hey Hey!! We're the Monkees!!")
})

app.get('/products', (req, res) => {

})
