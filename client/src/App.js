import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import { Room } from "@material-ui/icons";

import Card from "./components/Card";
import NewPinForm from "./components/NewPinForm";

function App() {
  const currentUser = "saitama"; // TODO: remove
  const [pins, setPins] = useState([]);
  const [currentPinId, setCurrentPinId] = useState(null);
  const [newPin, setNewPin] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
  });

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/api/pin`);

        setPins(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPins();
  }, []);

  function handleOnPinClick(id, lat, long) {
    setCurrentPinId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  }

  function handleAddNewPin(e) {
    const [long, lat] = e.lngLat;

    setNewPin({
      lat,
      long,
    });
  }

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onDblClick={handleAddNewPin}
        transitionDuration="250"
      >
        {pins.map((pin) => (
          <div key={pin._id}>
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
                    color:
                      currentUser === pin.username ? "tomato" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOnPinClick(pin._id, pin.lat, pin.long)}
                />
              </span>
            </Marker>

            {currentPinId === pin._id && (
              <Popup
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPinId(null)}
                anchor="left"
              >
                <div>
                  <Card
                    place={pin.title}
                    review={pin.desc}
                    rating={4}
                    username={pin.username}
                    time={pin.createdAt}
                  />
                </div>
              </Popup>
            )}

            {newPin && (
              <Popup
                latitude={newPin.lat}
                longitude={newPin.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setNewPin(null)}
                anchor="left"
              >
                <div>
                  <NewPinForm
                    username={currentUser}
                    lat={newPin.lat}
                    long={newPin.long}
                    pins={pins}
                    setPins={setPins}
                    setNewPin={setNewPin}
                  />
                </div>
              </Popup>
            )}
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
