import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed
import logo from "../assets/logo.png";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {user} = useAuth()

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkStyle = ({ isActive }) =>
    `px-3 py-2 rounded-md transition cursor-pointer ${
      isActive
        ? "text-blue-400 border-l-4 border-blue-500 pl-2"
        : "hover:bg-slate-700 hover:text-blue-400"
    }`;

  return (
    <div className="flex flex-col justify-between h-screen w-64 bg-slate-800 p-6">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <img className="size-10" src={logo} alt="logo" />
          <p className="text-2xl font-bold tracking-wide">PromptVault</p>
        </div>

        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard" end className={linkStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/favourites" className={linkStyle}>
            Favourites
          </NavLink>
          <NavLink to="/dashboard/suggestions" className={linkStyle}>
            Suggestions
          </NavLink>
        </nav>
      </div>

      <div className="relative group cursor-pointer mt-auto pt-6 border-t border-slate-700">
        <User className="w-10 h-10 text-slate-400 bg-slate-700 p-2 rounded-full" />
        <div className="absolute bottom-12 left-0 bg-slate-700 text-sm text-gray-300 px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
          <p className="font-medium mb-1">{user?.email}</p>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
