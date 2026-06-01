Feature: Favoritos

  Como usuario de BuscaSofa
  Quiero poder marcar gasolineras como favoritas
  Para verlas rápidamente en una página dedicada

  Background:
    Given el usuario ha limpiado sus favoritos

  Scenario: El usuario ve la página de favoritos vacía cuando no tiene ninguna
    When el usuario navega a "/favoritos"
    Then debería ver el mensaje "Aún no has añadido gasolineras a favoritos"

  Scenario: El usuario marca una gasolinera como favorita y la ve en la lista
    Given el usuario navega al detalle de la primera gasolinera de la lista
    When el usuario hace click en el botón de añadir a favoritos
    And el usuario navega a "/favoritos"
    Then debería ver al menos una gasolinera en la lista de favoritos

  Scenario: El usuario desmarca una gasolinera y la lista vuelve a estar vacía
    Given el usuario navega al detalle de la primera gasolinera de la lista
    And el usuario hace click en el botón de añadir a favoritos
    When el usuario hace click en el botón de quitar de favoritos
    And el usuario navega a "/favoritos"
    Then debería ver el mensaje "Aún no has añadido gasolineras a favoritos"
