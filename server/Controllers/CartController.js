import Cart from "../Models/Cart.js";

export const addToCart = async (req, res) => {
    const cartItem = new Cart(req.body)
    try {
        const doc = await cartItem.save()
        const result = await doc.populate('product')
        res.status(200).send(result);
        console.log("New Item added in Cart.")
    } catch (error) {
        res.status(400).send("Error in adding item in Cart.");
        console.log(error);
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

export const cartProductByUserId = async (req, res) => {
    const { user } = req.query
    try {
        const cartItems = await Cart.find({ user }).populate('user').populate('product')
        res.status(200).send(cartItems);
        console.log("Cart Items loaded by UserId.")
    } catch (error) {
        res.status(400).send("Error in fetching Cart Items by UserId.");
        console.log(error);
    }
}

export const fetchProductByFilter = async (req, res) => {
    //    Multiple categories not supported
    let query = Product.find()
    let queryForPaginationOnly = Product.find()
    if (req.query.category) {
        query = query.find({ category: req.query.category })
        queryForPaginationOnly = queryForPaginationOnly.find({ category: req.query.category })
    }
    if (req.query.brand) {
        query = query.find({ brand: req.query.brand })
        queryForPaginationOnly = queryForPaginationOnly.find({ brand: req.query.brand })
    }
    const noOfTotalDocs = await queryForPaginationOnly.count()
    console.log(noOfTotalDocs)
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })
    }
    if (req.query._page && req.query._limit) {
        const page = req.query._page
        const pageSize = req.query._limit
        query = query.skip(pageSize * (page - 1)).limit(pageSize)
    }
    try {
        const docs = await query.exec()
        res.set('Total-Results', noOfTotalDocs)
        res.status(200).send(docs);
        console.log("Products with specific filters found.")
    } catch (error) {
        res.status(400).send("Error in fetching Products with specific filters.");
        console.log(error);
    }
}

export const updateCart = async (req, res) => {
    const { id } = req.params
    const update = req.body
    try {
        const cart = await Cart.findByIdAndUpdate(id, update, { new: true })
        const result = await cart.populate('product')
        res.status(200).send(result);
        console.log("Cart Updated successfully.")
    } catch (error) {
        res.status(400).send("Error in Updating Cart.");
        console.log(error);
    }
}

export const deleteCartItem = async (req, res) => {
    const { id } = req.params
    try {
        const doc = await Cart.findByIdAndDelete(id)
        res.status(200).send({message:"Successful"})
        console.log("Cart Items deleted successfully.")
    } catch (error) {
        res.status(400).send(error)
        console.log("Error in deleting Cart Items.");
    }
}

// clearCart