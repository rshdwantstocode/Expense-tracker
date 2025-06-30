import {
    LayoutDashboard,
    CreditCard,
    BanknoteArrowDown,
    CircleHelp,
    Settings,
} from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Expenses from './Expenses';
import Transactions from './Transactions';
import ExpensesLimit from './ExpensesLimit/ExpensesLimit';



export default function Body() {

    const [transactions, setTransactions] = React.useState([]);
    const [expenseLimitShow, setExpenseLimitShow] = React.useState(false);

    function calculateTotal(transactions, categories) {
        return transactions
            .filter(txn => categories.includes(txn.category))
            .reduce((sum, txn) => sum + Number(txn.spent), 0);
    }

    const totalFood = calculateTotal(transactions, ['food']);
    const totalBills = calculateTotal(transactions, ['bills']);
    const totalOther = calculateTotal(transactions, ['shopping', 'other', 'transport']);

    return <>
        <main className='main-container'>
            <section className="dashboard-section radius-and-color">
                <div className="route-container">
                    <a href=""><LayoutDashboard />  Dashboard</a>
                    <a href=""><CreditCard />Bill and Payments</a>
                    <a onClick={() => setExpenseLimitShow(!expenseLimitShow)}><BanknoteArrowDown />Expenses</a>
                    <a href=""><Settings />Settings</a>
                    <a href="https://chatgpt.com/" target="blank"><CircleHelp />Get Help</a>
                </div>
            </section>

            <AnimatePresence mode="wait">
                {
                    expenseLimitShow ?
                        <motion.div
                            key="expenses-limit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ExpensesLimit />
                        </motion.div>

                        : (<motion.div
                            key="default-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='motion-div'
                        >

                            <Expenses totalFood={totalFood} totalBills={totalBills} totalOther={totalOther} />

                            <Transactions
                                transactions={transactions}
                                setTransactions={setTransactions}
                            />
                        </motion.div>
                        )}
            </AnimatePresence>


        </main>
    </>
}