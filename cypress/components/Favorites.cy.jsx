/// <reference types="Cypress" />
import { MemoryRouter } from 'react-router-dom';
import Favorites from '../../src/components/Favorites';

const STORAGE_KEY = 'buscasofa_favorites';

const fakeStation = {
  IDEESS: 'TEST-1',
  Rótulo: 'TestRepsol',
  Dirección: 'Calle Falsa 123',
  Municipio: 'Madrid',
  'Precio Gasoleo A': '1,500',
  'Precio Gasolina 95 E5': '1,600',
};

describe('<Favorites />', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('muestra el mensaje vacío cuando no hay favoritos en localStorage', () => {
    cy.mount(
      <MemoryRouter>
        <Favorites stations={[]} />
      </MemoryRouter>
    ).then(() => {
      cy.contains('Aún no has añadido gasolineras a favoritos').should('be.visible');
      cy.get('table.favorites').should('not.exist');
    });
  });

  it('muestra la tabla con la gasolinera cuando hay un favorito en localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([fakeStation.IDEESS]));

    cy.mount(
      <MemoryRouter>
        <Favorites stations={[fakeStation]} />
      </MemoryRouter>
    ).then(() => {
      cy.get('table.favorites').should('exist');
      cy.get('table.favorites tbody tr').should('have.length', 1);
      cy.contains('TestRepsol').should('be.visible');
      cy.contains('Calle Falsa 123').should('be.visible');
      cy.contains('Madrid').should('be.visible');
      cy.contains('1,500').should('be.visible');
      cy.contains('1,600').should('be.visible');
    });
  });
});
