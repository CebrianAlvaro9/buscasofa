/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const interceptFuelApi = () => {
  cy.intercept("GET", "**/EstacionesTerrestres/**").as("getFuelPrices");
};

const ensureAppLoaded = () => {
  cy.get(".loading", { timeout: 30000 }).should("not.exist");
};

const navigateTo = (path) => {
  cy.get("body").then(($body) => {
    const hasHeader = $body.find("header nav").length > 0;
    const hasLink = $body.find(`header nav a[href="${path}"]`).length > 0;
    if (hasHeader && hasLink) {
      cy.get(`header nav a[href="${path}"]`).click();
    } else {
      interceptFuelApi();
      cy.visit(path);
      cy.wait("@getFuelPrices");
      ensureAppLoaded();
    }
  });
};

Given("el usuario ha limpiado sus favoritos", () => {
  cy.clearLocalStorage("buscasofa_favorites");
});

Given(
  "el usuario navega al detalle de la primera gasolinera de la lista",
  () => {
    interceptFuelApi();
    cy.visit("/lista");
    cy.wait("@getFuelPrices");
    ensureAppLoaded();
    cy.get("table tbody tr", { timeout: 10000 })
      .first()
      .find("a")
      .first()
      .click();
    cy.url().should("include", "/station/");
  }
);

When("el usuario hace click en el botón de añadir a favoritos", () => {
  cy.get("button.add-favorite").click();
});

When("el usuario hace click en el botón de quitar de favoritos", () => {
  cy.get("button.remove-favorite").click();
});

When("el usuario navega a {string}", (path) => {
  navigateTo(path);
});

Then("debería ver el mensaje {string}", (message) => {
  cy.contains(message).should("be.visible");
});

Then("debería ver al menos una gasolinera en la lista de favoritos", () => {
  cy.get("table.favorites tbody tr").should("have.length.greaterThan", 0);
});
