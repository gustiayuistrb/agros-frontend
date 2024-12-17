import React from 'react';

const Footer = () => (
  <footer className="footer"  style={{ backgroundImage: 'url(./images/footer.svg)' }}>
    <div className="footer-content">
      <p>&copy; 2024 AGROS Indonesia. All rights reserved.</p>
      <div className="footer-links">
        <a href="/about">Tentang</a>
        <a href="/contact">Kontak</a>
        <a href="/privacy">Privasi</a>
      </div>
    </div>
  </footer>
);

export default Footer;
