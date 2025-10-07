import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../lib/axios'
import toast from 'react-hot-toast'


const LoginForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                username: formData.username,
                password: formData.password
            });

            console.log('Login response:', response);
            console.log(response.data);


            if (response.status >= 200 && response.status < 300) {
                // Login successful
                // const { token, user } = response.data;

                // // Store token in localStorage or context
                // localStorage.setItem('token', token);
                // localStorage.setItem('user', JSON.stringify(user));

                // Redirect to notes page
                toast.success('Login successful!')
                navigate("/dashboard");
            } else {
                setError(response.data?.message || 'Login failed');
            }
        } catch (error) {
            toast.error("Invalid username or password")
            console.error('Login error:', error);

            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message ||
                    `Server error: ${error.response.status}`;
                setError(errorMessage);
            } else if (error.request) {
                setError('Network error. Please check if the server is running.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="grid md:grid-cols-2 h-screen bg-slate-200">
            <div className='flex justify-center items-center'>
                <h1 className='sm:text-8xl font-bold w-min'><span className='text-slate-500 hover:text-slate-600'>Track</span> Your Expenses.</h1>
            </div>
            {/* Log In */}
            <div className='flex justify-center items-center flex-col p-5 max-h-screen'>
                <h2 className='font-bold text-2xl text-center text-slate-700'>Log In</h2>
                <form className='p-10 w-96 bg-base-300 flex flex-col gap-5 shadow-lg rounded-xl' onSubmit={handleSubmit}>
                    <span>
                        <label className='' htmlFor="">Username:</label>
                        <input type="text"
                            name="username"
                            className='p-2 rounded-xl indent-2  bg-slate-300 text-slate-800 min-w-full'
                            placeholder='Enter your username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </span>

                    <span>
                        <label htmlFor="">Password:</label>
                        <input
                            name="password"
                            type="password"
                            className='p-2 rounded-xl indent-2 bg-slate-300 text-slate-800 min-w-full'
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </span>

                    <button className='mt-2 p-2 rounded-xl text-slate-50 bg-slate-700 hover:bg-slate-600 cursor-pointer'
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <Link to="/auth/register" className='mt-2 mx-2 text-center rounded-full hover:underline hover:text-slate-500'>
                        <p>Don't have an Account? <span className='text-slate-500'>Register here</span></p>
                    </Link>
                </form>
            </div>


        </div>
    )
}

export default LoginForm