import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.svg"; // adjust path if needed
import { DataContext } from "../../context/DataContext";

const Navbar = () => {

  let {userName,token,navigate,handleLogOut}=useContext(DataContext);

  const logoutUser = () => {
    setUser(null);
    navigate("/");
  };
  

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link to="/">
          <img src={logo} alt="logo" className="h-11 w-auto" />
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {userName && <p className="max-sm:hidden">Hi, {userName}</p>}

          {userName && (
            <button
              onClick={handleLogOut}
              className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
