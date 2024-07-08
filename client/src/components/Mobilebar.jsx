// MobileBar.js

import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaBuilding, FaBell, FaCog } from "react-icons/fa";

const MobileBar = () => {
  return (
    <div
      id='mobile-bottom-bar'
      className='fixed lg:hidden bottom-3 left-3  right-3 py-3 px-1 m-auto shadow-md bg-muted rounded-full flex justify-center max-w-[700px]'
    >
      <div className='flex w-full justify-evenly'>
        <Link to='/u/home' className='text-center'>
          <FaHome className='text-2xl' />
        </Link>
        <Link to='/u/orders' className='text-center'>
          <FaUsers className='text-2xl' />
        </Link>
        <Link to='/u/inventory' className='text-center'>
          <FaBuilding className='text-2xl' />
        </Link>
        <Link to='/u/category' className='text-center'>
          <FaBell className='text-2xl' />
        </Link>
        <Link to='/u/setting' className='text-center'>
          <FaCog className='text-2xl' />
        </Link>
      </div>
    </div>
  );
};

export default MobileBar;
