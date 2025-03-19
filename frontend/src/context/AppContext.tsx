import { createContext, useContext, useEffect, useState } from "react";

  const defaultValue = {
    cartItems: {},
  setCartItems: () => {},
  addToCart: () => {},
  updateCartQuantity: () => {},
  getCartCount: () => 0,
  getCartAmount: () => 0,
  getShipCost: () => 0,
  getTax: () => 0,
  getUser: () => null,
  getRole: () => null,
  getName: () => null,
  clearCart: () => {},
  logOut: () => {},
  };
  

  export const AppContext = createContext<any>(defaultValue);

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props:any) => {

    const [cartItems, setCartItems] = useState<any>({})
    const [user, setUser] = useState<null | string>(null);
    const [role, setRole] = useState<null | string>(null);
    const [name, setName] = useState<null | string>(null);

    const getUser = ()=>{
        setUserToContext();
        return user;
    }

    const getRole  = ()=>{
        setUserToContext();
        return role;
    }
    const getName  = ()=>{
        setUserToContext();
        return name;
    }
    const clearCart = ()=>{
        return setCartItems({});
    }

    const logOut = ()=>{
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        setUser(null);
        setRole(null);
        setName(null);
    }

    useEffect(() => {
        setUserToContext();
        // const token = localStorage.getItem("token");
        // api.defaults.headers.common[
        //     "Authorization"
        //   ] = `Bearer ${token}`;   
    }, []);

      
    const setUserToContext = ()=>{
        const storedUser = localStorage.getItem("email");
        const storedUserRole = localStorage.getItem("role");
        const storedUserName = localStorage.getItem("name");

        setUser(storedUser || null);
        setRole(storedUserRole || null);
        setName(storedUserName || null);
    }
    const addToCart = async (itemId:string) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const updateCartQuantity = async (itemId:any, quantity:any) => {
            
        let cartData = structuredClone(cartItems);
        if (quantity == 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = (cart:any) => {
        let totalAmount = 0;
    
  
        if (cart && Array.isArray(cart)) {
            for (const items of cart) {

                const itemInfo = cart.find((product: any) => product.itemName === items.itemName);
    
                if (itemInfo && cartItems[items.itemName] > 0) {
                    totalAmount += itemInfo.offerPrice * cartItems[items.itemName]; 
                }
            }
        }
    
        return Math.floor(totalAmount * 100) / 100;
    };
    
    const getShipCost = (cart:any) => {

        let totalAmount = 0;
        
            if (cart.length > 0 && Array.isArray(cart)) {
                for (const items of cart) {
                    if (cartItems[items.itemName] > 0) {
                        totalAmount += items.shippingFee * cartItems[items.itemName]
                    }
                  
                }
            }
    
        return totalAmount;
      }

      const getTax = (cart:any) => {

        let totalAmount = 0;
        
            if (cart.length > 0 && Array.isArray(cart)) {
                for (const items of cart) {
                  totalAmount += items.tax / 100
                }
            }
    
        return totalAmount;
      }

    const value = {
        cartItems, setCartItems, getUser, clearCart, logOut,
        addToCart, updateCartQuantity, getTax, getRole,
        getCartCount, getCartAmount, getShipCost, getName
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}