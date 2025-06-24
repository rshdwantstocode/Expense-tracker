import {
    LayoutDashboard,
    CreditCard,
    BanknoteArrowDown,
    CircleHelp,
    Settings,
} from 'lucide-react';
import React from 'react';

import Expenses from './Expenses';
import Transactions from './Transactions';


export default function Body() {

    const [transactions, setTransactions] = React.useState([]);

    function calculateTotal(transactions, categories) {
        return transactions
            .filter(txn => categories.includes(txn.category))
            .reduce((sum, txn) => sum + Number(txn.spent), 0);
    }

    const totalFood = calculateTotal(transactions, ['food']);
    const totalBills = calculateTotal(transactions, ['bills']);
    const totalOther = calculateTotal(transactions, ['shopping', 'other', 'transport']);

    return <>
        <main>
            <section className="dashboard-section radius-and-color">
                <div className="route-container">
                    <a href=""><LayoutDashboard />  Dashboard</a>
                    <a href=""><CreditCard />Bill and Payments</a>
                    <a href=""><BanknoteArrowDown />Expenses</a>
                    <a href=""><Settings />Settings</a>
                    <a href="https://chatgpt.com/" target="blank"><CircleHelp />Get Help</a>
                </div>
            </section>

            <Expenses totalFood={totalFood} totalBills={totalBills} totalOther={totalOther} />

            <Transactions
                transactions={transactions}
                setTransactions={setTransactions}
            />

        </main>
    </>
}