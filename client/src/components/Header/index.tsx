import { FC } from "react";
import { NavLink } from "react-router";

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Gallery", path: "/gallery" },
];

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center px-8 py-6 bg-(--background) ">
      <div className="text-2xl font-bold">Clickofy Studio</div>
      <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-800">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-600 hover:text-black cursor-pointer"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center space-x-4 text-sm">
        <a
          href="mailto:contact@yourmail.co"
          className="text-gray-700 hover:text-black"
        >
          contact@yourmail.co
        </a>
        <div className="cursor-pointer relative group">
          <span className="text-gray-800">EN</span>
          <svg
            className="inline-block w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {/* Dropdown (optional) */}
        </div>
      </div>
    </header>
  );
};

export default Header;
