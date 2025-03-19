import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import FeaturedProduct from '../components/FeaturedProduct'
import HeaderSlider from '../components/HeaderSlider'
import HomeProducts from '../components/HomeProducts'
import NewsLetter from '../components/NewsLetter'
import api from '../api/api'

export default function Home() {

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getFeaturedProducts = async ()=> {
    setLoading(true);
    try {
      const response = await api.get(`/product/featured/items`);
     if (response.status === 200) {           
        setProducts(response.data.data)
        setLoading(false);
        return 
     } 
     setLoading(true);
    } catch (err) {
      setLoading(false);
    }
    }
    useEffect(()=>{
      getFeaturedProducts();
    },[])

  return (
    <div>
      <HeaderSlider />
      <HomeProducts products={products} isLoading={isLoading}/>
      <FeaturedProduct/>
      <Banner />
      <NewsLetter />
    </div>
  )
}
