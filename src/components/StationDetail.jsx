import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Comments from './Comments';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';

import './StationDetail.css'
import './Form.css'


function StationDetail({ stations, user }) {
  const location = useLocation();
  const { gobackLink } = location.state || { gobackLink: '/' };

  const { id } = useParams();
  const station = stations.find(s => s.IDEESS === id);

  const [favorite, setFavorite] = useState(() => isFavorite(id));

  if (!station) return <div>Estación no encontrada</div>;

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(id);
      setFavorite(false);
    } else {
      addFavorite(id);
      setFavorite(true);
    }
  };

  return (
    <div className='station-detail'>
      <h1>Detalles de la Estación </h1>
      <div className='station-title-row'>
        <h2>{station['Rótulo']}</h2>
        <button
          className={`favorite-toggle ${favorite ? 'remove-favorite' : 'add-favorite'}`}
          onClick={toggleFavorite}
        >
          {favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </button>
      </div>
      <p><strong>Dirección:</strong> {station['Dirección']}</p>
      <p><strong>Municipio:</strong> {station['Municipio']}</p>
      <p><strong>Gasóleo A:</strong> {station['Precio Gasoleo A']}</p>
      <p><strong>Gasolina 95 E5:</strong> {station['Precio Gasolina 95 E5']}</p>

      <Link to={gobackLink}> &lt;&lt; Volver
      </Link>

      <Comments stationId={station.IDEESS} user={user} />
    </div>
  );
}

export default StationDetail;
