import express from 'express'
import { getHomePage, createTransaction, getAuthenticatedTransaction, editTransaction, deleteTransaction } from '../controllers/expenseController.js';
import authenticateToken from '../middleware/auth.js';


const router = express.Router();

router.get("/", getHomePage)
router.get("/transactions", authenticateToken, getAuthenticatedTransaction)
router.put("/transaction/:id", authenticateToken, editTransaction)
router.delete("/transaction/:id", authenticateToken, deleteTransaction)
router.post("/transaction", authenticateToken, createTransaction)


export default router
