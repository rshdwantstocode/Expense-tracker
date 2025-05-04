export default function Body() {
    return <>
        <main>
            <section className="dashboard-section radius-and-color">
                <div className="route-container">
                    <a href="">Dashboard</a>
                    <a href="">Bill and Payments</a>
                    <a href="">Expenses</a>
                    <a href="">Settings</a>
                    <a href="https://chatgpt.com/" target="blank">Get Help</a>
                </div>
            </section>

            <section className="expenses-section">
                <div className="expenses-categories">
                    <span className="food-category">Food</span>
                    <span className="bills-category">Bills</span>
                    <span className="other-category">Others</span>
                </div>
                <div className="expenses-chart">
                    charts
                </div>
            </section>

            <section className="transaction-section radius-and-color">
                <div className="transaction-container">
                    <h3 className="transaction-title">Transaction history</h3>
                    <span className="transaction-history">
                        <span>Transaction</span>
                        <span>Transaction</span>
                        <span>Transaction</span>
                        <span>Transaction</span>
                    </span>
                </div>

                <div className="transaction-footer">
                    <span>
                        <p>icon</p>
                        <h4>Missing Transaction?</h4>
                    </span>

                    <button>ADD</button>
                </div>
            </section>
        </main>
    </>
}