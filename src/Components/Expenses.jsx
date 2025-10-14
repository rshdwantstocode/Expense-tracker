import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { api } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatNumber } from '../utils/FormatNumber';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Expenses({ totalFood, totalBills, totalOther }) {

    const [loading, setLoading] = useState(true);
    const [expenseLimit, setExpenseLimit] = useState({
        income: '0',
        food: '0',
        bills: '0',
        others: '0',
    });
    // const [income, SetIncome] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        fetchMoneySetting();
    }, []);


    const fetchMoneySetting = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/auth/login');
                return;
            }

            const response = await api.get("/auth/update-money", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                const money = response.data.moneySettings;
                setExpenseLimit({
                    income: money.income || '',
                    food: money.expenseLimits.food || '',
                    bills: money.expenseLimits.bills || '',
                    others: money.expenseLimits.others || '',
                })
            }
        } catch (error) {
            console.error('Error fetching money:', error);

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

    useEffect(() => {
        if (totalFood !== undefined && totalBills !== undefined && totalOther !== undefined) {
            setLoading(false);
        }
    }, [totalFood, totalBills, totalOther])

    // debug this shit

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

    if (loading) {
        return (
            <section className="expenses-section">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    color: '#666'
                }}>
                    <p>Loading expenses data...</p>
                </div>
            </section>
        );
    }

    return <>
        <section className="expenses-section">
            <div className="expenses-categories">
                <span className="food-category">
                    Food
                    <span className='food-total'>
                        <h2>{formatNumber(totalFood)}</h2>
                    </span>
                </span>

                <span className="bills-category">
                    Bills
                    <span className='bills-total'>
                        <h2>{formatNumber(totalBills)}</h2>
                    </span>
                </span>

                <span className="other-category">
                    Others
                    <span className='other-total'>
                        <h2>{formatNumber(totalOther)}</h2>
                    </span>
                </span>
            </div>

            <div className="expenses-chart">

                <div className='income'>
                    <span className='income-header'>
                        <h2>My Money</h2>
                    </span>
                    <span className='income-body'>
                        <p>Income(Month): {formatNumber(expenseLimit.income)} </p>
                        <h4>Expenses Limit</h4>
                        <p>Food: {formatNumber(expenseLimit.food)} </p>
                        <p>Bills: {formatNumber(expenseLimit.bills)} </p>
                        <p>Others: {formatNumber(expenseLimit.others)} </p>
                    </span>

                </div>
                <div className='chart'>
                    <MyChart />
                </div>
            </div>

        </section>
    </>
}