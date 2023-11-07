import bodyParser from "body-parser"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDatabase from "./utlis/DB.js"
import User from "./modal/User.js"
import crypto from "node:crypto"
import sendEmailVerification from "./utlis/sendEmailVerification.js"
import jwt from "jsonwebtoken"
import Product from "./modal/Product.js"
import Address from "./modal/Address.js"

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
connectDatabase();

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUser = await User.findOne({ email });
        if (!isUser)
            res.status(500).json({ msg: "User can't find" });
        else {
            if (isUser.password !== password)
                res.status(400).json({ msg: "Password does't match" })

            if (!isUser.verified)
                res.status(400).json({ msg: "User does't verified" })

            const token = jwt.sign({ userId: isUser }, "heymynameismayank!");
            res.status(200).json({ msg: "User succesfully login", token });
        }

    } catch (error) {

    }
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const isUser = await User.findOne({ email });
        if (isUser)
            res.status(500).json({ msg: "User already exist" });
        else {
            const user = User({ name, email, password });
            user.verificationToken = crypto.randomBytes(20).toString("hex");
            await user.save();
            sendEmailVerification(email, user.verificationToken);
            return res.status(200).json({ msg: "User create successfully" })
        }

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })
    }

})


app.get("/verify/:token", async (req, res) => {
    const params = req.params.token;
    console.log(params)
    try {
        const isUser = await User.findOne({ verificationToken: params });
        if (isUser) {
            await User.findOneAndUpdate({ verificationToken: params }, { verificationToken: -1, verified: true })
            res.status(200).json({ msg: "Verfied Succesfully" })
        }
        else {
            res.status(400).json({ msg: "Link is invalid" })
        }

    } catch (error) {
        res.status(400).json({ msg: "Something happning wrong", error })
    }
})

app.post("/products/addProduct", async (req, res) => {
    const data = req.body; s
    try {
        const isSave = await Product.create(data);
        if (isSave)
            return res.status(200).json({ msg: "Add product successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

// Buy Product
app.post("/buyProduct", async (req, res) => {
    const data = req.body;
    try {
        const isSave = await Product.create(data);
        if (isSave)
            return res.status(200).json({ msg: "Add product successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})


// Add Address
app.post("/addAddress", async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        const isSave = await Address.create(data);
        if (isSave)
            return res.status(200).json({ msg: "Add address successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})


app.listen(8000, () => {
    console.log("Server Listning on Port:8000")
})