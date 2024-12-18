import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import StorySection from "./StorySection";
import { useUser } from "../context/UserContext";

function Profil() {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    city: user.city,
    email: user.email,
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("http://agrosapp.my.id/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("User data:", data); 
        setFormData({
          fullName: data.fullName,
          city: data.city,
          email: data.email,
          password: "", 
        });

      localStorage.setItem("userId", data.id); 
        console.log("Saved userId:", localStorage.getItem("userId")); 
      } else {
        alert(data.message);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("userId");
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'User ID not found',
        text: 'Please login again.',
      });
      navigate("/login");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Token not found',
        text: 'Please login again.',
      });
      navigate("/");
      return;
    }
  
    if (formData.password.trim() === "") {
      delete formData.password; 
    }
  
    delete formData.email;
  
    const response = await fetch(
      `http://agrosapp.my.id/api/users/update/${userId}`, 
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      }
    );
  
    const data = await response.json();
  
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Profil berhasil diperbarui',
        text: 'Data profil Anda telah berhasil diperbarui.',
      });

      updateUser({ ...user, fullName: formData.fullName, city: formData.city });

      navigate("/home");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      });
    }
  };  

  return (
    <div className="form-section">
      <h2>Perbarui Profil</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nama Lengkap Kerabat</label>
            <input
              placeholder="Contoh : Bambang"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Asal Kota</label>
            <input
              placeholder="Contoh : Pekalongan"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              placeholder="Contoh: bambang@gmail.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              placeholder="******"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn">
          Perbarui Sekarang
        </button>
      </form>

      <StorySection />
    </div>
  );
}

export default Profil;
