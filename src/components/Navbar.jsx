import React from 'react';
import { FiUser } from 'react-icons/fi'
import { AuthContext } from '../authContext';

const Navbar = () => {
  const { dispatch } = React.useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbar-start">
        <p className=" text-3xl font-extrabold text-white ">APP</p>
      </div>
      <div className="navbar-end">
        <button className=" bg-[#9bff00] w-[128px] h-[48px] flex justify-center items-center rounded-full " onClick={() => {
          dispatch({type: "LOGOUT",});
          window.location.href = "/admin/login";
        }} > <FiUser className=' w-10 ' ></FiUser> Logout</button>
      </div>
    </div>
  );
};

export default Navbar;