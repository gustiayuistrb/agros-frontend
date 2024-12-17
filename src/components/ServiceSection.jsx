import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceSection = () => {
    const shipperImage = "/agros-shipper.png";
    const transporterImage = "/agros-transporter.png";
    const driverImage = "/agros-driver.png";

  return (
    <section className="services">
      <h2>Layanan AGROS Indonesia</h2>
      <div className="service-cards">
        <ServiceCard
          image={shipperImage}
          title="AGROS Shipper"
          description="Agros adalah sistem terpadu satu pintu—one stop service yang berfokus pada pelayanan jasa logistik muatan berat. Agros menawarkan mitra terlatih, efisiensi dan"
        />
        <ServiceCard
          image={transporterImage}
          title="AGROS Transporter"
          description="Tidak ada yang tidak mungkin. Kini, Perusahaan bisa dengan cepat mendapatkan keuntungan tanpa harus melakukan hal berat."
        />
        <ServiceCard
          image={driverImage}
          title="AGROS Driver"
          description="AGROS menawarkan keleluasaan untuk memilih proyek sehingga peningkatan pendapatan bukan lagi jadi impian."
        />
      </div>
    </section>
  );
};

export default ServiceSection;
