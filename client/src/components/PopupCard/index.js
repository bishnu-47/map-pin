import { Popup } from "react-map-gl";

const PopupCard = ({ pin, setStateValue, children }) => {
  return (
    <Popup
      latitude={pin.lat}
      longitude={pin.long}
      closeButton={true}
      closeOnClick={false}
      onClose={() => setStateValue(null)}
      anchor="left"
    >
      <div>{children}</div>
    </Popup>
  );
};

export default PopupCard;
