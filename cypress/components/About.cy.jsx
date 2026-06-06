/// <reference types="Cypress" />
import About from '../../src/components/About';

const expectedMembers = [
  'Álvaro Cebrián Urueña',
  'Xabier Arroitajauregui Elguea',
  'Fernando Javier Rodríguez García Rendueles',
  'Naiara Azpeitia Azcue',
  'Helenio Padrón Álvarez',
];

describe('<About />', () => {
  beforeEach(() => {
    cy.mount(<About />);
  });

  it('muestra el título "Quienes somos"', () => {
    cy.get('h1').should('contain', 'Quienes somos');
  });

  it('muestra el número de equipo N04', () => {
    cy.get('.team-number').should('contain', 'N04');
  });

  it('muestra los 5 nombres del equipo', () => {
    expectedMembers.forEach((name) => {
      cy.contains('.member-name', name).should('be.visible');
    });
  });

  it('muestra una descripción no vacía para cada miembro', () => {
    cy.get('.member-description').should('have.length', 5);
    cy.get('.member-description').each(($el) => {
      cy.wrap($el).invoke('text').should('not.be.empty');
    });
  });
});
