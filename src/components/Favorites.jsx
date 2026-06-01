import { Link } from "react-router-dom";
import { getFavorites } from "../utils/favorites";
import "./Favorites.css";

const Favorites = ({ stations }) => {
  const favoriteIds = getFavorites();
  const favoriteStations = stations.filter((s) =>
    favoriteIds.includes(s.IDEESS),
  );

  if (favoriteStations.length === 0) {
    return (
      <div className="favorites-container">
        <h1>Mis favoritos</h1>
        <p className="favorites-empty">
          Aún no has añadido gasolineras a favoritos
        </p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>Mis favoritos</h1>
      <table className="favorites">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Municipio</th>
            <th>Gasóleo A</th>
            <th>Gasolina 95 E5</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {favoriteStations.map((station) => (
            <tr key={station.IDEESS}>
              <td>{station["Rótulo"]}</td>
              <td>{station["Dirección"]}</td>
              <td>{station["Municipio"]}</td>
              <td>{station["Precio Gasoleo A"] || "-"}</td>
              <td>{station["Precio Gasolina 95 E5"] || "-"}</td>
              <td>
                <Link
                  to={`/station/${station.IDEESS}`}
                  state={{ gobackLink: "/favoritos" }}
                >
                  Ver detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorites;
