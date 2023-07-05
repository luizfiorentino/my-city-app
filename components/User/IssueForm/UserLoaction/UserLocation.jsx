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
  const center = [52.3732, 4.8914];
  console.log(
    "marker position",
    markerPosition,
    "props.location type",
    props.locationType
  );

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    //This saves coordinates in case of locationType === "map"
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),

      []
    );

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    console.log("POSITION", position, "latitude cont", context.latitude);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
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

  return (
    <div className={styles.mainContainer}>
      {context.latitude || props.latitude ? (
        <MapContainer
          // center={[latitude, longitude]}
          center={props.locationType === "current" ? markerPosition : center}
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
          Loading your location..
          <LoaderSpinner />
        </p>
      )}
    </div>
  );
}

export default UserLocation;
