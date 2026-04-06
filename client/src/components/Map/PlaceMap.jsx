import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in react-leaflet via Vite
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const UpdateMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const PlaceMap = ({
  locations = [],
  center = null,
  zoom = 10,
  className = "h-96 w-full rounded-2xl shadow-xl z-0",
}) => {
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to India center

  useEffect(() => {
    if (center && center.lat && center.lng) {
      setMapCenter([center.lat, center.lng]);
    } else if (locations.length > 0) {
      // Find the first location with valid coordinates
      const firstValid = locations.find((l) => l.lat && l.lng);
      if (firstValid) {
        setMapCenter([firstValid.lat, firstValid.lng]);
      }
    }
  }, [center, locations]);

  // Fallback map UI if totally empty, but usually we just show India
  return (
    <div className={className}>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full rounded-2xl z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc, idx) => {
          if (!loc.lat || !loc.lng) return null;
          return (
            <Marker key={idx} position={[loc.lat, loc.lng]}>
              <Popup>
                <div className="text-center font-sans">
                  <h3 className="font-bold text-gray-800">{loc.name}</h3>
                  {loc.description && (
                    <p className="text-sm text-gray-600 mt-1">{loc.description}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
        <UpdateMapCenter center={mapCenter} />
      </MapContainer>
    </div>
  );
};

export default PlaceMap;
