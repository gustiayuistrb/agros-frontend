import React from 'react';
import { Link } from 'react-router-dom'; 

function HeroSection() {
  return (
    <section className="hero" style={{ backgroundImage: 'url(./images/hero-bg.svg)' }}>
      <h1>Selamat datang, Kerabat!</h1>
      <p>
        Kami hadir dengan membawa solusi terbaik untuk kebutuhan logistik Anda. Melayani dengan sepenuh hati untuk kenyaman Anda dan keamanan barang sampai pada tujuan. Silakan melakukan pendaftaran untuk dapat menikmati layanan kami.
      </p>
      <Link to="/login">
      <button className="btn-primary">MASUK</button>
      </Link>
      <Link to="/register">
      <button className="btn-secondary">DAFTAR</button>
      </Link>
    </section>
  );
}

export default HeroSection;
