import {
    LayoutDashboard,
    CreditCard,
    BanknoteArrowDown,
    CircleHelp,
    Settings,
    LogOut
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Expenses from './Expenses';
import Transactions from './Transactions';
import ExpensesLimit from './ExpensesLimit/ExpensesLimit';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/axios';
import toast from 'react-hot-toast';

export default function Body() {

    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserTransactions();
        // fetchMoneySetting();
    }, []);

    const fetchUserTransactions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/auth/login');
                return;
            }

            const response = await api.get("/expense/transactions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setTransactions(response.data.transactions);
                console.log('Loaded transactions:', response.data.transactions);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);

            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");
                localStorage.removeItem('token');
                navigate('/auth/login');
            } else {
                toast.error("Failed to load transactions");
            }
        } finally {
            setLoading(false);
        }
    };


    function calculateTotal(transactions, categories) {
        return transactions
            .filter(txn => categories.includes(txn.category))
            .reduce((sum, txn) => sum + Number(txn.spent), 0);
    }


    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/auth/login');
    };

    const refreshTransactions = () => {
        fetchUserTransactions();
    };

    const totalFood = calculateTotal(transactions, ['food']);
    const totalBills = calculateTotal(transactions, ['bills']);
    const totalOther = calculateTotal(transactions, ['shopping', 'other', 'transport']);


    // Default dashboard view
    return (
        <main className='main-container'>
            <section className="dashboard-section radius-and-color">
                <div className="route-container text-black font-light">
                    <Link to="/dashboard"><LayoutDashboard /> Dashboard</Link>
                    <Link to="/money"><CreditCard /> My Money</Link>
                    <Link to="/expenses"><BanknoteArrowDown /> Expenses</Link>
                    <Link to="/settings"><Settings /> Settings</Link>
                    <a href="https://chatgpt.com/" target="blank" rel="noopener noreferrer"><CircleHelp />Get Help</a>
                    <button onClick={handleLogout} className='mx-12 flex gap-2  cursor-pointer'><LogOut />Logout</button>
                </div>
            </section>

            <motion.div
                key="default-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='motion-div'
            >
                <Expenses
                    totalFood={totalFood} totalBills={totalBills} totalOther={totalOther}
                />
                <Transactions
                    transactions={transactions}
                    setTransactions={setTransactions}
                    onTransactionAdded={refreshTransactions}
                />
            </motion.div>
        </main>
    );
}