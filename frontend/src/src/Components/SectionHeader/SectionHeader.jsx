import React from "react";
import "./SectionHeader.css";

const SectionHeader = ({ heading, description }) => {
  return (
    <div className="section-header">
      <h2>{heading}</h2>
      <p>{description}</p>
    </div>
  );
};

export default SectionHeader;
