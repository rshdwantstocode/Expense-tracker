import {
    LayoutDashboard,
    CreditCard,
    BanknoteArrowDown,
    CircleHelp,
    Settings,
    Wallet,
    History,
    Plus,
    UtensilsCrossed
} from 'lucide-react';
import React from 'react';
import Dialog from './DialogAdd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Body() {

    const [transactions, setTransactions] = React.useState([]);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [editingTransaction, setEditingTransaction] = React.useState(null);

    const handleAddTransaction = (newTransaction) => {
        setTransactions([...transactions, newTransaction]);
    };

    const handleEditTransaction = (updatedTransaction) => {
        setTransactions(transactions.map((txn, index) =>
            index === editingTransaction.index ? updatedTransaction : txn
        ));
        setEditingTransaction(null);
    };

    const handleDeleteTransaction = (id) => {
        setTransactions(transactions.filter(txn => txn.id !== id));
        setIsDialogOpen(false)
        setEditingTransaction(null)
    }

    const handleTransactionClick = (transaction, index) => {
        setEditingTransaction({ ...transaction, index });
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingTransaction(null);
    };

    function calculateTotal(transactions, categories) {
        return transactions
            .filter(txn => categories.includes(txn.category))
            .reduce((sum, txn) => sum + Number(txn.spent), 0);
    }

    const totalFood = calculateTotal(transactions, ['food']);
    const totalBills = calculateTotal(transactions, ['bills']);
    const totalOther = calculateTotal(transactions, ['shopping', 'other', 'transport']);

    function MyChart() {
        const data = {
            labels: ['Food', 'Bills', 'Others'],
            datasets: [
                {
                    data: [
                        totalFood,
                        totalBills,
                        totalOther
                    ],
                    backgroundColor: [
                        '#FF6384', // Red (Food)
                        '#36A2EB', // Blue (Bills)
                        '#FFCE56', // Yellow (Others)
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ₱ ' + context.parsed;
                        }
                    }
                }
            }
        };

        if (totalFood === 0 && totalBills === 0 && totalOther === 0) {
            return (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: '#666'
                }}>
                    <p>No transactions to display</p>
                </div>
            );
        }

        return <Doughnut data={data} options={options} />;
    }

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

            <section className="expenses-section">
                <div className="expenses-categories">
                    <span className="food-category">
                        Food
                        <span className='food-total'>
                            <h2>{totalFood}</h2>
                        </span>
                    </span>

                    <span className="bills-category">
                        Bills
                        <span className='bills-total'>
                            <h2>{totalBills}</h2>
                        </span>
                    </span>

                    <span className="other-category">
                        Others
                        <span className='other-total'>
                            <h2>{totalOther}</h2>
                        </span>
                    </span>
                </div>

                <div className="expenses-chart">

                    <div>
                        <MyChart />
                    </div>
                </div>

            </section>

            <section className="transaction-section radius-and-color">
                <div className="transaction-container">
                    <h3 className="transaction-title"><History />Transaction history</h3>
                    <span className="transaction-history">
                        {transactions.length < 1 ? (
                            <p className='no-transaction'>No transactions yet.</p>
                        ) : (
                            transactions.map((txn, index) => {
                                return (
                                    <span key={index} className='transactions'
                                        onClick={() => handleTransactionClick(txn, index)}
                                        title="Click to edit"
                                    >
                                        <span>
                                            {txn.category === 'food' ? <UtensilsCrossed /> : <Wallet />}
                                            {txn.spend}
                                        </span>
                                        {txn.spent + '.00'}
                                    </span>)
                            })
                        )}

                    </span>
                </div>

                <div className="transaction-footer">
                    <span>
                        <Wallet />
                        <h4>Missing Transaction?</h4>
                    </span>

                    <button
                        onClick={() => { setIsDialogOpen(true) }}
                    ><Plus /></button>
                </div>

                <Dialog
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                    onAddTransaction={editingTransaction ? handleEditTransaction : handleAddTransaction}
                    editingTransaction={editingTransaction}
                    handleDeleteTransaction={handleDeleteTransaction}
                />
            </section>
        </main>
    </>
}