import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from "./config/db.js"
import productRoutes from "./routes/product.routes.js"

const PORT = process.env.PORT || 5000
const app = express()

dotenv.config()
app.use(express.json())

app.listen(PORT, () => {
  connectDB()
  console.log("Hey Hey!! We're the Monkees!!")
})

app.use("/api/products", productRoutes)
