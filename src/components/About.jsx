import React from "react";
import "./About.css";
import { members } from "../data/members";

const About = () => {
  return (
    <div className="about-container">
      <h1>Acerca de nosotros</h1>
      <p id="info" className="team-number">Somos el equipo nº 23</p>

      <ul className="members-list">
        {members.map((member, index) => (
          <li key={index} className="member-item">
            <strong>{member.name}</strong>
            {member.contributions.length > 0 && (
              <ul className="contributions">
                {member.contributions.map((contrib, cIndex) => (
                  <li key={cIndex}>{contrib}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
