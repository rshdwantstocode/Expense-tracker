import { useState, useEffect, useRef } from "react";
import uniqid from 'uniqid';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/axios";


export default function Dialog({ isOpen, onClose, onAddTransaction, editingTransaction, handleDeleteTransaction }) {

    const navigate = useNavigate();
    const hasSubmitted = useRef(false);

    const categories = [
        { value: "food", label: "Food & Drinks" },
        { value: "transport", label: "Transportation" },
        { value: "bills", label: "Bills & Utilities" },
        { value: "shopping", label: "Shopping" },
        { value: "other", label: "Other" },
    ];

    const [formData, setFormData] = useState({
        id: '',
        spend: '',
        spent: '',
        category: 'food', // Default category
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDelete = () => {
        if (formData.id) {
            handleDeleteTransaction(formData.id)
        }

    }

    useEffect(() => {
        if (editingTransaction) {
            setFormData({
                id: editingTransaction.id || '',
                spend: editingTransaction.spend || '',
                spent: editingTransaction.spent || '',
                category: editingTransaction.category || 'food'
            });
        } else {
            // Reset form for new transaction
            setFormData({
                id: uniqid(),
                spend: '',
                spent: '',
                category: 'food'
            });
        }
    }, [editingTransaction, isOpen])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (hasSubmitted.current) {
            console.log('Already submitted, skipping...');
            return;
        }

        hasSubmitted.current = true;
        console.log('Starting form submission...');

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error("Please login first");
                navigate('/auth/login');
                return;
            }

            let response;

            if (editingTransaction) {
                response = await api.put(`/expense/transaction/${formData.id}`,
                    {
                        spend: formData.spend,
                        spent: formData.spent,
                        category: formData.category
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } else {
                response = await api.post("/expense/transaction",
                    {
                        id: formData.id,
                        spend: formData.spend,
                        spent: formData.spent,
                        category: formData.category
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }



            console.log('Response:', response.data);

            toast.success(`Transaction ${editingTransaction ? "updated" : "created"} successfully!`);

            // navigate("/dashboard");

            if (onAddTransaction) {
                onAddTransaction(formData);
            }

            onClose();

        } catch (error) {

            console.error('Transaction error:', error);

            if (error.response?.status === 429) {
                toast.error("Slow down buddy", {
                    duration: 4000,
                    icon: "🤨"
                });
            } else if (error.response?.status === 401) {
                // Token is invalid or expired
                toast.error("Session expired. Please login again.");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/auth/login');
            } else {
                toast.error(`Failed to ${editingTransaction ? 'update' : 'create'} transaction`);
            }
        } finally {
            setTimeout(() => {
                hasSubmitted.current = false;
            }, 1000);
        }
    };

    useEffect(() => {
        hasSubmitted.current = false;
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center"
                onClick={onClose}
            >
            </motion.div>

            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 ">
                    <div className="p-3 bg-white rounded-lg shadow-lg max-w-lg w-full h-auto border ">
                        <div className="dialog-title flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editingTransaction ? "Update " : "Add "}Transaction</h2>
                            <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800 cursor-pointer">
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col gap-y-4">
                            <input type="hidden" name="id" value={formData.id} />
                            <div className="mb-1.5">
                                <label htmlFor="spend" className="block text-gray-700 mb-2">Spent On</label>
                                <input type="text"
                                    name="spend"
                                    className="w-full py-1 indent-1.5 border rounded dialog-text"
                                    value={formData.spend}
                                    onChange={handleChange}
                                    required />
                            </div>
                            <div>
                                <label htmlFor="spent" className="block text-gray-700 mb-2">Money Spent</label>
                                <input type="number"
                                    name="spent"
                                    className="w-full py-1 indent-1.5 border rounded dialog-text mb-2"
                                    value={formData.spent}
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div className="flex justify-between items-start">
                                <label htmlFor="" className="dialog-category-text text-gray-700">Category: </label>
                                <select
                                    name="category"
                                    className="p-1 border rounded"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="edit-button w-32 text-white py-2 px-4 rounded bg-slate-700 hover:bg-slate-600 "
                            >
                                {editingTransaction ? "Update" : "Submit"}
                            </button>
                        </form>
                        <div className="mt-2 flex justify-center">
                            {editingTransaction ? <button
                                className="text-white bg-red-600 hover:bg-red-500 p-2 w-32 rounded-md cursor-pointer"
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this transaction?")) {
                                        handleDelete();
                                    }
                                }}>
                                Delete
                            </button> : null}
                        </div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}