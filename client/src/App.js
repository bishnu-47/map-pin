import { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import axios from "axios";

import Card from "./components/Card";
import MarkerPin from "./components/MarkerPin";
import NewPinForm from "./components/NewPinForm";
import PopupCard from "./components/PopupCard";

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
            <MarkerPin
              pin={pin}
              viewport={viewport}
              currentUser={currentUser}
              setCurrentPinId={setCurrentPinId}
              setViewport={setViewport}
            />

            {currentPinId === pin._id && (
              <PopupCard pin={pin} setStateValue={setCurrentPinId}>
                <Card
                  place={pin.title}
                  review={pin.desc}
                  rating={4}
                  username={pin.username}
                  time={pin.createdAt}
                />
              </PopupCard>
            )}

            {newPin && (
              <PopupCard pin={newPin} setStateValue={setNewPin}>
                  <NewPinForm
                    username={currentUser}
                    lat={newPin.lat}
                    long={newPin.long}
                    pins={pins}
                    setPins={setPins}
                    setNewPin={setNewPin}
                  />
              </PopupCard>
            )}
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
