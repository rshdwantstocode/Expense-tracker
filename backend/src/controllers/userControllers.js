import toast from "react-hot-toast";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function authenticateUser(req, res) {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists by username OR email
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            }

        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with email
        const newUser = new User({
            username,
            email, // Add email
            password: hashedPassword
        });
        // console.log(newUser);

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
}

export async function loginAuthenticatedUser(req, res) {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data (without password) and token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
}

export async function updateMoney(req, res) {
    try {
        const userId = req.user.userId;

        console.log(userId)

        const { income, food, bills, others } = req.body

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                'moneySettings.income': Number(income) || 0,
                'moneySettings.expenseLimits.food': Number(food) || 0,
                'moneySettings.expenseLimits.bills': Number(bills) || 0,
                'moneySettings.expenseLimits.others': Number(others) || 0
            },
            { new: true, runValidators: true }
        ).select('-password')

        res.json({
            success: true,
            message: 'Money updated successfully',
            moneySettings: updatedUser.moneySettings
        })

    } catch (error) {
        console.log('Error updating money', error);
        res.status(500).json({
            success: false,
            message: 'Error updating money',
            error: error.message
        })
    }
};

export async function getMoneySettings(req, res) {
    try {
        const userId = req.user.userId

        const user = await User.findById(userId).select('moneySettings');

        res.json({
            success: true,
            moneySettings: user.moneySettings
        });

    } catch (error) {
        console.log('Error fetching money controller: ', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching money controller',
            error: error.message
        })
    }
}

