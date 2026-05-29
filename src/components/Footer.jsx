import React from "react";

import { members } from "../data/members";

const Footer = () => {
  return (
    <div>
      <h2>Miembros del equipo:</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
