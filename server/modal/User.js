import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone:{
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      verificationToken: String,
      orders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

export default mongoose.model("User",userSchema);