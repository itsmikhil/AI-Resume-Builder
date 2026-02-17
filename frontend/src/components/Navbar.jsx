import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.svg"; // adjust path if needed

const Navbar = () => {
  const navigate = useNavigate();

  // 🔥 Simulated user (frontend only)
  const [user, setUser] = useState({
    name: "John Doe",
  });

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
          {user && <p className="max-sm:hidden">Hi, {user.name}</p>}

          {user && (
            <button
              onClick={logoutUser}
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
