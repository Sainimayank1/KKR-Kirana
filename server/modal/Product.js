import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true,
  },
  name:{
    type:String,
    required:true
  },
  keyFeature:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  originalPrice:{
    type:String,
    required:true,
  },
  images:[{uri:{type:String}}],
  totalratings:{
    type:String,
    default:0
  },
  rating:{
    type:String,
    default:0
  },
  delivery:{
    type:String,
    default:"Free"
  },
  assured:{
    type:Boolean,
    default:true
  },
  highLight:[{type:String}],
  category:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);