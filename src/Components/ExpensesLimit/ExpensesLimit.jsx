import { useState } from "react"
import './styles.css'
import { useNavigate } from "react-router-dom";



export default function ExpensesLimit({ addExpenseLimit }) {

    const navigate = useNavigate();
    const [expenseLimits, setExpenseLimits] = useState({
        foods: '0',
        bills: '0',
        others: '0',
    });

    const handleSetSubmit = (e) => {
        e.preventDefault();
        const processedLimit = {
            foods: Number(expenseLimits.foods),
            bills: Number(expenseLimits.bills),
            others: Number(expenseLimits.others),
        }
        addExpenseLimit(processedLimit)
        console.log(processedLimit);

        navigate("/")
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseLimits(prev => ({ ...prev, [name]: value }));
    };

    return (<section className='expense-section'>
        <h2>Set Daily Expense Limit</h2>
        <div className='expense-container'>
            <form onSubmit={handleSetSubmit} className='expense-form'>
                <label htmlFor="">Foods(PHP):</label>
                <input type="number"
                    name='foods'
                    value={expenseLimits.foods}
                    onChange={handleChange}
                />
                <label htmlFor="">Bills(PHP):</label>
                <input type="number"
                    name='bills'
                    value={expenseLimits.bills}
                    onChange={handleChange}
                />
                <label htmlFor="">Others(PHP):</label>
                <input type="number"
                    name='others'
                    value={expenseLimits.others}
                    onChange={handleChange}
                />

                <span className='button-container'>
                    <button type="submit">Submit</button>
                </span>

            </form>
        </div>

    </section>)
}