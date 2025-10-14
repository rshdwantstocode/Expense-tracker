import {
    Wallet,
    History,
    Plus,
    UtensilsCrossed
} from 'lucide-react';
import React from "react";
import Dialog from './DialogAdd';
import { api } from '../lib/axios';
import toast from 'react-hot-toast';
import { formatNumber } from '../utils/FormatNumber';



export default function Transactions({ transactions, onTransactionAdded }) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [editingTransaction, setEditingTransaction] = React.useState(null);

    const handleAddTransaction = () => {
        // setTransactions([...transactions, newTransaction]);
        if (onTransactionAdded) {
            onTransactionAdded(); // Refresh from database
        }
    };

    const handleEditTransaction = async (updatedTransaction) => {
        try {
            const token = localStorage.getItem('token');

            // Update in database
            await api.put(`/expense/transaction/${updatedTransaction.id}`,
                updatedTransaction,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Transaction updated successfully!");

            // Refresh from database
            if (onTransactionAdded) {
                await onTransactionAdded();
            }

        } catch (error) {
            console.error('Error updating transaction:', error);
            toast.error("Failed to update transaction");
        }
    };

    const handleDeleteTransaction = async (id) => {
        try {
            const token = localStorage.getItem('token');

            await api.delete(`/expense/transaction/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Transaction deleted succesfully!');

            if (onTransactionAdded) {
                await onTransactionAdded();
            }

            setIsDialogOpen(false)
            setEditingTransaction(null)

        } catch (error) {
            console.log("Error deleting transaction:", error);
            toast.error("Failed to delete transaction");
        }
    }

    const handleTransactionClick = (transaction, index) => {
        setEditingTransaction({ ...transaction, index });
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingTransaction(null);
    };


    return <>
        <section className="transaction-section radius-and-color">
            <div className="transaction-container">
                <h3 className="transaction-title"><History />Transaction history</h3>
                <span className="transaction-history">
                    {transactions.length < 1 ? (
                        <p className='no-transaction'>No transactions yet.</p>
                    ) : (
                        transactions.map((txn) => {
                            return (
                                <span key={txn.id} className='transactions'
                                    onClick={() => handleTransactionClick(txn)}
                                    title="Click to edit"
                                >
                                    <span>
                                        {txn.category === 'food' ? <UtensilsCrossed /> : <Wallet />}
                                        {txn.spend}
                                    </span>
                                    {formatNumber(txn.spent) + '.00'}
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

                <button className=' bg-slate-700 hover:bg-slate-600 '
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
    </>
}