/// <reference types="Cypress" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("el usuario navega a {string}", (path) => {
  cy.visit(path);
});

Then("debería ver el número de equipo {string}", (teamNumber) => {
  cy.contains(teamNumber).should("be.visible");
});

Then("debería ver al miembro {string}", (name) => {
  cy.contains(name).should("be.visible");
});

Then("cada miembro debería tener una descripción de su aportación", () => {
  cy.get(".member-description").should("have.length", 5);
  cy.get(".member-description").each(($el) => {
    cy.wrap($el).invoke("text").should("not.be.empty");
  });
});
