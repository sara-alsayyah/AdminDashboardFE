import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaTicketAlt } from "react-icons/fa";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function Sidebar({ open }: Props) {
  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300
      ${open ? "w-64" : "w-0 overflow-hidden"}`}
    >
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        MENU
      </div>

      <nav className="flex flex-col p-2 gap-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <FaHome /> Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <FaUsers /> Users
        </NavLink>

        <NavLink
          to="/dashboard/tickets"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <FaTicketAlt /> Tickets
        </NavLink>
      </nav>
    </aside>
  );
}
