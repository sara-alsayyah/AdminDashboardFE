import { useParams } from "react-router-dom";
import { useState } from "react";

const TicketDetails = () => {
  const { id } = useParams();

  const [status, setStatus] = useState<"open" | "pending" | "resolved" | "closed">("pending");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("high");

 
  const statusStyles: Record<typeof status, string> = {
    open: "bg-yellow-100 text-yellow-800",
    pending: "bg-purple-100 text-purple-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-700",
  };

  const priorityStyles: Record<typeof priority, string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6 p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-semibold text-gray-900">Ticket #{id}</h2>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
            {status}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityStyles[priority]}`}>
            {priority}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-semibold">Login not working</h3>
        <p className="text-gray-600">
          I cannot log into my account even after resetting my password.
        </p>

        <div className="flex flex-col md:flex-row md:gap-6 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>open</option>
              <option>pending</option>
              <option>resolved</option>
              <option>closed</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
          </div>
        </div>
      </div>

    
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-semibold">Reply</h3>
        <textarea
          rows={4}
          placeholder="Write a reply..."
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
          Send Reply
        </button>
      </div>
    </div>
  );
};

export default TicketDetails;
