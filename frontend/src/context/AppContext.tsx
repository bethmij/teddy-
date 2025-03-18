import { createContext, useContext, useEffect, useState } from "react";
import { productsDummyData } from "../assets/assets";



  
  const defaultValue = {
    cartItems: {},
    setCartItems: () => {}, 
    addToCart: () => {},
    updateCartQuantity: () => {},
    getCartCount:() => {},
    products:[]
  };
  

  export const AppContext = createContext<any>(defaultValue);

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props:any) => {

    const [products, setProducts] = useState<any>([])
    const [cartItems, setCartItems] = useState<any>({})

    const fetchProductData = async () => {
        setProducts(productsDummyData)
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
        if (quantity === 0) {
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

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product:any) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData();
    }, [])


    const value = {
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}