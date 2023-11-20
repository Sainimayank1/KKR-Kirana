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
import Order from "./modal/Order.js"
import Category from "./modal/Category.js"

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
    const { name, email, password , phone} = req.body;
    try {
        const isUser = await User.findOne({ email });
        if (isUser)
            res.status(500).json({ msg: "User already exist" });
        else {
            const user = User({ name, email, password ,phone});
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
    try {
        const isSave = await Address.create(data);
        if (isSave)
            return res.status(200).json({ msg: "Add address successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})


// Address Fetcher
app.post("/addressFetcher", async (req, res) => {
    const data = req.body;
    try {
        const isFind = await Address.find({userId:data.userId});
        if (isFind)
            return res.status(200).json({ msg: "fetch address successfully" , data:isFind})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

// Order by Image
app.post("/orderByImage", async (req, res) => {
    const data = req.body;
    try {
        const isCreate = await Order.create(data);
        if (isCreate)
            return res.status(200).json({ msg: "Order Created successfully" , data:isCreate})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

// Fetching all orders
app.get("/getAllOrder", async (req, res) => {
    try {
        const isFind = await Order.find();
        if (isFind)
            return res.status(200).json({ msg: "All Order" , data:isFind})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})


// Adding items in category section
app.post("/addCategoryItems", async (req, res) => {
    const data = req.body;
    try {
        const isCreate = await Category.create(data);
        if (isCreate)
            return res.status(200).json({ msg: "Item Added successfully" , data:isCreate})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})


//  Fetching all the category data 
app.get("/fetchAllCategory", async (req, res) => {
    try {
        const isFind = await Category.find();
        if (isFind)
            return res.status(200).json({ msg: "All Items" , data:isFind})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

// Delete category item using id
app.post("/deleteCategoryItem", async (req, res) => {
    const data = req.body;
    try {
        const isDelete = await Category.deleteOne(data);
        if (isDelete)
            return res.status(200).json({ msg: "Item Delete successfully" , data:isDelete})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

// Add in product
app.post("/addProduct", async (req, res) => {
    const data = req.body;
    try {
        const isCreate = await Product.create(data);
        if (isCreate)
            return res.status(200).json({ msg: "Product Added successfully" , data:isCreate})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

// Fetch All Prodcts
app.get("/fetchAllProducts", async (req, res) => {
    try {
        const isFind = await Product.find();
        if (isFind)
            return res.status(200).json({ msg: "All Items" , data:isFind})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

// Delete Product  using id
app.post("/deleteProduct", async (req, res) => {
    const data = req.body;
    try {
        const isDelete = await Product.deleteOne(data);
        if (isDelete)
            return res.status(200).json({ msg: "Item Delete successfully" , data:isDelete})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

// Update order status
app.post("/orderUpdateById", async (req, res) => {
    const data = req.body;
    try {
        const isUpdate = await Order.findOneAndUpdate({_id:data._id},{orderStatus:data.status});
        if (isUpdate)
            return res.status(200).json({ msg: "order Update successfully" , data:isUpdate})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

// Delete Order  using id
app.post("/deleteOrder", async (req, res) => {
    const data = req.body;
    try {
        const isDelete = await Order.deleteOne(data);
        if (isDelete)
            return res.status(200).json({ msg: "Order Delete successfully" , data:isDelete})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})


// Fetch Products according to Category
app.post("/fetchProductByCategory", async (req, res) => {
    const {category} = req.body;
    try {
        const isFind = await Product.find({category}).limit(6);
        if (isFind)
            return res.status(200).json({ msg: "6 Products" , data:isFind})
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})
app.listen(8000, () => {
    console.log("Server Listning on Port:8000")
})