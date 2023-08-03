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

function UserLocation(props) {
  const context = useContext(IssueContext);
  console.log("UserLocation, context.loading", context.loading);
  const latitude = context.latitude ? context.latitude : "52.3732";
  const longitude = context.longitude ? context.longitude : "4.8914";

  const markerPosition = props.admin
    ? [props.latitude, props.longitude]
    : [latitude, longitude];

  const center =
    props.locationType === "current"
      ? markerPosition
      : [parseFloat(latitude), parseFloat(longitude)];

  async function geolocationApiCall(latitude, longitude) {
    const apiUrl = `/api/geolocation?latitude=${latitude}&longitude=${longitude}`;

    try {
      const domain = window.location.origin; // Get the current domain
      const headers = {
        "x-domain-header": domain, // Set the custom header with the domain
      };
      const response = await fetch(apiUrl, { headers });
      const data = await response.json();

      if (response.ok) {
        const { address } = data;
        context.setIssueAddress(address);
        context.setButtonInactive(false);
      } else {
        console.log("No address found for the given coordinates.");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  }

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        context.setLatitude(lat.toString());
        context.setLongitude(lng.toString());
        map.flyTo(e.latlng, map.getZoom());
        geolocationApiCall(lat.toString(), lng.toString());
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
