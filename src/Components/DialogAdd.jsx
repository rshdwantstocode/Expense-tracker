import { useState, useEffect } from "react";
import uniqid from 'uniqid';
export default function Dialog({ isOpen, onClose, onAddTransaction, editingTransaction, handleDeleteTransaction }) {
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


    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTransaction(formData); // Send data to parent
        onClose();

        setFormData({
            id: uniqid(),
            spend: '',
            spent: '',
            category: 'food',
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm w-full h-full"></div>

            <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 ">
                <div className="dialog-box bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-100">
                    <div className="dialog-title flex justify-between items-center">
                        <h2 className="text-xl font-bold">Add</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 cursor-pointer">
                            ✕
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col gap-y-4">
                        <input type="hidden" name="id" value={formData.id} />
                        <div className="mb-4">
                            <label htmlFor="" className="block text-gray-700 mb-2">Pinaggastuhan</label>
                            <input type="text"
                                name="spend"
                                className="w-full p-2 border rounded dialog-text"
                                value={formData.spend}
                                onChange={handleChange}
                                required />
                        </div>
                        <div>
                            <label htmlFor="" className="block text-gray-700 mb-2">Money Spent</label>
                            <input type="number"
                                name="spent"
                                className="w-full p-2 border rounded dialog-text"
                                value={formData.spent}
                                onChange={handleChange}
                                required />
                        </div>

                        <div className="flex justify-between items-start">
                            <label htmlFor="" className="dialog-category-text text-gray-700">Category: </label>
                            <select
                                name="category"
                                className="p-2 border rounded"
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
                            className="edit-button w-30 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                        {editingTransaction ? <button className="delete-button" onClick={handleDelete}>Delete</button> : null}
                    </form>
                </div>
            </div>

        </>
    );
}