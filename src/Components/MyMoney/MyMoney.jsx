import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../src/lib/axios.js';
import toast from 'react-hot-toast';
import { formatNumber } from '../../utils/FormatNumber.js';


export const MyMoney = () => {
    const [formData, setFormData] = useState({
        income: '',
        food: '',
        bills: '',
        others: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        fetchMoneySetting();
    }, [])

    const fetchMoneySetting = async () => {
        try {

            const token = localStorage.getItem('token');
            const response = await api.get('/auth/update-money', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                const money = response.data.moneySettings;
                setFormData({
                    income: money.income || '',
                    food: money.expenseLimits.food || '',
                    bills: money.expenseLimits.bills || '',
                    others: money.expenseLimits.others || '',
                })
            }

        } catch (error) {
            console.error('Error fetching money settings:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const token = localStorage.getItem('token');

            const response = await api.put('/auth/update-money', {
                income: Number(formData.income),
                food: Number(formData.food),
                bills: Number(formData.bills),
                others: Number(formData.others),
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success('Money saved successfully!');
                navigate('/dashboard')
            }

        } catch (error) {
            console.error('Error saving money settings:', error);
            toast.error('Failed to save money settings');
        }
    }


    return (
        <div className='min-w-min flex justify-center'>
            <form onSubmit={handleSubmit} className='bg-white mt-5 p-5 py-9 rounded-md'>
                <Link to='/dashboard'>
                    <button className='cursor-pointer bg-slate-700 p-3 w-24 text-white rounded-full'>Go back</button>
                </Link>

                <div className='p-10 border-b border-slate-700'>
                    <h2 className='font-bold text-xl'>My Money</h2>
                    <span className='flex justify-between mt-5'>
                        <label htmlFor="income" className='px-8'>Income: </label>
                        <input
                            type="number"
                            name="income"
                            className='income-input'
                            value={formData.income}
                            onChange={handleChange}
                            required
                        />
                    </span>

                </div>

                <div className='p-10 flex flex-col gap-5'>
                    <h2 className='font-bold text-xl'>Expenses Limit</h2>
                    <span className='flex justify-between'>
                        <label htmlFor="food" className='px-8' >Food Limit: </label>
                        <input
                            type="number"
                            name="food"
                            className='income-input'
                            value={formData.food}
                            onChange={handleChange}
                            required
                        />
                    </span>

                    <span className='flex justify-between'>
                        <label htmlFor="bills" className='px-8'>Bills Limit: </label>
                        <input
                            type="number"
                            name="bills"
                            className='income-input'
                            value={formData.bills}
                            onChange={handleChange}
                            required
                        />
                    </span>

                    <span className='flex justify-between'>
                        <label htmlFor="others" className='px-8' >Others Expenses: </label>
                        <input
                            type="number"
                            name="others"
                            className='income-input'
                            value={formData.others}
                            onChange={handleChange}
                            required
                        />
                    </span>

                </div>

                <div className='flex justify-center p-4'>
                    <button className='w-40 p-2 bg-slate-700 hover:bg-slate-600 cursor-pointer
                    rounded-full text-white'>
                        {loading ? 'Saving...' : 'Done'}
                    </button>
                </div>

            </form>
        </div>
    )
}
