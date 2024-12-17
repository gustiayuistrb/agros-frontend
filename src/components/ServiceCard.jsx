import React from 'react';

const ServiceCard = ({ image, title, description }) => {
  return (
    <div className="service-card">
      <img alt={title} height="150" src={image} width="350" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
