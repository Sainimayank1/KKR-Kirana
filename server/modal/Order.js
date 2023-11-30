import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  imageUri: {
    type: String
  },
  products: [
    {
      _id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      category:{
        type:String
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      uri: {
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
    city: {
      type: String
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    state:{
      type:String
    }
  },
  deliveryMethod: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  orderStatus:{
    type:String,
    default:"Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Order", orderSchema);