import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

type Ticket = {
  _id: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in progress" | "pending" | "closed";
  address: string;
  assignedTo: string; // employee name
  client: string; // client name
  description: string;
  createdAt: string;
};

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [status, setStatus] = useState<Ticket["status"]>("pending");
  const [priority, setPriority] = useState<Ticket["priority"]>("high");
  const [loading, setLoading] = useState(true);

  const statusStyles: Record<Ticket["status"], string> = {
    open: "bg-yellow-100 text-yellow-800",
    "in progress": "bg-orange-100 text-orange-800",
    pending: "bg-purple-100 text-purple-800",
    closed: "bg-gray-100 text-gray-700",
  };

  const priorityStyles: Record<Ticket["priority"], string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`/api/tickets/${id}`);
        setTicket(res.data);
        setStatus(res.data.status);
        setPriority(res.data.priority);
      } catch (err) {
        console.error("Error fetching ticket:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTicket();
  }, [id]);

  if (loading) return <div className="p-4">Loading ticket...</div>;
  if (!ticket) return <div className="p-4 text-red-500">Ticket not found.</div>;

  return (
    <div className="space-y-6 p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-semibold text-gray-900">
          Ticket #{ticket._id}
        </h2>
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
        <h3 className="text-xl font-semibold">{ticket.address}</h3>
        <p className="text-gray-600">{ticket.description}</p>
        <p className="text-gray-500 text-sm">
          Client: {ticket.client} | Assigned To: {ticket.assignedTo || "Not assigned"}
        </p>

        <div className="flex flex-col md:flex-row md:gap-6 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Ticket["status"])}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>open</option>
              <option>in progress</option>
              <option>pending</option>
              <option>closed</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Ticket["priority"])}
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
