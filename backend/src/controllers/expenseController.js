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