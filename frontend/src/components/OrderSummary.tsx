import { Dialog } from '@mui/material';
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import AddCard from './AddCard';
import { assets } from '../assets/assets';
interface OrderProps{
  cart:any
  setPaymentForm: any
  paymentForm:any
  setSelectedAddress: any
  selectedAddress:string
  onSubmit:any
}
const OrderSummary = ({cart,paymentForm,selectedAddress,setPaymentForm,setSelectedAddress,onSubmit}:OrderProps) => {
  const { getCartCount, getCartAmount, getShipCost, getTax } = useAppContext()
  const [isCardOpen, setIsCardOpen] = useState(false); 
  const [confirm, setConfirem] = useState(false);

  const handleChange = (e:any) => {
    const { value } = e.target;
    setSelectedAddress(value);
  };
  useEffect(() => {
    if(!paymentForm.cardNumber){
      setConfirem(false)
      return;
    }
    }, [paymentForm.cardNumber])

  return (
    <div className="w-full md:w-96 bg-[#F8F2EE]/70 p-5 rounded-2xl">
      <h2 className="text-xl md:text-2xl font-medium text-gray-500">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-500 block mb-2">
            Select Address
          </label>
            <div className="relative inline-block w-full text-sm ">
              <input
                type="text"
                id="address"
                name="address"
                value={selectedAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
              />
          </div>
        </div>

        <div>
        <label className="text-base font-medium uppercase text-gray-500 block mb-2">
            Payment Information
          </label>
          <div className="flex flex-col items-start gap-2">
            {!confirm ? <div className='text-base text-gray-400'>No card added</div>:
              <div className='flex justify-center items-center w-full'>
                <label className="text-base font-medium text-gray-500 block mr-4">Card Number</label>
                <label className="text-base text-gray-500 block">********{paymentForm.cardNumber.replace(/\s+/g, '').slice(-3)}</label>
                <img
                    className="h-15 w-15 ml-2"
                    src={assets.money}
                    alt="heart_icon"
                    />
                  <img
                    className="h-10 w-10 ml-2"
                    src={assets.credit_card}
                    alt="heart_icon"
                    />
              </div>
            }
            <button onClick={()=>{setIsCardOpen(true)}} className="bg-[#E8C2A5]/60 text-sm text-gray-600 px-3 py-1 hover:bg-[#E8C2A5] rounded-md">
              {confirm ? "Replace Card" : "Add Card"}
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className=" text-gray-500 uppercase">
              Items <span className="font-medium text-orange-600"> {getCartCount()}</span>
            </p>

            <p className="text-gray-500">$ {getCartAmount(cart)}</p>
          </div>
          <div className="flex justify-between">
            <p className=" text-gray-500">Shipping Fee</p>
            <p className=" text-gray-500"> {getShipCost(cart) == 0 ? "Free": `$ ${getShipCost(cart)}`}</p>
          </div>
          <div className="flex justify-between">
            <p className=" text-gray-500">Tax</p>
            <p className=" text-gray-500">$ {Math.floor(getCartAmount(cart) * getTax(cart))}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t border-t-gray-500/40 pt-3">
            <p className='text-gray-500'>Total</p>
            <p className='text-gray-500'>${getShipCost(cart) + getCartAmount(cart) + Math.floor(getCartAmount(cart) * getTax(cart))}</p>
          </div>
        </div>
      </div>

      <button disabled={getCartCount() == 0} onClick={onSubmit} className={`w-full ${getCartCount() == 0 ? "bg-[#E8C2A5]/40 text-white" : "bg-[#E8C2A5]/80 hover:bg-[#E8C2A5] text-gray-600"} py-3 mt-5  rounded-md `}>
        Place Order
      </button>

      <Dialog
        open={isCardOpen}
        onClose={()=>{setIsCardOpen(false);}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <AddCard setPaymentForm={setPaymentForm} paymentForm={paymentForm} setReady={()=>{setConfirem(true); setIsCardOpen(false)}}/>
      </Dialog>
    </div>
  );
};

export default OrderSummary;