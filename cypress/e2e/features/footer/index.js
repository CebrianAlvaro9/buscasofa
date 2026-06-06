/// <reference types="cypress" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('el usuario navega a la home', () => {
  cy.visit('/');
});

/** @param {string} destination */
Given('el usuario navega desde home a {string}', (destination) => {
  cy.visit('/');

  const links = {
    Buscador: 'a.buscador',
    Mapa: 'a.mapa',
    Favoritos: 'a.favoritos',
    'Quienes somos': 'a.about',
    Login: 'a.login',
    Registro: 'a.registro',
  };

  const selector = /** @type {string | undefined} */ (links[destination]);

  if (!selector) {
    throw new Error(`Enlace desconocido: ${destination}`);
  }

  cy.get(selector).should('be.visible').click();
});

/** @param {string} text */
Then('debería ver el titulo {string}', (text) => {
  cy.contains('h2', text).should('be.visible');
});

/** @param {string} name */
Then('debería ver el nombre {string}', (name) => {
  cy.contains('li', name).should('be.visible');
});
