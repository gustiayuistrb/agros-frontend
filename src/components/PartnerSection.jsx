import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Partner from './Partner';

function PartnerSection() {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem('role')); 

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://agrosapp.my.id/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setUsers(data); 
      } else {
        console.error(data.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      const response = await fetch(
        `http://agrosapp.my.id/api/users/delete/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        Swal.fire('Berhasil!', 'Pengguna telah dihapus.', 'success');
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        Swal.fire('Gagal!', data.message, 'error');
      }
    }
  };

  return (
    <section className="partners-section">
      <h2>Mitra AGROS</h2>
      <p>
        Kami berusaha semaksimal mungkin untuk memberikan kenyamanan dan keamanan kepada para pelanggan setia AGROS Indonesia. Berikut merupakan daftar pelanggan setia kami.
      </p>
      <div className="partners">
        {users.map((user) => (
          <Partner
            key={user.id}
            name={user.fullName}
            location={user.city}
            userId={user.id}
            userRole={userRole}
            onDelete={userRole === 'Super Admin' ? handleDeleteUser : null}
          />
        ))}
      </div>
    </section>
  );
}

export default PartnerSection;
