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

            <section className="expenses-section radius-and-color">
                <p>Hello</p>
                <div className="expenses-chart"></div>
            </section>

            <section className="transaction-section radius-and-color">
                <p>Transaction</p>
                <div className="transaction-container"></div>
            </section>
        </main>
    </>
}