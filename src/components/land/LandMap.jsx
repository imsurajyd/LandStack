import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  LayersControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// -------------------------------------------------------------
// Leaflet Default Marker Asset Fix
// -------------------------------------------------------------
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Auto-focus boundary bounds
function MapFocus({ boundary, focusParcel }) {
  const map = useMap();

  useEffect(() => {
    if (!focusParcel || !boundary?.length) return;

    const bounds = boundary.map(([lat, lng]) => [lat, lng]);

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 17,
      animate: true,
    });
  }, [focusParcel, boundary, map]);

  return null;
}

function LandMap({ land, fullScreen = false, focusParcel = false }) {
  const position = [land?.latitude || 25.5941, land?.longitude || 85.1376];

  const parcelBoundary = land?.boundary || [
    [25.5952, 85.1365],
    [25.5955, 85.138],
    [25.5938, 85.1385],
    [25.5935, 85.137],
  ];

  return (
    <div
      className={`relative w-full overflow-hidden ${
        fullScreen ? "h-full" : "h-[420px]"
      }`}
    >
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        {/* Boundary Auto Focus Hook */}
        <MapFocus boundary={parcelBoundary} focusParcel={focusParcel} />

        {/* =======================================================
            NATIVE LEAFLET LAYERS CONTROL (Top-Right Layer Switcher)
        ======================================================= */}
        <LayersControl position="topright">
          {/* Base Layer 1: Street / Road Map */}
          <LayersControl.BaseLayer checked name="🗺️ Street View (Map)">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* Base Layer 2: Satellite Imagery */}
          <LayersControl.BaseLayer name="🛰️ Satellite View">
            <TileLayer
              attribution="&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          {/* Overlay Layer: Cadastral Boundary (Khesra Naksha) */}
          <LayersControl.Overlay checked name="📐 Cadastral Plot Boundary">
            <Polygon
              positions={parcelBoundary}
              pathOptions={{
                color: "#10b981", // Emerald boundary border
                fillColor: "#34d399",
                fillOpacity: 0.35,
                weight: 3,
                dashArray: "4, 4", // Cadastral survey look
              }}
            />
          </LayersControl.Overlay>
        </LayersControl>

        {/* Center Point Plot Marker */}
        <Marker position={position} icon={customMarkerIcon}>
          <Popup>
            <div className="p-1 font-sans">
              <p className="font-bold text-slate-800">
                {land?.district || "Patna"} Land Parcel
              </p>
              <div className="mt-1.5 space-y-0.5 text-xs text-slate-600">
                <p>
                  Khesra: <strong>{land?.khesra || "1254"}</strong>
                </p>
                <p>
                  Khata: <strong>{land?.khata || "342"}</strong>
                </p>
                <p>
                  Area: <strong>{land?.area || "2.50 Acre"}</strong>
                </p>
                {land?.ulpin && (
                  <p className="font-mono text-[11px] text-slate-500">
                    ULPIN: {land.ulpin}
                  </p>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LandMap;
