import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import showToast from "../alert/alert";
import api from "../api/api";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import RestoreIcon from '@mui/icons-material/Restore';

interface FormErrors {
  itemName?: string;
  description?: string;
  price?: string;
  offerPrice?: string;
  category?: string;
  qty?: string;
  colour?:string
  shippingFee?: string,
  tax?: string,
}

const ManageProduct = () => {
  const [files, setFiles] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [search, setSearch] = useState<any>("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [searchedProduct, setSearchedProduct] = useState<any>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const { getUser, getRole} = useAppContext();
  const navigate = useNavigate();
  const [productForm, setProductForm] = useState({
    itemName: "",
    description: "",
    price: 0,
    offerPrice: 0,
    category: "",
    qty: 0,
    colour: "",
    shippingFee: 0,
    tax: 0,
  });

  useEffect(() => {
    if(search != ""){
      setSearchError(false);
    }
  }, [search])

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
    if(searchedProduct != ""){
        setProductForm(
          {
            itemName: searchedProduct.itemName,
            description:searchedProduct.description,
            price: searchedProduct.price,
            offerPrice: searchedProduct.offerPrice,
            category: searchedProduct.category,
            qty: searchedProduct.qty,
            colour: searchedProduct.colour,
            shippingFee: searchedProduct.shippingFee,
            tax: searchedProduct.tax,
          })
          setFiles(searchedProduct.image);
      }
    }, [searchedProduct])

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (productForm.colour == "Select a Colour" || productForm.colour == "") {
      newErrors.colour = 'Select a colour';
    }

    if (productForm.itemName.length < 2 ) {
      newErrors.itemName = 'Product Name is need';
    }

    if (productForm.description.length < 5 ) {
      newErrors.description = 'Description is need';
    }

    if (productForm.price == 0 ) {
      newErrors.price = 'Price is need';
    }

    if (productForm.offerPrice == 0 ) {
      newErrors.offerPrice = 'Offer price is need';
    }

    if (productForm.category == "Category" || productForm.category == "") {
      newErrors.category = 'Category is need';
    }


    if (productForm.qty == 0 ) {
      newErrors.qty = 'Queantity is need';
    }

    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const ProductTask = async ()=> {
  
    const values = {
      itemName: productForm.itemName,
      description:productForm.description,
      price: productForm.price,
      offerPrice: productForm.offerPrice,
      category: productForm.category,
      qty: productForm.qty,
      colour: productForm.colour,
      shippingFee: productForm.shippingFee,
      tax: productForm.tax,
      image:selectedFile
    }
    try {

      if(searchedProduct != "" && searchedProduct.itemName != "" && productForm.itemName != ""){
        const response = await api.put(`/product/${productForm.itemName}`,values );

        if (response.status === 204) {
          clearDetails();
          Swal.fire({
            title: "Product Update Successfully!",
            icon: "success"
          });
          return
        }
      }else{
        const response = await api.post('/product',values );

        if (response.status === 201) {           
          clearDetails();
          Swal.fire({
            title: "Product Create Successfully!",
            icon: "success"
          });
          return 
        }
      }
      
      } catch (err:any) {
        Swal.fire({
          title: err.response.data.message,
          icon: "error"
        });
      }
      
  }

    const getProduct = async ()=> {
      if(search == "" || search == null || search == undefined){
        return setSearchError(true);
      }
      setSearchError(false);
      if(searchedProduct != "" && searchedProduct.itemName == search){return}
      try {
        const response = await api.get(`/product/${search}`);
      if (response.status === 200) {           
        setSearchedProduct(response.data.data)
        showToast('Product is Found',"success");
        return;
      } 
  
      } catch (error:any) {

        if (error.response && error.response.status === 404) {
          showToast('Product Not Found', 'error');
        } else{
          showToast('Error getting Product', "error");
        }
        setSearchedProduct("");
      }
    }

  const prepareSubmit = ()=>{

    if(validate()){
      ProductTask();
    } 
    
  }

  const clearDetails = ()=>{
    setProductForm({
      itemName: "",
      description: "",
      price: 0,
      offerPrice: 0,
      category: "",
      qty: 0,
      colour: "",
      shippingFee: 0,
      tax: 0,
    })
    setFiles("");
    setSearchedProduct("");
    setSearch(""); 
    setSearchError(false);
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const handleFileSelect = async (file: any) => {
    let filePath: any
    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (validTypes.includes(file.type)) {
          setFiles(URL.createObjectURL(file));

            const readAsDataURL = (file: any) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            };

            try {
                const data = await readAsDataURL(file);
                filePath = data;
                setSelectedFile(filePath)
            } catch (error) {
                console.error('Error reading file:', error);
            }
        } else {
        }
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form className="md:p-10 p-4 space-y-5 ">

      <div className="flex flex-row justify-between w-full relative">
          <p className="text-2xl font-medium text-gray-600 ">
            Manage <span className="font-medium text-[#E8C2A5]">Product</span>
          </p>
          
          <div className="flex flex-row gap-1 max-w-md items-center">
          {searchedProduct != "" && <RestoreIcon sx={{width:25, height:25, marginRight:0.5, color:"gray"}} className="" 
          onClick={() =>{ clearDetails(); setSearch(""); setSearchError(false); }}/>}
            <img onClick={getProduct} className="w-5 h-5 mr-2 hover:bg-[#e8c2a5c7] hover:rounded-full" src={assets.search_icon} alt="search icon" />

              <div className="flex flex-row gap-1 max-w-md items-center">
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

        <div className="flex flex-row items-center">
          <div>
            <p className="text-base font-medium text-gray-600">Product Image</p>
            <div className="flex flex-wrap items-center gap-6 mt-2 ">
              <label>
                <input
                  onChange={(e: any) => {
                    const updatedFiles = e.target.files[0]
                      ? e.target.files[0]
                      : "";
                      handleFileSelect(updatedFiles);
                  }}
                  type="file"
                  hidden
                />
                <img
                  className="max-w-24 cursor-pointer"
                  src={files ? files : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col w-38 ml-14 relative">
            <label
              className="text-base font-medium text-gray-600 mb-2 invisible"
              htmlFor="category"
            >
              Colour
            </label>
            <select
              value={productForm.colour}
              name="colour"
              className="outline-none py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent text-gray-600"
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                Select a Colour
              </option>
              <option value="RED">Red</option>
              <option value="GREEN">Green</option>
              <option value="YELLOW">Yellow</option>
              <option value="BLUE">Blue</option>
              <option value="BLACK">Black</option>
              <option value="WHITE">White</option>
              <option value="MULTICOLOUR">Multicolour</option>
            </select>
            {errors.colour && (
            <p className="mt-2 text-sm text-red-500/80 absolute -bottom-5">{errors.colour}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md relative">
          <label
            className="text-base font-medium text-gray-600"
            htmlFor="product-name"
          >
            Product Name
          </label>
          <input
            name="itemName"
            type="text"
            placeholder="Type here"
            className="outline-none py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
            onChange={handleInputChange}
            value={productForm.itemName}
            required
          />
          {errors.itemName && (
            <p className="mt-2 text-sm text-red-500/80 absolute -bottom-5">{errors.itemName}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 max-w-md relative">
          <label
            className="text-base font-medium text-gray-600"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            name="description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent resize-none"
            placeholder="Type here"
            onChange={handleInputChange}
            value={productForm.description}
            required
          ></textarea>
          {errors.description && (
            <p className="mt-2 text-sm text-red-500/80 absolute -bottom-5">{errors.description}</p>
          )}
        </div>
        <div className="flex items-center gap-5 flex-wrap relative">
          <div className="flex flex-col gap-1 w-34">
            <label
              className="text-base font-medium text-gray-600"
              htmlFor="category"
            >
              Category
            </label>
            <select
              value={productForm.category}
              name="category"
              className="outline-none  py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent text-gray-600"
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                Category
              </option>
              <option value="Dolls">Dolls</option>
              <option value="Puzzels">Puzzels</option>
              <option value="Playset">Playset</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
            <p className="mt-2 text-sm text-red-500/80 absolute -bottom-5">{errors.category}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-32 relative">
            <label
              className="text-base font-medium text-gray-600"
              htmlFor="product-price"
            >
              Product Price
            </label>
            <input
              name="price"
              type="number"
              placeholder="0"
              className="outline-none  py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
              onChange={handleInputChange}
              value={productForm.price}
              required
            />
            {errors.price && (
            <p className="mt-2 text-sm text-red-500/80 absolute -bottom-5">{errors.price}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-32 relative">
            <label
              className="text-base font-medium text-gray-600"
              htmlFor="offer-price"
            >
              Offer Price
            </label>
            <input
              name="offerPrice"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent "
              onChange={handleInputChange}
              value={productForm.offerPrice}
              required
            />
            {errors.offerPrice && (
            <p className="mt-2 text-sm text-red-500/80 absolute -bottom-5 w-42">{errors.offerPrice}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-34">
            <label
              className="text-base font-medium text-gray-600"
              htmlFor="category"
            >
              Shipping fee
            </label>
            <input
              name="shippingFee"
              type="number"
              placeholder="0"
              className="outline-none  py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
              onChange={handleInputChange}
              value={productForm.shippingFee}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label
              className="text-base font-medium text-gray-600"
              htmlFor="product-price"
            >
              Tax
            </label>
            <input
              name="tax"
              type="number"
              placeholder="0"
              className="outline-none  py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
              onChange={handleInputChange}
              value={productForm.tax}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32 relative">
            <label
              className="text-base font-medium text-gray-600"
              htmlFor="offer-price"
            >
              Queantity
            </label>
            <input
              name="qty"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
              onChange={handleInputChange}
              value={productForm.qty}
              required
            />
            {errors.qty && (
            <p className="mt-2 text-sm text-red-500/80 absolute -bottom-5">{errors.qty}</p>
            )}
          </div>
        </div>
        <button
          onClick={prepareSubmit}
          type="button"
          className="px-10 py-1.5 mt-2 bg-[#e8c2a5c7] rounded-full text-[#895025] hover:bg-[#E8C2A5] font-medium"
        >
          {searchedProduct != "" && searchedProduct.itemName != "" ? "Update":"ADD"}
        </button>
      </form>
      <ToastContainer className={"overflow-x-hidden"}/>
    </div>
  );
};

export default ManageProduct;
