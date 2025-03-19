import  { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import showToast from '../alert/alert';
import { ToastContainer } from 'react-toastify';

interface UserDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}


const mockUser: UserDetails = {
  id: "user123",
  name: "Bethmi",
  email: "Bethmi.@example.com",
  phone: "+1 (555) 123-4567",
  image: assets.teddy_1,
  address: {
    street: "123 Main Street, Apt 4B",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11201",
    country: "United States"
  }
};

export default function UserDashboard() {
  const [detail] = useState<UserDetails>(mockUser);
  const [user,setUser] = useState<any>({});
  const [orders, setOrders] = useState<any>([]);
  const [wishlist, setWishlist] = useState<any>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { addToCart, getUser, getRole } = useAppContext();

  useEffect(() => {
    const user = getUser();
    const role = getRole();

    if (!user || !role) {
      navigate("/auth");
      return;
    }

    if (role === "ADMIN") {
      navigate("/add-product");
      return;
    }
    getUserDetails();
    getWishlist();
    getOrders();
  }, [getUser])
  
  const getUserDetails = async ()=> {
    console.log(getUser())
    try {
      const response = await api.get(`/user/${getUser()}`);
    if (response.status === 200) {           
      setUser(response.data.data)
      return;
    } 

    } catch (error:any) {
      if (error.response && error.response.status === 404) {
        showToast('User Not Found', 'error');
      } 
      setUser("");
    }
  }

  const getWishlist = async ()=> {
    try {
      const response = await api.get(`/wishlist/${getUser()}`);
     if (response.status === 200) {           
        return setWishlist(response.data.data)
     } 
      showToast('An unexpected error occurred',"error");
  
   } catch (err) {
      showToast('Error getting Wishlist',"error");
   }
  }

  const getOrders = async ()=> {
    try {
      const response = await api.get(`/order/${getUser()}`);
     if (response.status === 200) {           
        return setOrders(response.data.data)
     } 
      showToast('An unexpected error occurred',"error");
  
   } catch (err) {
      showToast('Error getting orders',"error");
   }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        {user.image && user.image != ""? (
          <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full mr-4 object-cover mix-blend-multiply" />
        ) : (
          <div className="w-16 h-16 rounded-full mr-4 bg-gray-300 flex items-center justify-center text-2xl font-bold">{user?.name?.charAt(0) || ""}</div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-500">{user.name}'s Dashboard</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="flex space-x-6 mb-6">
        {['profile', 'orders', 'wishlist', 'payments'].map(tab => (
          <button
            key={tab}
            className={`py-2 px-4 text-lg font-medium transition-colors  duration-300 ${activeTab === tab ? 'border-b-2 border-[#E8C2A5] text-[#895025]/70' : 'text-gray-500'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#F8F2EE]/60 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-500">Personal Information</h2>
            <p className='text-gray-600'><strong className='text-gray-500'>Full Name:</strong> {user.name}</p>
            <p className='text-gray-600'><strong className='text-gray-500'>Email Address:</strong> {user.email}</p>
            <p className='text-gray-600'><strong className='text-gray-500'>Phone Number:</strong> {user.contact}</p>
            <button className="mt-4 bg-[#e8c2a580] text-[#895025] hover:bg-[#e8c2a5c7] px-4 py-1 rounded-3xl">Edit Details</button>
          </div>

          <div className="bg-[#F8F2EE]/60 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-500">Shipping Address</h2>
            <p className='text-gray-600'><strong className='text-gray-500'>Street Address:</strong> {detail.address.street}</p>
            <p className='text-gray-600'><strong className='text-gray-500'>City:</strong> {detail.address.city}</p>
            <p className='text-gray-600'><strong className='text-gray-500'>State:</strong> {detail.address.state}</p>
            <p className='text-gray-600'><strong className='text-gray-500'>Zip Code:</strong> {detail.address.zipCode}</p>
            <p className='text-gray-600'><strong className='text-gray-500'>Country:</strong> {detail.address.country}</p>
            <button className="mt-4 bg-[#e8c2a580] text-[#895025] hover:bg-[#e8c2a5c7] px-4 py-1 rounded-3xl">Edit Address</button>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-[#F8F2EE]/50 shadow-lg rounded-lg p-6 border-t-2 border-t-[#F8F2EE]/50 ">
          <h2 className="text-xl font-semibold mb-4 text-gray-500">Order History</h2>
          <div className="rounded-md max-h-[35vw] overflow-y-scroll">
          {orders.length > 0 ? (
            orders.map((order:any) => (
              <div key={order._id.slice(0,6)} className="mb-6 p-4 bg-[#F8F2EE]/90 border border-gray-200 rounded-lg shadow-sm mx-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-[#895025]/70">Order : {order._id.slice(0,6)}</h3>
                  <span className={`py-1 px-3 rounded-full text-xs bg-[#895025]/30 text-white`}>{order.status}</span>
                </div>
                <div className='flex flex-row justify-start items-center w-4/5'>
                  {order?.orderDetails.map((orderDetail:any) => (
                    <div key={orderDetail.itemId.itemName} className="flex items-center mb-2 mr-4 ">
                      <img src={orderDetail.itemId.image} alt={orderDetail.itemId.itemName} className="w-16 h-16 object-cover mr-4 rounded-md" />
                      <div>
                        <p className="font-medium text-gray-500">{orderDetail.itemId.itemName}</p>
                        <p className="text-sm text-gray-500">Qty: {orderDetail.quantity}</p>
                        <p className="text-sm text-gray-500">${orderDetail?.unitPrice?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    {order._id && (
                      <p className="text-sm text-gray-600">
                        <span className="text-[#895025]/90">Tracking : </span>
                        {order._id.slice(0,6)}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-medium text-gray-500/90">Total: ${order?.amount?.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Shipping cost & Tax included</p>
                    <button className="text-[#895025]/90">View Details</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No orders placed yet.</div>
          )} </div>
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="bg-[#F8F2EE]/50 border-t-2 border-t-[#F8F2EE]/50 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-500">My Wishlist</h2>
          
          {wishlist.length > 0 ? (
            <div className="rounded-md max-h-[35vw] overflow-y-scroll">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-2">
              {wishlist.map((item:any) => (
                (item.item != null ? 
                  <div key={item.item.itemName } className="bg-[#F8F2EE]/90 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className='flex justify-center'>
                  <img src={item.image} alt={item.item.itemName} className="w-4/5 object-cover rounded-md mb-4 ab mix-blend-multiply" />
                  </div>
                 
                  <div>
                    <h3 className="font-medium text-gray-500">{item.item.itemName}</h3>
                    <p className="text-lg font-medium text-gray-500">${item.item?.price?.toFixed(2)}</p>
                    <p className={`text-sm ${item.item.qty > 0 ? 'text-green-500' : 'text-orange-500'}`}>
                      {item.item.qty > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                    <button 
                      onClick={() => {
                      if( getRole() == "USER" && item.item.qty > 0){
                       addToCart(item.item.itemName);  showToast(`${item.item.itemName} Add to cart`,"success");
                      }}}
                      className={`mt-4 ${item.item.qty > 0 ? 'bg-[#e8c2a580] text-[#895025] hover:bg-[#e8c2a5c7]' : 'bg-gray-300 text-gray-500'}  px-4 py-1 rounded-3xl`}
                      disabled={item.item.qty < 0}
                    >
                      {item.item.qty > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
                :"")
              ))}
            </div></div>
          ) : (
            <div className="text-center text-gray-500">Your wishlist is empty.</div>
          )} 
        </div>
      )}

    {activeTab === 'payments' && (
      <div className="bg-[#F8F2EE]/50 border-t-2 border-t-[#F8F2EE]/50 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-500">Payment Methods</h2>
        <div className="bg-[#F8F2EE]/90 border border-gray-200 rounded-lg p-4 mb-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-blue-500/60 rounded-md"></div>
            <div>
              <p className="font-medium text-gray-500">Visa ending in 4242</p>
              <p className="text-sm text-gray-500">Expires 05/27</p>
            </div>
          </div>
          <span className="bg-[#895025]/30 text-white py-1 px-3 text-xs rounded-full">Default</span>
        </div>

        <div className="bg-[#F8F2EE]/90 border border-gray-200 rounded-lg p-4 mb-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-orange-400/60 rounded-md"></div>
            <div>
              <p className="font-medium text-gray-500">Mastercard ending in 5555</p>
              <p className="text-sm text-gray-500">Expires 08/26</p>
            </div>
            </div>
          <button className="text-[#895025]/70 font-medium text-sm mb-0.5">Make Default</button>
        </div>

      <button className="bg-[#e8c2a580] text-[#895025] hover:bg-[#e8c2a5c7] transition px-4 py-1 rounded-3xl ml-0.5">Add Payment Method</button>
    </div>
    )}
    <ToastContainer className={"overflow-x-hidden"}/>
    </div>
  );
}
