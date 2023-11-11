import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  imageUri:{
    type:String
  },
  products: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      image: {
        type: String,
      },
    },
  ],
  totalPrice: {
    type: Number,
  },
  shippingAddress: {
    name: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    houseNo: {
      type: String,
    },
    street: {
      type: String,
    },
    landmark: {
      type: String,
    },
    postalCode: {
      type: String,
    },
  },
  deliveryMethod:{
    type:String,
  },
  paymentMethod: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Order",orderSchema);