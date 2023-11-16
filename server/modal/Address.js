import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    name: String,
    mobileNo: String,
    houseNo: String,
    landmark: String,
    city: String,
    state: String,
    postalCode: String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model("Address", addressSchema);