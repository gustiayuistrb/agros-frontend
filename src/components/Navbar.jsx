import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, role }) {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('fullName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Handle logo click based on the role
  const handleLogoClick = () => {
    if (role === "Customer") {
      navigate("/home");  // Redirect to CustomerHomePage
    } else if (role === "Super Admin") {
      navigate("/home");  // Redirect to SuperAdminHomePage
    } else {
      navigate("/");  // Redirect to PublicHomePage for non-logged users
    }
  };

  return (
    <header className="Header">
      <div onClick={handleLogoClick}>
        <img alt="Agros Logo" src="/logo-brand.svg" />
      </div>
      <nav>
        <Link to="/about">Tentang</Link>
        {isAuthenticated && <Link to="/profile">Profil</Link>}
      </nav>
    </header>
  );
}

export default Navbar;
