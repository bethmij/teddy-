import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    const menuItems = [
        { name: 'Manage Product', path: '/add-product', icon: assets.add_icon },
        { name: 'Product List', path: '/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/view-orders', icon: assets.order_icon },
        { name: 'Users', path: '/view-users', icon: assets.profile },
    ];

    return (
        <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col'>
            {menuItems.map((item:any) => {

                return (
                    <NavLink
                    to={item.path} 
                    key={item.name}
                    className={({ isActive }) =>
                        `flex items-center py-3 px-4 gap-3  ${
                            isActive
                                ? "border-r-4 md:border-r-[6px] bg-[#E8C2A5]/30 border-[#E8C2A5] font-medium text-gray-600"
                                : "hover:bg-gray-100/90 border-white text-gray-600"
                        }`
                    }
                >
                    <img
                        src={item.icon}
                        alt={`${item.name.toLowerCase()}_icon`}
                        className="w-7 h-7"
                    />
                    <p className="md:block hidden text-center">{item.name}</p>
                </NavLink>
                );
            })}
        </div>
    );
};

export default SideBar;
