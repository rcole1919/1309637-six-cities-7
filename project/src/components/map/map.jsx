import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {DEFAULT_ICON_URL, ACTIVE_ICON_URL} from '../../const';

function Map({city, points, className, mapHeight, selectedPoint}) {
  const mapRef = useRef(null);

  const map = useMap(mapRef, city);

  const defaultIcon = leaflet.icon({
    iconUrl: DEFAULT_ICON_URL,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const activeIcon = leaflet.icon({
    iconUrl: ACTIVE_ICON_URL,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  useEffect(() => {
    const markers = [];
    if (map) {
      points.forEach((point) => {
        const marker = leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: (point.name === selectedPoint.name)
              ? activeIcon
              : defaultIcon,
          });
        markers.push(marker);
        marker.addTo(map);

        map.setView([city.latitude, city.longitude], city.zoom);
      });
    }
    return () => {
      markers.forEach((el) => {
        el.remove();
      });
    };
  }, [map, points, defaultIcon, activeIcon, selectedPoint.name, city.latitude, city.longitude, city.zoom]);

  return (
    <section
      className={className}
      style={{height: mapHeight}}
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
      name: PropTypes.string.isRequired,
    }),
  ),
  selectedPoint: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
    name: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
  mapHeight: PropTypes.string.isRequired,
};

export default Map;
