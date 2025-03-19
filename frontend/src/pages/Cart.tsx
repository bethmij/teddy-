import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import OrderSummary from "../components/OrderSummary";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import showToast from "../alert/alert";
import { ToastContainer } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Cart = () => {
  const { cartItems, addToCart, getCartCount, updateCartQuantity, getShipCost, getCartAmount, getTax, getUser, clearCart} = useAppContext();
  const [cart, setCart] = useState<any[]>([]);
  const [signIn, setSignIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  useEffect(()=>{
    getProductItems();
  },[])

 
  const getProductItems = async ()=> {

    const itemNames =   Object.keys(cartItems);
    if (itemNames.length === 0) {
      showToast("Cart is empty", "error");
      return;
    }
    try {
      const response = await api.post('/product/cart/items', {
        itemNames: itemNames   
      });
    if (response.status === 200) {           
      return setCart(response.data.data)
    } 
      showToast('An unexpected error occurred',"error");

    } catch (err) {
        showToast('Error getting Product', "error");
    }
  }

    const checkCartQty = async (id:any)=> {

      if (cart && Array.isArray(cart)) {
        for (const items of cart) {
            if(items.itemName == id && items.qty > cartItems[items.itemName]){
              addToCart(items.itemName)
            }
        }
      } 
    }
    const placeOrder = async ()=> {

      try {
        const response = await api.post('/order', {
          userId: getUser() !=  null ? getUser() : null ,
          status: "shipped",
          cardNum: paymentForm.cardNumber,//
          amount: getShipCost(cart) + getCartAmount(cart) + Math.floor(getCartAmount(cart) * getTax(cart)),
          orderDetails: cart.map((item)=>(
              {
                itemId: item._id, 
                itemName:item.itemName,
                quantity: cartItems[item.itemName],
                unitPrice: item.offerPrice,
                total: item.offerPrice * cartItems[item.itemName]
              }
          )),
          addresses: selectedAddress
          });

          if (response.status === 201) {           
            clearDetails();
            return showToast('Order Placed Successfully',"success");
          } 

        } catch (err) {
          showToast('Error Placing Order', "error");
        }
        
    }

    const prepareSubmit = ()=>{

      if (getUser() ==  null || getUser().name == "" ) {
          // navigate(`/auth`);
          setSignIn(true)
          return;
      }
        
      if(!paymentForm.cardNumber){
        showToast('Add Card before Place Order', "error");
        return;
      }

      if(!selectedAddress || selectedAddress.length < 5){
        showToast('Add Valid Address before Place Order', "error");
        return;
      }

      placeOrder();
    }

    const clearDetails = ()=>{
      setPaymentForm({
        cardNumber: '',
        cardholderName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
      })
      clearCart();
      setSelectedAddress("");
    }
  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 px-6 pt-14 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-[#E8C2A5]">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
              {cart.map((item:any) => {
                  // const product = products.find((product:any) => product._id === itemId);

                  if (!item || cartItems[item.itemName] <= 0 || cartItems[item.itemName] == null) return null;

                  return (
                    <tr key={item._id}>
                      <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                        <div>
                          <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                            <img
                              src={item.image}
                              alt={item.itemName}
                              className="w-16 h-auto object-cover mix-blend-multiply"
                            />
                          </div>
                          <button
                            className="md:hidden text-xs text-orange-600 mt-1"
                            onClick={() => updateCartQuantity(item.itemName, 0)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-sm hidden md:block">
                          <p className="text-gray-800">{item.name}</p>
                          <button
                            className="text-xs text-orange-600 mt-1"
                            onClick={() => updateCartQuantity(item.itemName, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-gray-600">${item.offerPrice}</td>
                      <td className="py-4 md:px-4 px-1">
                        <div className="flex items-center md:gap-2 gap-1">
                        <button onClick={() => { cartItems[item.itemName] > 1 && updateCartQuantity(item.itemName, cartItems[item.itemName] - 1)}}>
                            <img
                              src={assets.decrease_arrow}
                              alt="decrease_arrow"
                              className="w-4 h-4"
                            />
                          </button>
                          <input onChange={e => {updateCartQuantity(item.itemName, Number(e.target.value))}} type="" value={cartItems[item.itemName]} className="w-8 border border-gray-300 rounded-md text-center focus:border-gray-400 focus:outline-none focus:ring-1 "></input>
                          <button onClick={() => checkCartQty(item.itemName)}>
                            <img
                              src={assets.increase_arrow}
                              alt="increase_arrow"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-gray-600">${(item.offerPrice * cartItems[item.itemName]).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button onClick={()=> {navigate('/shop')}} className="group flex items-center mt-6 gap-2 text-[#895025]/70">
            <img
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary cart={cart} setPaymentForm={setPaymentForm} paymentForm={paymentForm} setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} onSubmit={prepareSubmit}/>
        <Dialog
          open={signIn}
          onClose={() => setSignIn(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">Need Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Please sign in before placing your order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setSignIn(false)} color="primary">
          Cancel
          </Button>
            <Button
            onClick={() => navigate("/auth")}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
          </DialogActions>
        </Dialog>
  
        <ToastContainer className={"overflow-x-hidden"}/>
      </div>
    </>
  );
};

export default Cart;
