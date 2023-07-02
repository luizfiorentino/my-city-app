import { useContext } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import IssueContext from "@/utils/IssueContext";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import styles from "./UserLocation.module.css";
import "maplibre-gl/dist/maplibre-gl.css";

// let DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   iconRetinaUrl: markerIconRetina,
//   shadowUrl: markerShadow,
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// console.log("Default icon", DefaultIcon);

function UserLocation() {
  const context = useContext(IssueContext);
  const latitude = context.latitude ? context.latitude : "52.3732";
  const longitude = context.longitude ? context.longitude : "4.8914";

  const markerPosition = [latitude, longitude];

  return (
    <div className={styles.mainContainer}>
      <MapContainer
        // center={[latitude, longitude]}
        center={markerPosition}
        zoom={14}
        style={{ width: "100%", height: "180px" }}
      >
        <TileLayer
          attribution={`&copy; MapTiler &copy; OpenStreetMap contributors`}
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Zlvdjhx8LLJZkQKgusKO"
        />
        <Marker position={markerPosition} />
      </MapContainer>
    </div>
  );
}

export default UserLocation;
