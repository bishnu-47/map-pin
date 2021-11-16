import { Marker } from "react-map-gl";
import { Room } from "@material-ui/icons";

const MarkerPin = ({
  pin,
  viewport,
  currentUser,
  setCurrentPinId,
  setViewport,
}) => {
  function handleOnPinClick(id, lat, long) {
    setCurrentPinId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  }

  return (
    <Marker
      latitude={pin.lat}
      longitude={pin.long}
      offsetLeft={-viewport.zoom * 3.5}
      offsetTop={-viewport.zoom * 7}
    >
      <span>
        <Room
          style={{
            fontSize: viewport.zoom * 7,
            color: currentUser === pin.username ? "tomato" : "slateblue",
            cursor: "pointer",
          }}
          onClick={() => handleOnPinClick(pin._id, pin.lat, pin.long)}
        />
      </span>
    </Marker>
  );
};

export default MarkerPin;
