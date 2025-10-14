import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../lib/axios.js';


const Register = () => {

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) {
            setError('');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address (e.g., user@example.com)');
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post("/auth/register", {
                email: formData.email,
                username: formData.username,
                password: formData.password
            });

            console.log('Registration response:', response);

            if (response.status >= 200 && response.status < 300) {
                // Registration successful
                toast.success('Registration successful! Please login.');
                navigate('/auth/login');
            } else {
                toast.error("Registration failed")
                setError(response.data?.message || 'Registration failed');
            }

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data?.message ||
                    `Server error: ${error.response.status}`;
                setError(errorMessage);
            } else if (error.request) {
                setError('Network error. Please check if the server is running.');
            } else {
                setError('An error occurred. Please try again.');
            }

            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-slate-200">
            <div className=' p-5 shadow-lg rounded-lg'>
                <h2 className='font-bold text-3xl text-center'>Register</h2>
                <form className='p-5 px-10 w-96 bg-base-300 flex flex-col gap-3' onSubmit={handleSubmit}>

                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className='py-[20px] h-5 rounded-xl indent-3 bg-slate-300 text-slate-800'
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    // disabled={loading}
                    />

                    <label className='' htmlFor="">Username:</label>
                    <input type="text"
                        name="username"
                        className='p-2 rounded-xl indent-2  bg-slate-300 text-slate-800'
                        placeholder='Enter your username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="">Password:</label>
                    <input
                        name="password"
                        type="password"
                        className='p-2 rounded-xl indent-2 bg-slate-300 text-slate-800'
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="">Confirm Password:</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        className='p-2 rounded-xl indent-2 bg-slate-300 text-slate-800'
                        placeholder='Confirm your password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required />

                    <button className='mt-5 p-2 rounded-xl text-slate-50 bg-slate-700 hover:bg-slate-600 cursor-pointer'
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                    <Link to="/auth/login" className='mt-2 mx-2 text-center rounded-full hover:underline'>
                        <p>Already have an Account? Log In</p>
                    </Link>
                </form>
            </div>


        </div>

    )
}

export default Register