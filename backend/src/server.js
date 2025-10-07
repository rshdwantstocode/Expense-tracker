import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import expenseRoutes from './routes/expenseRoutes.js'
import authRoutes from './routes/authRoutes.js'
import connectDB from './config/db.js'

const app = express()
const PORT = 3000

dotenv.config()

if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(express.json())

app.use('/expense', expenseRoutes);
app.use('/auth', authRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on Port ${PORT}`);
    })
}).catch((err) => {
    console.log("Error connecting to Database", err);
});
