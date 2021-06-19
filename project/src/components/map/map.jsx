import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import useMap from './useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {DEFAULT_ICON_URL} from '../../const';

function Map({city, points}) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultIcon = leaflet.icon({
    iconUrl: DEFAULT_ICON_URL,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: defaultIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, defaultIcon]);

  return (
    <section
      className="cities__map map"
      style={{height: '100%'}}
      ref={mapRef}
    />
  );
}

Map.propTypes = {
  city: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
  points: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
  ),
};

export default Map;
