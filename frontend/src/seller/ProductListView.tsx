import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import showToast from "../alert/alert";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Swal from "sweetalert2";
import RestoreIcon from '@mui/icons-material/Restore';
import { useAppContext } from "../context/AppContext";

const ProductView = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [searchedProduct, setSearchedProduct] = useState<any>("");
  const [remove, setRemove] = useState<string>("")
  const { getUser, getRole} = useAppContext(); 
  const [tableLoading, setTableLoading] = useState(true) 

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
  
    }, [getUser])


  useEffect(() => {
    setLoading(false);
    getAllProducts();
  }, [])

  useEffect(() => {
    if(search != ""){
      setSearchError(false);
    }
  }, [search])

  useEffect(() => {
    if(searchedProduct != ""){
      setProducts([searchedProduct]);
      return;
    }
  }, [searchedProduct])

  const getProduct = async ()=> {
    if(search == "" || search == null || search == undefined){
      return setSearchError(true);
    }
    setSearchError(false);
    if(searchedProduct != "" && searchedProduct.itemName == search){return}
    setTableLoading(true);
    try {
      const response = await api.get(`/product/${search}`);
    if (response.status === 200) {           
      setSearchedProduct(response.data.data)
      showToast('Product is Found',"success");
      setTableLoading(false);
      return;
    } 

    } catch (error:any) {
      setTableLoading(false);
      if (error.response && error.response.status === 404) {
        showToast('Product Not Found', 'error');
      } else{
        showToast('Error getting Product', "error");
      }
      setSearchedProduct("");
    }
  }

  const getAllProducts = async ()=> {
    setTableLoading(true);
    try {
      const response = await api.get(`/product/all/null`);
     if (response.status === 200) {           
        setProducts(response.data.data)
        setTableLoading(false);
        return
     } 
      showToast('An unexpected error occurred',"error");
      setTableLoading(false); 
  
   } catch (err) {
      showToast('Error getting Products',"error");
      setTableLoading(false); 
   }
  }

  const removeProduct = async ()=> {
    setTableLoading(true);
    try {
      const response = await api.delete(`/product/${remove}`);
     if (response.status === 204) {           
       Swal.fire({
                title: "Product Remove Successfully!",
                icon: "success"
              });
        return getAllProducts();
      } 
      Swal.fire({
                title: "An unexpected error occurred",
                icon: "error"
              });
      setTableLoading(false);  
   } catch (err) {
      Swal.fire({
        title: "Error Removing Products",
        icon: "error"
      });
      setTableLoading(false);
   }
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? <Loading /> : <div className="w-full md:p-10 p-4">

        <div className="flex flex-row justify-between w-full mb-8">
          <p className="text-2xl font-medium text-gray-600 ">
            All <span className="font-medium text-[#E8C2A5]">Products</span>
          </p>

          <div className="flex flex-row gap-1 max-w-md items-center">
          {searchedProduct != "" && <RestoreIcon sx={{width:25, height:25, marginRight:0.5, color:"gray"}} className="" 
          onClick={() =>{ setRemove(""); setSearch(""); setSearchError(false); setSearchedProduct(""); getAllProducts();}}/>}
            <img onClick={getProduct} className="w-5 h-5 mr-2 hover:bg-[#e8c2a5c7] hover:rounded-full" src={assets.search_icon} alt="search icon" />
              <div className="flex flex-row gap-1 max-w-md items-center relative">
                <input
                  name="itemName"
                  type="text"
                  placeholder="Search Product Name"
                  className="outline-none py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
                  onChange={(e:any)=>{setSearch(e.target.value)}}
                  value={search}
                  required
                />
                {searchError && (
                <p className="mt-2 text-sm text-red-500/80 absolute -bottom-6 ">Enter Product Name</p>
                )}
            </div>
          </div>

      </div>

      <div className="flex flex-col items-center max-w-5xl max-h-[30vw] w-full overflow-y-scroll scrollbar-hide rounded-md bg-white border border-gray-500/20">
        <div className="w-full">
          <table className="w-full table-fixed">
            <thead className="text-gray-900 text-sm text-left bg-[#F8F2EE] sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-medium text-center truncate">Product</th>
                <th className="px-4 py-3 font-medium text-center truncate ">Name</th>
                <th className="px-4 py-3 font-medium text-center truncate ">Category</th>
                <th className="px-4 py-3 font-medium text-center truncate">Price </th>
                <th className="px-4 py-3 font-medium text-center truncate">Offer Price</th>
                <th className="px-4 py-3 font-medium text-center truncate">Quantity</th>
                <th className="px-4 py-3 font-medium text-center truncate ">Action</th>
                <th className="px-5 py-3 font-medium text-center truncate ">Visit</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500 overflow-y-scroll max-h-[35vw]">
            {tableLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8">
                    <div className="flex justify-center items-center">
                      <CircularProgress style={{ color: '#E8C2A5' }} />
                    </div>
                  </td>
                </tr>
              ) : (
              products.map((product:any, index:any) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="pl-2 py-2 truncate">
                    <div className="bg-[#F8F2EE] rounded flex justify-center items-center">
                      <img
                        src={product.image?product.image:assets.image_error}
                        alt=""
                        className="w-16 h-16 object-cover mix-blend-multiply"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-500/90 font-medium">{product.itemName}</td>
                  <td className="px-4 py-3 text-center text-gray-500/90 font-medium">{product.category}</td>
                  <td className="px-4 py-3 text-center text-gray-500/90 font-medium">{product.price}</td>
                  <td className="px-4 py-3 text-center text-gray-500/90 font-medium">${product.offerPrice}</td>
                  <td className="px-4 py-3 text-center text-gray-500/90 font-medium">{product.qty}</td>
                  <td className="px-6 py-3  text-gray-500/90 font-medium">
                    <button onClick={() => setRemove(product.itemName)} className="flex items-center gap-1 px-3.5 py-1.5 bg-[#e8c2a5c7] rounded-full text-[#895025] hover:bg-[#E8C2A5]">
                      <span className="hidden md:block">Remove </span>
                    </button>
                  </td>
                  <td className="px-7 py-3 text-gray-500/90 font-medium">
                    <button onClick={() => navigate(`/shop/${product.itemName}`)} className="flex items-center gap-1 px-3.5 py-1.5 bg-[#e8c2a5c7] rounded-full text-[#895025] hover:bg-[#E8C2A5]">
                      <span className="hidden md:block">Visit </span>
                      <img
                        className="h-3.5"
                        src={assets.redirect_icon}
                        alt=""
                      />
                    </button>
                   </td>
                  </tr>
                 ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer className={"overflow-x-hidden"}/>

        <Dialog
          open={remove != ""}
          onClose={() => setRemove("")}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">Remove Product</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You Want Remove Product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setRemove("")} color="primary">
          Cancel
          </Button>
            <Button
            onClick={()=>{ removeProduct(); setRemove("")}}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
          </DialogActions>
        </Dialog>
      </div>}
    </div>
  );
};

export default ProductView;