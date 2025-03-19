import { ClientSession } from "mongoose";
import { Item } from "../../database/schemas/mongodbSchemas";
const productRepository = {
  getProductByProductId: async (session: ClientSession, itemName: string) => {
    return await Item.findOne({ itemName }).session(session);
  },

  getProductsByProductIdList: async (session: ClientSession, itemNames: any) => {
    return await Item.find({
      itemName: { $in: itemNames }
    }).session(session); 
  },
  getAllProducts: async (session: ClientSession) => {
    return await Item.find({}, null, { session });
  },
  getFeaturedProducts: async (session: ClientSession) => {
    return await Item.find({}, null, { session }).limit(10);
  },
  createProduct: async (session: ClientSession, productData: any) => {
    return await Item.create([{ ...productData, session }]);
  },

  updateProduct: async (session: ClientSession, productData: any) => {
    return await Item.findOneAndUpdate({ itemName: productData.itemName }, productData, {
      new: true,
      session,
    });
  },

  updateStock: async (session: ClientSession, products:any) => {
    for (let product of products) {
      await Item.findByIdAndUpdate(product.itemId, {
        $inc: { qty: -product.quantity }
      }, { session });
    }

  },

  deleteProduct: async (session: ClientSession, itemName: string) => {
    return await Item.findOneAndDelete({ itemName: itemName }).session(session);
  },
  
};

export default productRepository;
