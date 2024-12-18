import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StorySection from "./StorySection";
import Swal from "sweetalert2"; 

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    email: '',
    password: '',
    role: 'Customer',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    city: '',
    email: '',
    password: '',
    role: '',
  });

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email tidak valid',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    if (name === "email") {
      validateEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Nama lengkap harus diisi";
    if (!formData.city) newErrors.city = "Kota harus diisi";
    if (!formData.email) newErrors.email = "Email harus diisi";
    if (!formData.password) newErrors.password = "Password harus diisi";
    if (!formData.role) newErrors.role = "Pilih role pengguna!";
    
    // Validasi jika email tidak sesuai format
    if (formData.email && !errors.email && !newErrors.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }

    // Jika ada error, tampilkan pesan error
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      // const response = await axios.post('http://agrosapp.my.id/api/auth/register', formData);

      Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil!',
        text: 'Akun Anda berhasil dibuat. Silakan masuk.',
        confirmButtonText: 'OK',
      });

      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mendaftar',
        text: error.response?.data?.message || 'Terjadi kesalahan, coba lagi.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <section className="form-section">
      <h2>Daftar Sekarang</h2>
      <p>Mari bergabung bersama Kerabat AGROS Indonesia lainnya.</p>

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
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
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
            {errors.city && <p className="error-message">{errors.city}</p>}
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
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
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
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
        </div>

        <div className="form-group full-width">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Super Admin">Super Admin</option>
            <option value="Customer">Customer</option>
          </select>
          {errors.role && <p className="error-message">{errors.role}</p>}
        </div>

        <button type="submit" className="btn-register">
          Gabung Sekarang
        </button>
      </form>

      <div className="login-link">
        Sudah memiliki Akun? <Link to='/login'>Masuk sekarang</Link>
      </div>

      <StorySection />
    </section>
  );
}

export default Register;
