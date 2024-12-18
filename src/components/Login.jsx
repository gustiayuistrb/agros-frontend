import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StorySection from "./StorySection";
import Swal from "sweetalert2"; // Import SweetAlert2

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      email: "",
      password: "",
    });

    let hasError = false;
    const newErrors = {};

    // Validasi email
    if (!email) {
      newErrors.email = "Email harus diisi";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Format email tidak valid";
      hasError = true;
    }

    // Validasi password
    if (!password) {
      newErrors.password = "Password harus diisi";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://agrosapp.my.id/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("fullName", data.user.fullName);
        navigate("/home");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Masuk',
          text: data.message || 'Email atau password salah.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Terjadi kesalahan, coba lagi nanti.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <section className="form-section">
      <h2>Masuk Sekarang</h2>
      <p>Masuk dan nikmati fitur kami</p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              placeholder="Contoh: bambang@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              placeholder="******"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
        </div>

        <button type="submit" className="btn-login">
          Masuk Sekarang
        </button>
      </form>

      <StorySection />
    </section>
  );
}

export default Login;
