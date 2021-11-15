import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room } from "@material-ui/icons";

import Card from "./components/card/Card";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Marker
          latitude={28.6129}
          longitude={77.2295}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <span>
            <Room style={{ fontSize: viewport.zoom * 7, color: "slateblue" }} />
          </span>
        </Marker>

        <Popup
          latitude={28.6129}
          longitude={77.2295}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
        >
          <div>
            <Card
              place="India Gate"
              review="amazing place"
              rating={4}
              username="deathknell"
              time="1hr"
            />
          </div>
        </Popup>
      </ReactMapGL>
    </div>
  );
}

export default App;
