import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";


const schema = new mongoose.Schema(
  {
  
    Products: [
      {
      idProduct: {
        index: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        default: [],
        
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      total: {
        type: Number,
        required: true,
        min: 0
      }
    }
    ],
      subtotal: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      }
  },
{
  timestamps: true,
},
 
);

schema.plugin(mongooseDelete, { deletedAt: true });

const CartModel = mongoose.model("Cart", schema);
export default CartModel;