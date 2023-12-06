import User from "../Models/User.js";

export const loginUser = async (req, res) => {
    try {
        const email = req.body.email
        console.log(email)
        const password = req.body.password
        console.log(password)
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            res.status(400).send("Invalid Username.");
        } else if (user.password === password) {
            res.status(200).send({ id: user.id, name: user.name, email: user.email, addresses: user.addresses });
        } else {
            res.status(401).send("Wrong Password.");
        }
    } catch (error) {
        res.status(400).send("Please re-enter Credientials.");

        console.log(error);
    }
}
// signout
