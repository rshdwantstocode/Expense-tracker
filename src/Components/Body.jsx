import {
    LayoutDashboard,
    CreditCard,
    BanknoteArrowDown,
    CircleHelp,
    Settings,
} from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

import Expenses from './Expenses';
import Transactions from './Transactions';
import ExpensesLimit from './ExpensesLimit/ExpensesLimit';



export default function Body() {

    const [transactions, setTransactions] = React.useState([]);
    const [expenseLimit, setExpenseLimit] = React.useState({
        foods: '0',
        bills: '0',
        others: '0',
    })

    function calculateTotal(transactions, categories) {
        return transactions
            .filter(txn => categories.includes(txn.category))
            .reduce((sum, txn) => sum + Number(txn.spent), 0);
    }

    function handleExpenseLimit(newLimit) {
        setExpenseLimit({
            foods: newLimit.foods,
            bills: newLimit.bills,
            others: newLimit.others,
        })
    }

    const totalFood = calculateTotal(transactions, ['food']);
    const totalBills = calculateTotal(transactions, ['bills']);
    const totalOther = calculateTotal(transactions, ['shopping', 'other', 'transport']);

    return <>
        <main className='main-container'>
            <section className="dashboard-section radius-and-color">
                <div className="route-container">
                    <Link to="/"><LayoutDashboard /> Dashboard</Link>
                    <Link to="/bill-payments"><CreditCard /> Bill and Payments</Link>
                    <Link to="/expenses"><BanknoteArrowDown /> Expenses</Link>
                    <Link to="/settings"><Settings /> Settings</Link>
                    <a href="https://chatgpt.com/" target="blank"><CircleHelp />Get Help</a>
                </div>
            </section>

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>

                    <Route path="/" element={
                        <motion.div
                            key="default-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='motion-div'
                        >

                            <Expenses
                                limit={expenseLimit}
                                totalFood={totalFood} totalBills={totalBills} totalOther={totalOther} />

                            <Transactions
                                transactions={transactions}
                                setTransactions={setTransactions}
                            />
                        </motion.div>
                    } />

                    <Route path="/expenses" element={
                        <motion.div
                            key="expenses-limit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ExpensesLimit
                                addExpenseLimit={handleExpenseLimit}
                            />
                        </motion.div>

                    } />

                </Routes>
            </AnimatePresence>


        </main>
    </>
}