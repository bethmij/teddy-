import { ClientSession } from "mongoose";
import { Order, OrderDetail } from "../../database/schemas/mongodbSchemas";

const orderRepository = {
  getAllOrders: async (session: ClientSession) => {
    return await Order.find({}, null, { session }).populate("orderDetails");
  },
  getOrderstByEmail: async (session: ClientSession, userId: any) => {
    return await Order.find({ userId }).session(session).populate({
      path: "orderDetails",
      populate: {
        path: "itemId",
        model: "Item",
        select: "itemName price image",
      },
    });
  },
  createOrder: async (user: any, orderData: any) => {
    return new Order({
      userId: user._id,
      email: user.email,
      status: orderData.status,
      amount: orderData.amount,
      cardNum: orderData.cardNum,
      addresses: orderData.addresses,
      date: new Date(),
    });
  },
  createOrderDetails: async (savedOrder: any, item: any) => {
    return new OrderDetail({
      orderId: savedOrder._id,
      itemId: item.itemId,
      itemName: item.itemName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.total,
    });
  },
};

export default orderRepository;
