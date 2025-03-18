import { Dialog } from '@mui/material';
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import AddCard from './AddCard';
import { assets } from '../assets/assets';

const OrderSummary = () => {
    
  const { currency, router, getCartCount, getCartAmount } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false); 
  const [confirm, setConfirem] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [userAddresses, setUserAddresses] = useState<any>([{
    id: "1",
    userId: "user_2",
    fullName: "user",
    phoneNumber: "0123456789",
    pincode: 654321,
    area: "Main Road , 123 Street, G Block",
    city: "City",
    state: "State",
  }]);

//   const fetchUserAddresses = async () => {
//     setUserAddresses(addressDummyData);
//   }

  const handleAddressSelect = (address:any) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {

  }

//   useEffect(() => {
//      fetchUserAddresses();
//   }, [])


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
          <div className="relative inline-block w-full text-sm border border-gray-300">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-gray-300/5 text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className='text-gray-600'>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 shadow-md mt-1 z-10 rounded-b-md">
                {userAddresses.map((address:any, index:any) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-gray-500"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-1.5 bg-[#E8C2A5]/60 text-sm text-gray-600 hover:bg-[#E8C2A5] cursor-pointer text-center rounded-md"
                >
                  + Add New Address
                </li>
              </ul>
            )}
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

            <p className="text-gray-500">{currency}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className=" text-gray-500">Shipping Fee</p>
            <p className=" text-gray-500">Free</p>
          </div>
          <div className="flex justify-between">
            <p className=" text-gray-500">Tax (2%)</p>
            <p className=" text-gray-500">${currency}{Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t border-t-gray-500/40 pt-3">
            <p className='text-gray-500'>Total</p>
            <p className='text-gray-500'>${getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
          </div>
        </div>
      </div>

      <button onClick={createOrder} className="w-full bg-[#E8C2A5]/60  text-gray-600 font-semibold py-3 mt-5 hover:bg-[#E8C2A5] rounded-md">
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