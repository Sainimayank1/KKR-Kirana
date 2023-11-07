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
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
  },
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    houseNo: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  deliveryMethod:{
    type:String,
    required:true
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