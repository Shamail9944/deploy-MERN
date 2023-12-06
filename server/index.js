import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRoute from './Routes/AuthRoute.js'
import BrandRoute from './Routes/BrandRoute.js'
import CartRoute from './Routes/CartRoute.js'
import CategoryRoute from './Routes/CategoryRoute.js'
import OrderRoute from './Routes/OrderRoute.js'
import ProductRoute from './Routes/ProductRoute.js'
import UserRoute from './Routes/UserRoute.js'
import session from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'


const server = express()
server.use(express.json());
server.use(cors(
    {
        origin: "https://deploy-mern-frontend-sable.vercel.app",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        exposedHeaders: ["Total-Results"]
    }
))

const port = 8080

server.listen(port, () => { console.log(`Server listening on port ${port}`) })
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://shamail130silverhawk:Sam9089944@ecom.sxizew6.mongodb.net/Ecom');
    console.log("DB Connected.")
}

server.get("/", (req, res) => {
    res.json("Backend Activated.")
})
server.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

server.use(passport.authenticate('session'));

server.use("/auth", AuthRoute);
server.use("/brands", BrandRoute);
server.use("/cart", CartRoute);
server.use("/category", CategoryRoute);
server.use("/order", OrderRoute);
server.use("/product", ProductRoute);
server.use("/user", UserRoute);

passport.use(new LocalStrategy(
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));
