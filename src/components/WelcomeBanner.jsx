import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeBanner = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove all user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("fullName");

    // Redirect to the Public Home Page after logout
    navigate("/");
  };

  return (
    <section className="welcome-banner" style={{ backgroundImage: 'url(./images/hero-bg.svg)' }}>
      <h1>Selamat datang, {localStorage.getItem('fullName') || 'Pengguna'}!</h1>
      <p>
        Terima kasih telah mempercayakan kami sebagai mitra logistik Anda. 
      </p>
      <p>
        Silakan menikmati fitur terbaik AGROS Indonesia.
      </p>
      <p>
      Jangan sungkan untuk bertanya apapun masalahnya kami selalu ada.

      </p>
      <button className="logout-btn" onClick={handleLogout}>KELUAR</button>
    </section>
  );
};

export default WelcomeBanner;
