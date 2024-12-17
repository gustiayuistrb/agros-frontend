import React from 'react';

const Partner = ({ name, location, userId, userRole, onDelete }) => {
  return (
    <div className="partner">
      <div className="partner-content">
        <h3>{name}</h3>
        <span>{location}</span>
      </div>
      {/* Hanya Super Admin yang bisa menghapus pengguna */}
      {userRole === 'Super Admin' && onDelete && (
        <button
          className="delete-btn"
          onClick={() => onDelete(userId)} // Menghapus pengguna ketika tombol X ditekan
        >
          X
        </button>
      )}
    </div>
  );
};

export default Partner;
