import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Dashboard";
import Home from "./pages/dashboard/Home";
import Users from "./pages/dashboard/Users";
import Tickets from "./pages/dashboard/Tickets";
import TicketDetails from "./pages/dashboard/TicketDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />           
          <Route path="users" element={<Users />} />          
          <Route path="tickets" element={<Tickets />} />     
          <Route path="ticketdetails" element={<TicketDetails />} /> 
        </Route>
      </Routes>
    
  );
}

export default App;
