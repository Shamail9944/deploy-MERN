import Category from './../Models/Category.js';

export const fetchAllCategory = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).send(categories);
        console.log("All Category in db.")
    } catch (error) {
        res.status(400).send("Error in fetching all Category.");
        console.log(error);
    }
}

export const AddNewCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body)
        const doc = await newCategory.save()
        res.status(200).send(doc);
        console.log("New Category added.")
    } catch (error) {
        res.status(400).send("Error in saving new Category.");
        console.log(error);
    }
}