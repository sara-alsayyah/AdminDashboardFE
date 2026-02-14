import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar = ({ toggleSidebar }: TopbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white shadow px-4 md:px-8 py-4">
      {/* Hamburger */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 p-2 rounded hover:bg-gray-200 md:hidden"
      >
        <FaBars />
      </button>

      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-900 hidden md:block">
        Admin Dashboard
      </h1>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
