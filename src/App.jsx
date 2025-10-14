// App.jsx - Better structure
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Body from './Components/Body';
import Expenses from './Components/Expenses.jsx';
import Transactions from './Components/Transactions.jsx';
import './App.css';
import ExpensesHistory from './Components/ExpensesLimit/ExpensesHistory.jsx';
import Register from './Components/auth/Register.jsx';
import LoginForm from './Components/auth/LoginForm.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { MyMoney } from './Components/MyMoney/MyMoney.jsx';


function App() {
  return (
    <Routes>
      <Route path='/auth/register' element={<Register />} />
      <Route path='/auth/login' element={<LoginForm />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Header /><Body />
        </ProtectedRoute>}
      />

      <Route path="/expenses" element={
        <ProtectedRoute>
          <Header /><ExpensesHistory />
        </ProtectedRoute>}
      />

      <Route path="/money" element={
        <ProtectedRoute>
          <Header /><MyMoney />
        </ProtectedRoute>}
      />


      <Route path="/transactions" element={<Transactions />} />


      <Route path='/' element={<LoginForm />} />

    </Routes>
  );
}

export default App;