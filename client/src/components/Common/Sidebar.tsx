import { FC } from "react";
import {
  FaTachometerAlt,
  FaAddressBook,
  FaFileAlt,
  FaRegCircle,
  FaCircle,
} from "react-icons/fa";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import AuthService from "@/services/api/authServices";

const Sidebar: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "dashboard" },
    { name: "Contacts", icon: <FaAddressBook />, path: "contact-management" },
    { name: "Posts", icon: <FaFileAlt />, path: "photo-management" },
  ];

  const handleLogout = async () => {

    await AuthService.logout();
    navigate("/login");
  };

  return (
    <aside
      className={`sticky top-0 left-0 min-h-screen bg-muted border-[1px] border-r border-border text-muted-foreground transition-all duration-300 z-50 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col font-Roboto`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div
          className={`text-lg text-primary font-bold ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Clickofy Studio
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {collapsed ? (
            <FaRegCircle color="#f97316" />
          ) : (
            <FaCircle color="#f97316" />
          )}
        </button>
      </div>
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
                isActive ? "bg-accent text-primary" : ""
              }`
            }
          >
            <span className="">{item.icon}</span>
            <span className={`${collapsed ? "hidden" : "block"} `}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
      <Button
        variant={"outline"}
        className="mx-4 mb-4 mt-auto"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
