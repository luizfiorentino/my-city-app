import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Head from "next/head";
import Map, { NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import styles from "./UserLocation.module.css";
import "maplibre-gl/dist/maplibre-gl.css";

function UserLocation() {
  return (
    <div className={styles.mainContainer}>
      {/* <MapContainer center={[52.505, -0.09]} zoom={1} scrollWheelZoom={true}>
        <TileLayer
          attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Zlvdjhx8LLJZkQKgusKO"
        />
      </MapContainer> */}
      {/* <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: 16.62662018,
          latitude: 49.2125578,
          zoom: 14,
        }}
        style={{ width: "100% !important", height: " calc(100vh - 77px)" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=Zlvdjhx8LLJZkQKgusKO"
      >
      
      </Map> */}
      <MapContainer
        center={[49.2125578, 16.62662018]}
        zoom={14}
        style={{ width: "100%", height: "380px" }}
      >
        <TileLayer
          attribution={`&copy; MapTiler &copy; OpenStreetMap contributors`}
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Zlvdjhx8LLJZkQKgusKO"
        />
      </MapContainer>
    </div>
  );
}

export default UserLocation;
