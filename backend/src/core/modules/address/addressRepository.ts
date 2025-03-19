import { ClientSession } from "mongoose";
import { Address } from "../../database/schemas/mongodbSchemas";
const addressRepository = {

  getAddressById: async (session: ClientSession, AddressId: string) => {
    return await Address.findOne({ _id: AddressId }).session(session);
  },

  getAllAddressByUserId: async (session: ClientSession, userId: string) => {
    return await Address.find({ userId: userId }).session(session);
  },

  createAddress: async (session: ClientSession, data: any) => {
    return await Address.create([{ ...data, session }]);
  },

  updateAddress: async (session: ClientSession, data: any) => {
    return await Address.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
      session,
    });
  },
};

export default addressRepository;
