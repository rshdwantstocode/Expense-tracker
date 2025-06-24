import {
    Wallet,
    History,
    Plus,
    UtensilsCrossed
} from 'lucide-react';
import React from "react";
import Dialog from './DialogAdd';


export default function Transactions({ transactions, setTransactions }) {
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


    return <>
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
    </>
}