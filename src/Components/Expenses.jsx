import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Expenses({ limit, totalFood, totalBills, totalOther }) {

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

                <div className='income'>
                    <span className='income-header'>
                        <h2>My Money</h2>
                    </span>
                    <span className='income-body'>
                        <p>Income(Month): 13000 </p>
                        <h4>Expenses Limit</h4>
                        <p>Food: {limit.foods} </p>
                        <p>Bills: {limit.bills} </p>
                        <p>Others: {limit.bills} </p>
                    </span>

                </div>
                <div className='chart'>
                    <MyChart />
                </div>
            </div>

        </section>
    </>
}