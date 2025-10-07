import {
    LayoutDashboard,
    CreditCard,
    BanknoteArrowDown,
    CircleHelp,
    Settings,
} from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

import Expenses from './Expenses';
import Transactions from './Transactions';
import ExpensesLimit from './ExpensesLimit/ExpensesLimit';
import { Link } from 'react-router-dom';

export default function Body({ currentView = "dashboard" }) {

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

    // Remove Routes and conditionally render based on props
    if (currentView === "expenses") {
        return (
            <main className='main-container'>
                <section className="dashboard-section radius-and-color">
                    <div className="route-container">
                        <Link to="/dashboard"><LayoutDashboard /> Dashboard</Link>
                        <Link to="/bill-payments"><CreditCard /> Bill and Payments</Link>
                        <Link to="/expenses"><BanknoteArrowDown /> Expenses</Link>
                        <Link to="/settings"><Settings /> Settings</Link>
                        <a href="https://chatgpt.com/" target="blank" rel="noopener noreferrer"><CircleHelp />Get Help</a>
                    </div>
                </section>

                <motion.div
                    key="expenses-limit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='motion-div'
                >
                    <ExpensesLimit addExpenseLimit={handleExpenseLimit} />
                </motion.div>
            </main>
        );
    }

    // Default dashboard view
    return (
        <main className='main-container'>
            <section className="dashboard-section radius-and-color">
                <div className="route-container">
                    <Link to="/dashboard"><LayoutDashboard /> Dashboard</Link>
                    <Link to="/bill-payments"><CreditCard /> Bill and Payments</Link>
                    <Link to="/expenses"><BanknoteArrowDown /> Expenses</Link>
                    <Link to="/settings"><Settings /> Settings</Link>
                    <a href="https://chatgpt.com/" target="blank" rel="noopener noreferrer"><CircleHelp />Get Help</a>
                </div>
            </section>

            <motion.div
                key="default-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='motion-div'
            >
                <Expenses
                    limit={expenseLimit}
                    totalFood={totalFood} totalBills={totalBills} totalOther={totalOther}
                />
                <Transactions
                    transactions={transactions}
                    setTransactions={setTransactions}
                />
            </motion.div>
        </main>
    );
}