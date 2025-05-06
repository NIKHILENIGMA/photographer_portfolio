import { FC } from "react";
import {
  FaTachometerAlt,
  FaAddressBook,
  FaFileAlt,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router";

const Sidebar: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "dashboard" },
    { name: "Contacts", icon: <FaAddressBook />, path: "contact-management" },
    { name: "Posts", icon: <FaFileAlt />, path: "photo-management" },
  ];
  return (
    <div
      className={`bg-sidebar border-[1px] border-r border-card text-secondary-foreground/70 transition-all duration-300 ${
        collapsed ? "w-16" : "w-80"
      } flex flex-col`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-accent">
        <div className={`text-lg text-black font-bold ${collapsed ? "hidden" : "block"}`}>
          MyCompany
        </div>
        <button onClick={() => setCollapsed(!collapsed)} >
          <FaBars />
        </button>
      </div>
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 hover:bg-sidebar-accent/50 ${
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
              }`
            }
          >
            <span>{item.icon}</span>
            <span className={`${collapsed ? "hidden" : "block"}`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
