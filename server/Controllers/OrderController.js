import Order from "../Models/Order.js";

export const OrderByUserId = async (req, res) => {
    const { userId } = req.query
    console.log(userId)
    try {
        const userOrders = await Order.find({ user: userId })
        res.status(200).send(userOrders);
        console.log("Orders loaded by UserId.")
    } catch (error) {
        res.status(400).send("Error in fetching Cart Items by UserId.");
        console.log(error);
    }
}

export const createOrder = async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const doc = await newOrder.save()
        res.status(200).send(doc);
        console.log("New Order added.")
    } catch (error) {
        res.status(400).send("Error in adding New Order.");
        console.log(error);
    }
}

export const updateOrder = async (req, res) => {
    const { id } = req.params
    const update = req.body
    try {
        const order = await Order.findByIdAndUpdate(id, update, { new: true })
        res.status(200).send(order);
        console.log("Order Updated successfully.")
    } catch (error) {
        res.status(400).send("Error in Updating Order.");
        console.log(error);
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        const doc = await Order.findByIdAndDelete(id)
        res.status(200).send({ message: "Order Delete Successful." })
        console.log("Order deleted successfully.")
    } catch (error) {
        res.status(400).send(error)
        console.log("Error in deleting Order.");
    }
}

// export const fetchAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find()
//         res.status(200).send(products);
//         console.log("All Products in db.")
//     } catch (error) {
//         res.status(400).send("Error in fetching all Products.");
//         console.log(error);
//     }
// }