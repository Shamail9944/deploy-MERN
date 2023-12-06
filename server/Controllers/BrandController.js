import Brand from '../Models/Brand.js';

export const fetchAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find()
        res.status(200).send(brands);
        console.log("All brands in db.")
    } catch (error) {
        res.status(400).send("Error in fetching all brands.");
        console.log(error);
    }
}

export const AddNewBrand = async (req, res) => {
    try {
        const newBrand = new Brand(req.body)
        const doc = await newBrand.save()
        res.status(200).send(doc);
        console.log("New Brand added.")
    } catch (error) {
        res.status(400).send("Error in saving new Brand.");
        console.log(error);
    }
}