import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {

  const { logOut } = useAppContext()
  const navigate = useNavigate();

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between shadow-md bg-[#F8F2EE]'>
      <img onClick={()=> navigate('/')} className='w-28 lg:w-32 cursor-pointer' src={assets.logo} alt="" />
      <button onClick={()=>{logOut(); navigate("/auth")}}className='bg-[#e8c2a5c7] rounded-full text-[#895025] hover:bg-[#E8C2A5] px-5 py-2 sm:px-7 sm:py-2 text-xs sm:text-sm font-medium'>Logout</button>
    </div>
  )
}

export default Navbar