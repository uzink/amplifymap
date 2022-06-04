import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

const data = [
  {
    imei: "89882280666031027323",

    time: "2000-0-0 0:0:0",

    latitude: 0,

    longitude: 0,

    altitude_m: 0,

    speed_kmph: 0,

    satellites: 0,

    hdop: 99.99,

    course: 0,

    a_acceleration_x: -7.95593214,

    a_acceleration_y: -11.10909557,

    a_acceleration_z: 0.136469498,

    g_gyro_x: -0.114045948,

    g_gyro_y: 0.387169987,

    g_gyro_z: 0.098058186,

    temp: 25.88882446,
  },
  {
    imei: "89882280666031027323",

    time: "2022-6-4 14:39:32",

    latitude: 51.36172367,

    longitude: 1.031778833,

    altitude_m: 6.6,

    speed_kmph: 0.12964,

    satellites: 8,

    hdop: 1.22,

    course: 40622,

    a_acceleration_x: 20.96841812,

    a_acceleration_y: 6.557718277,

    a_acceleration_z: -8.441955566,

    g_gyro_x: -0.525730491,

    g_gyro_y: -0.406088829,

    g_gyro_z: -0.147886679,

    temp: 24.6152935,
  },
];

const Map = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      const infowindow = new window.google.maps.InfoWindow({
        content: `IMEI: ${options.position.id}`,
      });
      marker.setOptions(options);

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          shouldFocus: false,
        });
      });
    }
  }, [marker, options]);

  return null;
};

export default function App() {
  const [markers, setMarkers] = React.useState([]);

  React.useEffect(() => {
    const tempMarkers = [];
    data.map((obj) => {
      return tempMarkers.push({
        id: obj.imei,
        lat: obj.latitude,
        lng: obj.longitude,
      });
    });

    setMarkers(tempMarkers);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {markers.length < 1 ? (
        "Loading..."
      ) : (
        <Wrapper apiKey={"AIzaSyD6AUPIR0eIiGldIIo0b06uqLxlZDyQh-I"}>
          <Map
            center={{ lat: 0, lng: 0 }}
            zoom={3}
            style={{ flexGrow: "1", height: "100%" }}
          >
            {markers.map((marker) => {
              return <Marker position={marker} />;
            })}
          </Map>
        </Wrapper>
      )}
    </div>
  );
}
