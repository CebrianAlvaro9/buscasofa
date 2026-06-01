Feature: Footer

  Scenario: El usuario va al enlace "Quienes somos"
        Given el usuario navega a "Quienes somos"
        Then debería ver el título "Miembros del equipo N04:"
        And debería ver el miembro "Alvaro Cebrian Urueña"
        And debería ver el miembro "Helenio Padrón Álvarez"
        And debería ver el miembro "Fernando Javier Rodriguez García Rendueles"
        And debería ver el miembro "Xabier Arroitajauregui Elguea"
