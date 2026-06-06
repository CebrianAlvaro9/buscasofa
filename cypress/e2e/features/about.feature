Feature: Página Quienes somos

  Como visitante de BuscaSofa
  Quiero ver la información del equipo en /about
  Para conocer quién está detrás del proyecto

  Scenario: La página /about muestra el número de equipo y los 5 miembros
    Given el usuario navega a "/about"
    Then debería ver el número de equipo "N04"
    And debería ver al miembro "Álvaro Cebrián Urueña"
    And debería ver al miembro "Xabier Arroitajauregui Elguea"
    And debería ver al miembro "Fernando Javier Rodríguez García Rendueles"
    And debería ver al miembro "Naiara Azpeitia Azcue"
    And debería ver al miembro "Helenio Padrón Álvarez"
    And cada miembro debería tener una descripción de su aportación
