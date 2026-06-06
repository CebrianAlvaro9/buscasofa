/* global describe, it, cy */
/// <reference types="cypress" />

describe('Visualización del footer de la aplicación', () => {
  const teamMembers = [
    'Alvaro Cebrian Urueña',
    'Helenio Padrón Álvarez',
    'Fernando Javier Rodriguez García Rendueles',
    'Naiara Azpeitia Azcue',
    'Xabier Arroitajauregui Elguea',
    
  ];

  const verifyFooter = () => {
    cy.contains('h2', 'Miembros del equipo:').should('be.visible');

    teamMembers.forEach((member) => {
      cy.contains('li', member).should('be.visible');
    });
  };

  it('El usuario accede a home y ve el footer con los miembros del equipo', () => {
    cy.visit('/');
    verifyFooter();
  });

  it('El usuario accede desde home al enlace Buscador y sigue viendo el footer', () => {
    cy.visit('/');
    cy.get('nav a.buscador').click();
    cy.url().should('include', '/lista');
    verifyFooter();
  });

  it('El usuario accede desde home al enlace Mapa y sigue viendo el footer', () => {
    cy.visit('/');
    cy.get('nav a.mapa').click();
    cy.url().should('include', '/mapa');
    verifyFooter();
  });

  it('El usuario accede desde home al enlace Favoritos y sigue viendo el footer', () => {
    cy.visit('/');
    cy.get('nav a.favoritos').click();
    cy.url().should('include', '/favoritos');
    verifyFooter();
  });

  it('El usuario accede desde home al enlace Quienes somos y ve el título del footer', () => {
    cy.visit('/');
    cy.get('nav a.about').click();
    cy.url().should('include', '/about');
    verifyFooter();
  });

  it('El usuario accede desde home al enlace Login y sigue viendo el footer', () => {
    cy.visit('/');
    cy.get('nav a.login').click();
    cy.url().should('include', '/login');
    verifyFooter();
  });

  it('El usuario accede desde home al enlace Registro y sigue viendo el footer', () => {
    cy.visit('/');
    cy.get('nav a.registro').click();
    cy.url().should('include', '/registro');
    verifyFooter();
  });
});
