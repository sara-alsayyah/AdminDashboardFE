import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/dashboard/Home";
import { useState, useEffect } from "react";
import axios from "axios";
// import DashboardHome later when ready

export default function App() {

  interface user{
    username:string,   
    phone:string,
    email:string,
    id:string,
    name:string,
    role:string
  }
  const [user, setUser] = useState<user>({
    username:"",   
    phone:"",
    email:"",
    id:"",
    name:"",
    role:""
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          const res = await axios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          setUser(res.data); 
        } catch (err: any) {
          console.error("Failed to fetch user:", err);
          setError(err.response?.data?.message || "Failed to fetch user info");
        }
      }
    };
  
    fetchUser();
  }, []);
  

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
