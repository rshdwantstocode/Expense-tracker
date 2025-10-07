import express from 'express'
import { getHomePage, expensesPage } from '../controllers/expenseController.js';


const router = express.Router();

router.get("/", getHomePage)
router.get("/expenses", expensesPage)

export default router