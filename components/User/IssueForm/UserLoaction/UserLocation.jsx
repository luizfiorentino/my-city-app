import { useContext, useState, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import IssueContext from "@/utils/IssueContext";
import styles from "./UserLocation.module.css";
import "maplibre-gl/dist/maplibre-gl.css";
import LoaderSpinner from "@/components/Shared/LoaderSpinner/LoaderSpinner";

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

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    //This saves coordinates in case of locationType === "map"
    const context = useContext(IssueContext);
    const markerRef = useRef(null);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const { lat, lng } = marker.getLatLng();
            context.setLatitude(lat.toString());
            context.setLongitude(lng.toString());
            geolocationApiCall(lat.toString(), lng.toString());
          }
        },
      }),

      []
    );

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={center}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }

  if (props.locationType === null) {
    return null;
  }

  async function geolocationApiCall(latitude, longitude) {
    const apiKey = "cb2e81c8ea3f4d6fb5ef22343b6e8542";
    //const apiKey = process.env.OPENCAGE_API_KEY; -> not working
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude},${longitude}&pretty=1`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const address = data.results[0].formatted;
          context.setIssueAddress(address);
        } else {
          console.log("No address found for the given coordinates.");
        }
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }

  return (
    <div className={styles.mainContainer}>
      {context.latitude || props.latitude ? (
        <MapContainer
          center={center}
          zoom={14}
          style={{ width: "100%", height: "180px" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution={`&copy; MapTiler &copy; OpenStreetMap contributors`}
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Zlvdjhx8LLJZkQKgusKO"
          />
          {props.locationType === "current" ? (
            <Marker position={markerPosition} />
          ) : (
            <DraggableMarker />
          )}
        </MapContainer>
      ) : (
        <p>
          Loading your location...
          <LoaderSpinner />
        </p>
      )}
    </div>
  );
}

export default UserLocation;
