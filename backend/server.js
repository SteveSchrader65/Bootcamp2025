import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from "./config/db.js"
import productRoutes from "./routes/product.routes.js"

const app = express()

dotenv.config()
app.use(express.json())

app.listen(5000, () => {
  connectDB()
  console.log("Hey Hey!! We're the Monkees!!")
})

app.use("/api/products", productRoutes)
