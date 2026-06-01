import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Link, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import './FuelMap.css'
import { useEffect, useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

import { getDistanceKm } from '@/apis/utils';
import React from 'react';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';

const icon = new L.Icon({
  iconUrl: './gas-pump.png',
  iconAnchor: [12, 41],
});

const favoriteIcon = new L.Icon({
  iconUrl: './gas-pump.png',
  iconAnchor: [12, 41],
  className: 'marker-favorite',
});

const userIcon = new L.Icon({
  iconUrl: './driver.png',
  iconAnchor: [12, 41],
});


/**
 * mapa de estaciones de servicio
 */
function FuelMap({ stations, loading = false, error = null }) {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [filterRotulo, setFilterRotulo] = useState('');
  const [radius, setRadius] = useState(5); // Nuevo estado para el radio
  const markerRef = useRef(null);
  const [favoritesTick, setFavoritesTick] = useState(0);

  const toggleFavoriteForStation = (stationId) => {
    if (isFavorite(stationId)) {
      removeFavorite(stationId);
    } else {
      addFavorite(stationId);
    }
    setFavoritesTick((t) => t + 1);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => setUserLocation([40.4168, -3.7038]) // fallback: Madrid
      );
    } else {
      setUserLocation([40.4168, -3.7038]); // fallback: Madrid
    }
  }, []);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // @ts-ignore
          setUserLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    [],
  )


  // Filtrar estaciones a radius km de la ubicación del usuario
  const filteredStations = userLocation
    ? stations.filter(station => {
      const lat = parseFloat(station['Latitud'].replace(',', '.'));
      const lon = parseFloat(station['Longitud (WGS84)'].replace(',', '.'));
      const inRadius = getDistanceKm(userLocation[0], userLocation[1], lat, lon) <= radius;
      const matchRotulo = station['Rótulo']
        .toLowerCase()
        .includes(filterRotulo.toLowerCase());
      return inRadius && matchRotulo;
    })
    : [];

  if (loading) {
    return <div className="loading">Cargando mapa...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!userLocation) {
    return <div>Obteniendo ubicación...</div>;
  }


  return (
    <>
      <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div>
          <label htmlFor="filtro-rotulo">Filtrar por rótulo:</label>
          <input
            type="text"
            name="filtro-rotulo"
            id="filtro-rotulo"
            placeholder="Filtrar por rótulo"
            value={filterRotulo}
            onChange={e => setFilterRotulo(e.target.value)}
            className="filter-input"
          />
        </div>
        <div>
          <label htmlFor="radius-slider">Radio: {radius} km</label>
          <input
            type="range"
            id="radius-slider"
            min={1}
            max={30}
            value={radius}
            onChange={e => setRadius(Number(e.target.value))}
            style={{ marginLeft: '1rem', verticalAlign: 'middle' }}
          />
        </div>
      </div>
      <MapContainer center={userLocation} zoom={14} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <Marker
          position={userLocation}
          icon={userIcon}
          draggable={true}
          ref={markerRef}
          eventHandlers={eventHandlers}
        >
          <Tooltip>Tu ubicación</Tooltip>
        </Marker>
        {filteredStations.map((station, idx) => {
          const favorited = isFavorite(station.IDEESS);
          return (
            <Marker
              key={`${idx}-${favorited ? 'fav' : 'reg'}`}
              position={[parseFloat(station['Latitud'].replace(',', '.')), parseFloat(station['Longitud (WGS84)'].replace(',', '.'))]}
              icon={favorited ? favoriteIcon : icon}
            >
              <Tooltip>
                <strong>{station['Rótulo']}</strong><br />
                {station['Dirección']}<br />
                {station['Municipio']}
              </Tooltip>
              <Popup>
                <div className='map-popup'>
                  <strong>{station['Rótulo']}</strong><br />
                  {station['Dirección']}<br />
                  {station['Municipio']}<br /><br />
                  <button
                    className={`favorite-toggle ${favorited ? 'remove-favorite' : 'add-favorite'}`}
                    onClick={() => toggleFavoriteForStation(station.IDEESS)}
                  >
                    {favorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                  </button>
                  <br /><br />
                  <Link
                    to={`/station/${station.IDEESS}`}
                    state={{ gobackLink: '/mapa' }}
                  >
                    Ver detalle
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>


    </>

  );
}

export default FuelMap;