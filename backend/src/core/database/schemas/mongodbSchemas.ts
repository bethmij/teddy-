import mongoose, { Schema, Document, Types } from 'mongoose';


// interface IAddress extends Document {
//   email: Types.ObjectId; 
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   isDefault: boolean;

// }

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string; 
  contact: string; 
  addresses: Types.ObjectId[];
  wishlist: Types.ObjectId[];
  role: string;
  createdAt: Date;

}

interface IItem extends Document {
  itemName: string; 
  description: string;
  price: number;
  offerPrice: number; 
  image: string[]; 
  category: string;
  qty: number; 
  colour: string; 
  shippingFee: number; 
  tax: number; 
  
}

interface IOrderDetail extends Document {
  _id: Types.ObjectId;
  itemId: Types.ObjectId;
  itemName: string;
  item: string;
  quantity: number;
  unitPrice: number;
  total: number;
  
}

interface IOrder extends Document {
  userId: Types.ObjectId; 
  email: string;
  status: string;
  amount: number;
  cardNum: string; 
  orderDetails: Types.ObjectId[];
  addresses: string;
  date: Date; 
}

interface IWishlist extends Document {
  email: Types.ObjectId; 
  item: Types.ObjectId;
}

// const AddressSchema: Schema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   street: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   zipCode: { type: String, required: true },
//   country: { type: String, required: true },
//   isDefault: { type: Boolean, default: false }
// });

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  contact: { type: String },
  // addresses: [{ type: Schema.Types.ObjectId, ref: 'Address', default: [] }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Item', default: [] }],
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  createdAt: { type: Date, default: Date.now }
});

const ItemSchema: Schema = new Schema({
  itemName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  offerPrice: { type: Number, required: true, default: 0 },
  image: { type: String },
  category: { type: String, enum: ['Dolls', 'Puzzels', 'Playset', 'Education', 'Other'], default: 'Other' },
  qty: { type: Number, required: true, default: 0 },
  colour: { type: String, enum: ['RED', 'GREEN', 'YELLOW', 'BLUE', 'BLACK', 'WHITE', 'MULTICOLOUR'], default: 'MULTICOLOUR' },
  shippingFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
});

const OrderDetailSchema: Schema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true},
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true},
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true }
});

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true},
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'shipped'
  },
  amount: { type: Number, required: true },
  cardNum: { type: String, required: true },
  orderDetails: [{ type: Schema.Types.ObjectId, ref: 'OrderDetail' }],
  addresses: { type: String, required: true },
  // addresses: { type: Schema.Types.ObjectId, ref: 'Address' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const WishlistSchema: Schema = new Schema({
  email: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  item: { type: Schema.Types.ObjectId, ref: 'Item', required: true}
});

// export const Address = mongoose.model<IAddress>('Address', AddressSchema);
export const User = mongoose.model<IUser>('User', UserSchema);
export const Item = mongoose.model<IItem>('Item', ItemSchema);
export const OrderDetail = mongoose.model<IOrderDetail>('OrderDetail', OrderDetailSchema);
export const Order = mongoose.model<IOrder>('Order', OrderSchema);
export const Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);