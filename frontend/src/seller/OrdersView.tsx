import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import api from "../api/api";
import showToast from "../alert/alert";
import { useNavigate } from "react-router-dom";

const OrdersView = () => {

  const [orders, setOrders] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState(true) 
  const { getUser, getRole} = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
      const user = getUser();
      const role = getRole();


  if (!user || !role) {
    navigate("/auth");
    return;
  }

  if (role === "USER") {
    navigate("/account");
    return;
  }

  }, [getUser]);

    useEffect(() => {
      getAllOrders();
    }, [])

  const getAllOrders = async ()=> {
    setTableLoading(true);
      try {
        const response = await api.get(`/order`);
       if (response.status === 200) {           
          setOrders(response.data.data || [])
          setTableLoading(false);
          return

       } 
        showToast('An unexpected error occurred',"error");
        setTableLoading(false);
    
     } catch (err) {
        showToast('Error getting Orders',"error");
        setTableLoading(false);
     }
    }

    const extractDateOnly = (dateString:any) => {
      const date = new Date(dateString); 
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
    
      return `${year}-${month}-${day}`;
    };
    
    return (
        <div className="w-7xl h-[30vw] ">
           <div className="md:p-10 p-4 space-y-5">
                <p className="text-2xl font-medium text-gray-600 pb-4">All <span className="font-medium text-[#E8C2A5]">Orders</span></p>
                <div className="max-w-4xl rounded-md h-[35vw] overflow-y-scroll scrollbar-hide ">
                {tableLoading ? <Loading /> : (
                    orders?.map((order:any, index) => (
                        <div key={index} className="mb-6 p-4 bg-[#F8F2EE]/90 border border-gray-200 rounded-lg shadow-sm mx-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-[#895025]/70">{order._id.slice(0,6)}</h3>
                            <span className={`py-1 px-3 rounded-full text-xs bg-[#895025]/30 text-white`}>shipped</span>
                          </div>
                          <div className='flex flex-row justify-start items-center w-4/5'>
                            {order.orderDetails.map((item:any )=> (
                              <div key={item.id} className="flex items-center mb-2 mr-4 ">
                                <img src={assets.box_icon} alt={item.itemName} className="w-16 h-16 object-cover mr-4 rounded-md" />
                                <div>
                                  <p className="font-medium text-gray-500">{item.itemName}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  <p className="text-sm text-gray-500">${item.unitPrice.toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              {order.date && (
                                <p className="text-sm text-gray-600">
                                  <span className="text-[#895025]/60 font-medium">{extractDateOnly(order.date)}</span>
                                  {order.id}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-medium text-gray-500/90">Total: ${order.amount.toFixed(2)}</p>
                              <p className="text-sm text-gray-500">Shipping cost & Tax included</p>
                              <button className="text-[#895025]/90">View Details</button>
                            </div>
                          </div>
                        </div>
                    )))}
                </div>
            </div>
        </div>
    );
};

export default OrdersView;