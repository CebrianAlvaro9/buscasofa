/// <reference types="Cypress" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('el usuario navega a "Quienes somos"', () => {
  cy.visit('/');
  cy.get('a.about').should('be.visible').click();
});

Then('debería ver el título "Miembros del equipo N04:"', () => {
  cy.contains('h2', 'Miembros del equipo N04:').should('be.visible');
});

Then('debería ver el miembro "{string}"', (memberName) => {
  cy.contains('ul li', memberName).should('be.visible');
});
