import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const Users = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);   // original fetched users
  const [users, setUsers] = useState<User[]>([]);         // displayed users
  const [filterRole, setFilterRole] = useState<string>("All");

  // Fetch users once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setAllUsers(response.data);
        setUsers(response.data); // initially show all
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter logic
const handleFilter = (role: string) => {
  setFilterRole(role);

  if (role === "All") {
    setUsers(allUsers);
  } else {
    const filtered = allUsers.filter(
      (user) => user.role.toLowerCase() === role.toLowerCase()
    );
    setUsers(filtered);
  }
};

  const handleEdit = (id: number) => alert(`Edit user #${id}`);

  const handleDelete = (id: number) => {
    if (confirm(`Are you sure you want to delete user #${id}?`)) {
      const updated = allUsers.filter((user) => user.id !== id);
      setAllUsers(updated);
      setUsers(
        filterRole === "All"
          ? updated
          : updated.filter((user) => user.role === filterRole)
      );
    }
  };

  return (
    <div className="p-4 md:p-8 font-sans space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-semibold text-gray-900">Users</h2>

        <div className="flex gap-2 flex-wrap">
          {["All", "Client", "Employee"].map((role) => (
            <button
              key={role}
              
              onClick={() => handleFilter(role)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filterRole === role
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px] md:min-w-full">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">#{user.id}</td>
                <td className="px-6 py-4 text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-800">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "Client"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{user.createdAt}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
