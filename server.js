import dotenv from "dotenv"
import express from "express"
import contactRoutes from "./routes/contact.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import { verifyUser } from "./middleware/verifyUser.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// MIDDLEWARE
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.use(verifyUser)
app.use("/api/contact", contactRoutes)

app.listen(PORT, () => console.log("Running on port", PORT))
