import Product from "../Models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const newProuct = new Product(req.body)
        const doc = await newProuct.save()
        res.status(200).send(doc);
        console.log("New Product added.")
    } catch (error) {
        res.status(400).send("Error in saving new Product.");
        console.log(error);
    }
}

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products);
        console.log("All Products in db.")
    } catch (error) {
        res.status(400).send("Error in fetching all Products.");
        console.log(error);
    }
}

export const fetchProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        res.status(200).send(product);
        console.log("Specific Product found by Id.")
    } catch (error) {
        res.status(400).send("Error in fetching specific Product.");
        console.log(error);
    }
}

export const fetchProductByFilter = async (req, res) => {
    //    Multiple categories not supported
    let query = Product.find({ deleted: { $ne: true } })
    let queryForPaginationOnly = Product.find({ deleted: { $ne: true } })
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

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const update = req.body
    try {
        const product = await Product.findByIdAndUpdate(id, update, { new: true })
        res.status(200).send(product);
        console.log("Product Updated.")
    } catch (error) {
        res.status(400).send("Product Update Failed.");
        console.log(error);
    }
}