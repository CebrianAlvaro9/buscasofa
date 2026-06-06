import React from 'react'
import './About.css'

const team = [
  {
    name: 'Álvaro Cebrián Urueña',
    description:
      'Coordinación general de la actividad y reparto de responsabilidades. Creación del fork del proyecto. Implementación del fix del Header ("Quienes somos") con la página NotFound y refactorización del estado de carga global de App.jsx.',
  },
  {
    name: 'Xabier Arroitajauregui Elguea',
    description:
      'Issues #4 y #12: actualización del componente Footer con los miembros reales del equipo y su prueba Cypress (BDD y de componente).',
  },
  {
    name: 'Fernando Javier Rodríguez García Rendueles',
    description:
      'Redacción de la memoria de la actividad y revisión integral de que todo el trabajo del equipo cumple con lo solicitado.',
  },
  {
    name: 'Naiara Azpeitia Azcue',
    description:
      'Redacción de la memoria de la actividad y revisión integral de que todo el trabajo del equipo cumple con lo solicitado.',
  },
  {
    name: 'Helenio Padrón Álvarez',
    description:
      'Creación de todos los issues de GitHub para repartir el trabajo. Implementación del sistema de favoritos con localStorage (página /favoritos, popup en el mapa, halo dorado y test BDD multi-paso), del componente About y su prueba BDD, y del component test de Favorites.',
  },
];

const About = () => {
  return (
    <div className="about-container">
      <h1>Quienes somos</h1>
      <p className="team-number">
        Somos el equipo <strong>N04</strong>
      </p>
      <ul className="members-list">
        {team.map((member) => (
          <li key={member.name} className="member-item">
            <strong className="member-name">{member.name}</strong>
            <p className="member-description">{member.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
