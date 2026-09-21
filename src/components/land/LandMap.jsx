import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

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
      className={`w-full overflow-hidden ${
        fullScreen ? "h-full" : "h-[420px]"
      }`}
    >
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Focus selected parcel */}
        <MapFocus boundary={parcelBoundary} focusParcel={focusParcel} />

        {/* Land Parcel Boundary */}
        <Polygon
          positions={parcelBoundary}
          pathOptions={{
            color: "#1f7a5a",
            fillColor: "#1f7a5a",
            fillOpacity: 0.2,
            weight: 2,
          }}
        />

        {/* Land Location */}
        <Marker position={position}>
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-semibold">
                {land?.district || "Patna"} Land Parcel
              </p>

              <p className="mt-1 text-sm">Khesra: {land?.khesra || "1254"}</p>

              <p className="text-sm">Area: {land?.area || "2.50 Acre"}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LandMap;
