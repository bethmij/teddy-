import { ClientSession } from "mongoose";
import { Wishlist } from "../../database/schemas/mongodbSchemas";
const wishlistRepository = {
  getWishlistByUserId: async (session: ClientSession, userId: any) => {
    return await Wishlist.find({ email: userId }).session(session);
  },

  getFullyDetailedWishlistByUserId: async (session: ClientSession, userId: any) => {
    return await Wishlist.find({ email: userId }) .populate('item').session(session);
  },

  getWishlistByUserIdAndItemId: async (session: ClientSession, userId: any, item:any) => {
    return await Wishlist.findOne({ email: userId, item: item, }).session(session);
  },

  createWishlist: async (session: ClientSession, wishlistData: any) => {
    return await Wishlist.create([{ ...wishlistData, session }]);
  },

  deleteWishlist: async (session: ClientSession, item: any, email:any) => {
    return await Wishlist.findOneAndDelete({ item: item, email:email }).session(session);
  },
};

export default wishlistRepository;
