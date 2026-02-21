import { useContext, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FiFramer } from "react-icons/fi";
import { FaMicrosoft } from "react-icons/fa";
import { SiHuawei } from "react-icons/si";
import { TbBrandWalmart } from "react-icons/tb";
import logo from "../../assets/logo.svg";
import { DataContext } from "../../../context/DataContext";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const logos = [FaInstagram, FiFramer, FaMicrosoft, SiHuawei, TbBrandWalmart];
  const { navigate } = useContext(DataContext);
  return (
    <>
      <div className="min-h-screen pb-20">
        {/* Navbar */}
        <nav className="flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <img src={logo} alt="logo" className="h-11 w-auto" />

          <div className="hidden md:flex items-center gap-8 text-slate-800">
            <a href="#" className="hover:text-green-600 transition">
              Home
            </a>
            <a href="#features" className="hover:text-green-600 transition">
              Features
            </a>
            <a href="#testimonials" className="hover:text-green-600 transition">
              Testimonials
            </a>
            <a href="#cta" className="hover:text-green-600 transition">
              Contact
            </a>
          </div>

          <div className="hidden md:flex gap-3">
            <button className="px-6 py-2 bg-green-500 hover:bg-green-700 rounded-full text-white">
              Get started
            </button>
            <button className="px-6 py-2 border rounded-full text-slate-700 hover:bg-slate-50" onClick={()=> navigate("/login")}>
              Login
            </button>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden">
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-white gap-8 md:hidden">
            <a href="#">Home</a>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
            <button
              onClick={() => setMenuOpen(false)}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center px-6 mt-14 gap-5">
          {/* Avatars + Stars */}
          <div className="flex items-center mt-4">
            <div className="flex -space-x-3 pr-3">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                alt="user3"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition"
              />
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="user1"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="user2"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                alt="user3"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition"
              />
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="user5"
                className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition"
              />
            </div>

            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-green-600 text-lg">
                    ★
                  </span>
                ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold max-w-4xl">
            Land your dream job with{" "}
            <span className="text-green-600">AI-powered resumes</span>
          </h1>

          <p className="max-w-md my-6 text-gray-600">
            Create, edit and download professional resumes with AI-powered
            assistance.
          </p>

          <div className="flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 h-12">
              Get started
            </button>
            <button className="border rounded-full px-8 h-12 hover:bg-green-50">
              Try demo
            </button>
          </div>

          <p className="py-6 text-slate-600 mt-14">Trusted by leading brands</p>

          <div className="flex flex-wrap justify-center gap-36 max-w-3xl">
            {logos.map((Logo, index) => (
              <Logo
                key={index}
                className="text-3xl text-gray-500 hover:text-green-600 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
