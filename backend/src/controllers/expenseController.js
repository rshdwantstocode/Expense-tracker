import Transaction from "../models/AddExpense.js"
import User from "../models/User.js";

export async function getHomePage(req, res) {
    try {
        res.status(200)
    } catch (error) {
        console.log("Error in getHomePage Controller", error);
        res.status(500).send({ message: "Internal Server Error" })
    }
}

export async function expensesPage(req, res) {
    try {
        res.status(200)
    } catch (error) {
        console.log("Error in expensesPage Controller", error);
        res.status(500).send({ message: "Internal Server Error" })
    }
}

// export async function createTransaction(req, res) {
//     try {
//         const { id, spend, spent, category } = req.body;
//         const userId = req.user.id; // From authentication middleware

//         const newTransaction = new Transaction({
//             id,
//             userId,
//             spend,
//             spent: Number(spent),
//             category
//         });
//         console.log(newTransaction);
//         // await newTransaction.save();


//         res.status(201).json({
//             message: 'Transaction added successfully',
//             transaction: newTransaction
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error creating transaction',
//             error: error.message
//         });
//     }
// };

export async function createTransaction(req, res) {
    try {
        console.log('User object:', req.user);

        const { id, spend, spent, category } = req.body;

        const userId = req.user.userId;
        console.log('Using userId:', userId);

        if (!userId) {
            return res.status(400).json({
                message: 'User ID not found in token'
            });
        }

        const newTransaction = new Transaction({
            id,
            userId,
            spend,
            spent: Number(spent),
            category
        });

        console.log(newTransaction);

        await newTransaction.save();

        res.status(201).json({
            message: 'Transaction added successfully',
            transaction: newTransaction
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: 'Error creating transaction',
            error: error.message
        });
    }
};

export async function getAuthenticatedTransaction(req, res) {
    try {
        const userId = req.user.userId;

        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

        res.json({ success: true, transactions }); // need si success diri kay sa frontend naay confirmation if successfull ba bago i fetch ang data
    } catch (error) {
        console.log("Error in authenticatedTransaction Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function editTransaction(req, res) {
    try {
        const { id } = req.params; // ID from URL
        const { spend, spent, category } = req.body; // Don't expect ID in body
        const userId = req.user.userId;

        console.log('Updating transaction:', id);
        console.log('Update data:', { spend, spent, category });

        const updatedTransaction = await Transaction.findOneAndUpdate(
            { id: id, userId: userId }, // Find by ID and user
            {
                spend: spend,
                spent: Number(spent),
                category: category
            },
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        res.json({
            success: true,
            message: 'Transaction updated successfully',
            transaction: updatedTransaction
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating transaction',
            error: error.message
        });
    }
};

export async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const deletedTransaction = await Transaction.findOneAndDelete({
            id: id,
            userId: userId
        });

        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting transaction',
            error: error.message
        });
    }
};