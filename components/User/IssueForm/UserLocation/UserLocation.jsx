import { useContext } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import IssueContext from "@/utils/IssueContext";
import styles from "./UserLocation.module.css";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";
import { geolocationApiCall } from "@/services";

function UserLocation(props) {
  const context = useContext(IssueContext);

  const latitude = context.latitude ? context.latitude : "52.3732";
  const longitude = context.longitude ? context.longitude : "4.8914";

  const markerPosition = props.admin
    ? [props.latitude, props.longitude]
    : [latitude, longitude];

  const center =
    props.locationType === "current"
      ? markerPosition
      : [parseFloat(latitude), parseFloat(longitude)];

  function LocationMarker() {
    const map = useMapEvents({
      async click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        context.setLatitude(lat.toString());
        context.setLongitude(lng.toString());
        map.flyTo(e.latlng, map.getZoom());
        const [error, address] = await geolocationApiCall(
          lat.toString(),
          lng.toString()
        );
        context.setIssueAddress(address);
      },
    });
    return null;
  }

  return (
    <div
      className={
        context.latitude || props.latitude
          ? styles.mainContainer
          : styles.hidden
      }
    >
      {(context.latitude || props.latitude) && context.loading === false && (
        <MapContainer
          center={center}
          zoom={14}
          style={{ width: "100%", height: "180px" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution={`&copy; MapTiler &copy; OpenStreetMap contributors`}
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Zlvdjhx8LLJZkQKgusKO"

            //Alternatively (also works!)
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={markerPosition} />
          <LocationMarker />
        </MapContainer>
      )}
      {context.loading && (
        <p>
          Loading location... <LoaderSpinner />
        </p>
      )}
    </div>
  );
}

export default UserLocation;
