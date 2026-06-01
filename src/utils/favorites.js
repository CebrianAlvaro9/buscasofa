const STORAGE_KEY = "buscasofa_favorites";

export function getFavorites() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addFavorite(id) {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter((favId) => favId !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}
