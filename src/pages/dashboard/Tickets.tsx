import { useState } from "react";

type Ticket = {
  id: number;
  subject: string;
  status: "open" | "in progress" | "pending" | "closed";
  priority: "low" | "medium" | "high";
  client: string;
  assignedTo: string;
  createdAt: string;
};

// Mock tickets
const mockTickets: Ticket[] = [
  { id: 101, subject: "Router not working", status: "open", priority: "high", client: "alia", assignedTo: "Ali", createdAt: "Feb 10, 2026" },
  { id: 102, subject: "Payment issue", status: "pending", priority: "medium", client: "Jane ", assignedTo: "ray", createdAt: "Feb 11, 2026" },
];

const statusStyles: Record<Ticket["status"], string> = {
  open: "bg-yellow-100 text-yellow-800",
  "in progress": "bg-orange-100 text-orange-800",
  pending: "bg-purple-100 text-purple-800",
  closed: "bg-green-100 text-green-800",
};

const priorityStyles: Record<Ticket["priority"], string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const Tickets = () => {
  const [filterStatus, setFilterStatus] = useState<"All" | Ticket["status"]>("All");
  const [tickets, setTickets] = useState(mockTickets);

  const filteredTickets =
    filterStatus === "All" ? tickets : tickets.filter(t => t.status === filterStatus);

  // Mock actions
  const handleEdit = (id: number) => alert(`Edit Ticket #${id}`);
  const handleDelete = (id: number) => {
    if (confirm(`Delete Ticket #${id}?`)) setTickets(tickets.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-semibold text-gray-900">Tickets</h2>

        <div className="flex gap-2 flex-wrap">
          {["All", "open", "in progress", "pending", "resolved"].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterStatus === status ? "bg-gray-900 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Assigned To</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-4 py-2 font-medium">#{ticket.id}</td>
                <td className="px-4 py-2">{ticket.subject}</td>
                <td className="px-4 py-2">{ticket.client}</td>
                <td className="px-4 py-2">{ticket.assignedTo}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityStyles[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500 text-sm">{ticket.createdAt}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(ticket.id)} className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(ticket.id)} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTickets.length === 0 && (
          <div className="p-4 text-center text-gray-500">No tickets found.</div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
