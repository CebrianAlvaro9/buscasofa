import { MemoryRouter } from 'react-router-dom';
import NotFound from '../../src/components/NotFound'

describe('NotFound Component', () => {
  it('should render the not found message', () => {
    cy.mount(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    
    cy.contains('No hemos encontrado la página que buscas').should('be.visible');
  });

  it('should render the return home button', () => {
    cy.mount(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    
    cy.contains('Volver al Inicio').should('be.visible');
  });
});