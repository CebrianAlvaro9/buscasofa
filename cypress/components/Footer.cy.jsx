/// <reference types="Cypress" />
import React from 'react'
import Footer from '../../src/components/Footer'

const expectedNames = [
  'Alvaro Cebrian Urueña',
  'Helenio Padrón Álvarez',
  'Fernando Javier Rodriguez García Rendueles',
  'Naiara Azpeitia Azcue',
  'Xabier Arroitajauregui Elguea',
]

describe('<Footer />', () => {
  beforeEach(() => {
    cy.mount(<Footer />)
  })

  it('muestra los 5 nombres del equipo', () => {
    cy.get('ul li').should('have.length', 5)
    expectedNames.forEach((name) => {
      cy.contains('li', name).should('be.visible')
    })
  })
})
