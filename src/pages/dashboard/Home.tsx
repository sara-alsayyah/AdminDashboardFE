import { FaUsers, FaTicketAlt, FaCheckCircle } from "react-icons/fa";

const Home = () => {
  const stats = [
    { id: 1, title: "Total Users", value: 120, icon: <FaUsers className="text-2xl text-white" />, color: "bg-blue-500" },
    { id: 2, title: "Open Tickets", value: 45, icon: <FaTicketAlt className="text-2xl text-white" />, color: "bg-yellow-500" },
    { id: 3, title: "Resolved Tickets", value: 75, icon: <FaCheckCircle className="text-2xl text-white" />, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div key={stat.id} className="flex items-center justify-between bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <div>
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <div className={`p-4 rounded-full ${stat.color} flex items-center justify-center`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Tickets</h3>
        <p className="text-gray-500 text-sm">This section will display recent tickets submitted by clients.</p>
      </div>
    </div>
  );
};

export default Home;
