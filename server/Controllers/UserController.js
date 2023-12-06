import User from "../Models/User.js";

// createUser
export const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body)
        const doc = await newUser.save()
        res.status(200).send(doc);
        console.log("New User added.")
    } catch (error) {
        res.status(400).send("Error in saving new User.");
        console.log(error);
    }
}
// fetchLoggedInUser
export const fetchUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(200).send(user);
        console.log("Logged in user found by Id.")
    } catch (error) {
        res.status(400).send("Error in fetching Logged in user.");
        console.log(error);
    }
}
// updateUser
export const updateUser = async (req, res) => {
    const { id } = req.params
    const update = req.body
    try {
        const user = await User.findByIdAndUpdate(id, update, { new: true })
        res.status(200).send(user);
        console.log("User Updated.")
    } catch (error) {
        res.status(400).send("User Update Failed.");
        console.log(error);
    }
}
