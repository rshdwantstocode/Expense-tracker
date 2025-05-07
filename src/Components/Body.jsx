import {
    LayoutDashboard,
    CreditCard,
    BanknoteArrowDown,
    CircleHelp,
    Settings,
    Wallet,
    History,
    Plus
} from 'lucide-react';

export default function Body() {
    return <>
        <main>
            <section className="dashboard-section radius-and-color">
                <div className="route-container">
                    <a href=""><LayoutDashboard />  Dashboard</a>
                    <a href=""><CreditCard />Bill and Payments</a>
                    <a href=""><BanknoteArrowDown />Expenses</a>
                    <a href=""><Settings />Settings</a>
                    <a href="https://chatgpt.com/" target="blank"><CircleHelp />Get Help</a>
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
                    <h3 className="transaction-title"><History />Transaction history</h3>
                    <span className="transaction-history">
                        <span>Transaction</span>
                        <span>Transaction</span>
                        <span>Transaction</span>
                        <span>Transaction</span>
                    </span>
                </div>

                <div className="transaction-footer">
                    <span>
                        <Wallet />
                        <h4>Missing Transaction?</h4>
                    </span>

                    <button><Plus /></button>
                </div>
            </section>
        </main>
    </>
}