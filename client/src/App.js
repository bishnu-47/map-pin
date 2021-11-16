import { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import axios from "axios";

import Card from "./components/Card";
import MarkerPin from "./components/MarkerPin";
import NewPinForm from "./components/NewPinForm";
import PopupCard from "./components/PopupCard";
import "./app.css";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const myStorage = window.localStorage;

  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPinId, setCurrentPinId] = useState(null);
  const [newPin, setNewPin] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
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

  function handleOnLogout() {
    myStorage.removeItem("user");
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

        {currentUser ? (
          <button className="button logout" onClick={handleOnLogout}>
            Logout
          </button>
        ) : (
          <div className="buttons">
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
          </div>
        )}

        {showRegister && (
          <Register
            setShowRegister={setShowRegister}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}

        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
