import { useEffect, useState } from "react";

interface CardProps{
    setPaymentForm:any
    paymentForm:any
    setReady:any
}
export default function AddCard({setPaymentForm, paymentForm, setReady}:CardProps) {

    const [btn, setBtn] = useState(false); 
    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setPaymentForm({
          ...paymentForm,
          [name]: value
        });
        
      };
    
    
      useEffect(() => {
              const values = paymentForm.cardNumber != '' && paymentForm.cardNumber.length > 3  &&
              paymentForm.cardholderName != '' && paymentForm.cardholderName.length > 3  &&
              paymentForm.expiryMonth != '' &&
              paymentForm.expiryYear != '' &&
              paymentForm.cvv != '' && paymentForm.cvv.length > 2 

              if(values){
                setBtn(true);
                return;
              }
              setBtn(false);
       }, [paymentForm])
    

  return (
    <div className="flex flex-col justify-center items-center gap-6 px-6 py-8 bg-[#F8F2EE]/70">
        <p className="text-2xl md:text-3xl font-medium text-[#895025]/50 ">
            Card <span className="text-gray-500">Information</span>
            </p>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Card Number</label>
                  <input
                    type="number"
                    name="cardNumber"
                    value={paymentForm.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded border-gray-300 focus:border-[#E8C2A5] focus:outline-none focus:ring-0"
                  />
                  
                </div>
                
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={paymentForm.cardholderName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full p-2 border rounded border-gray-300 focus:border-[#E8C2A5] focus:outline-none focus:ring-0"
                  />
                  
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Expiry Date</label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        name="expiryMonth"
                        value={paymentForm.expiryMonth}
                        onChange={handleInputChange}
                        className="p-2 border rounded border-gray-300 focus:border-[#E8C2A5] focus:outline-none focus:ring-0"
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = i + 1;
                          return (
                            <option key={month} value={month.toString().padStart(2, '0')}>
                              {month.toString().padStart(2, '0')}
                            </option>
                          );
                        })}
                      </select>
                      
                      <select
                        name="expiryYear"
                        value={paymentForm.expiryYear}
                        onChange={handleInputChange}
                        className="p-2 border rounded border-gray-300 focus:border-[#E8C2A5] focus:outline-none focus:ring-0"
                      >
                        <option value="">YY</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year.toString()}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    
                  </div>
                  
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">CVV</label>
                    <input
                      type="number"
                      name="cvv"
                      value={paymentForm.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength={4}
                      className="w-full p-2 border rounded border-gray-300 focus:border-[#E8C2A5] focus:outline-none focus:ring-0"
                    />
                    
                  </div>
                </div>
              </div>
                    
                <button disabled={!btn} onClick={()=>{setReady()}} className={`text-sm  px-3 py-1 rounded-md ${!btn ?"bg-gray-300/80 text-white":"text-gray-500  bg-[#E8C2A5]/70 hover:bg-[#E8C2A5]"}`}>
                    Confirm
                </button>
            </div>
  )
}
