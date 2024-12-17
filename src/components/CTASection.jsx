import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/register");
  };

  return (
    <section className="cta">
      <h2>Mitra AGROS</h2>
      <p>
        Kami berusaha semaksimal mungkin untuk memberikan kenyamanan dan keamanan
        kepada para pelanggan setia AGROS Indonesia. Untuk melihat daftar
        pelanggan kami, silakan melakukan pendaftaran.
      </p>
      <button onClick={handleJoinClick}>Gabung Sekarang</button>
    </section>
  );
};

export default CTASection;
