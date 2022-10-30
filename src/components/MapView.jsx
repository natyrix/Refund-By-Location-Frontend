import React, {useState} from 'react'
import ReactMapGL,{Marker, Source, Layer, ScaleControl} from 'react-map-gl'
import * as turf from "@turf/turf";
import { useEffect } from 'react';

export default function MapView({selectedContract,locations}) {

    function calc_coordinates(coord, index){
        let val = [String(coord).slice(0,index),".",String(coord).slice(index)]
        return val.join('')
    }

    let center = [calc_coordinates(selectedContract.coord_long,selectedContract.lng_offset),calc_coordinates(selectedContract.coord_lat,selectedContract.lat_offset)]

    let options = { steps: 50, units: "meters", properties: { foo: "bar" } };
    let circle = turf.circle(center, selectedContract.radius, options);
    let line = turf.lineString(...circle.geometry.coordinates);

    



    const [viewport, setViewPort] = useState({
        // latitude: calc_coordinates(selectedContract.coord_lat,selectedContract.lat_offset),
        // longitude: calc_coordinates(selectedContract.coord_long,selectedContract.lng_offset),
        // latitude: 9.02497,
        // longitude: 38.74689,
        // zoom: 10,
    })
    return (
        <ReactMapGL 
          initialViewState={{
            latitude: calc_coordinates(selectedContract.coord_lat,selectedContract.lat_offset),
            longitude: calc_coordinates(selectedContract.coord_long,selectedContract.lng_offset),
            zoom: 15,
          }}
          style={{width: 800, height: 500}}
          mapboxAccessToken={process.env.REACT_APP_MAP_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker color='blue' latitude={calc_coordinates(selectedContract.coord_lat,selectedContract.lat_offset)} longitude={calc_coordinates(selectedContract.coord_long,selectedContract.lng_offset)}>
              
            </Marker>

            {locations.map((l)=>(
              <Marker color={l.status?'green':'red'} key={l.timestamp} latitude={calc_coordinates(l.coord_lat,l.lat_offset)} longitude={calc_coordinates(l.coord_long,l.lng_offset)}>
              
          </Marker>
            ))}

            <Source id="my-data" type="geojson" data={circle}>
          <Layer
            id="point-90-hi"
            type="fill"
            paint={{
              "fill-color": "#088",
              "fill-opacity": 0.4,
              "fill-outline-color": "yellow"
            }}
          />
        </Source>
        <Source id="my-ata" type="geojson" data={line}>
          <Layer
            id="point-9-hi"
            type="line"
            paint={{
              "line-color": "red",
              "line-width": 2
            }}
          />
        </Source>
        </ReactMapGL>
      );
    // return (
    //     <ReactMapGL
    //       initialViewState={{
    //         latitude: calc_coordinates(selectedContract.coord_lat,selectedContract.lat_offset),
    //         longitude: calc_coordinates(selectedContract.coord_long,selectedContract.lng_offset),
    //         zoom: 10,
    //         width: '700',
    //         height: '700'
    //       }}
    //       style={{width: 600, height: 400}}
    //       mapStyle="mapbox://styles/mapbox/streets-v9"
    //       mapboxAccessToken={process.env.REACT_APP_MAP_ACCESS_TOKEN}
    //     />
    //   );

//   return (
//     <ReactMapGL {...viewport} mapboxAccessToken={process.env.REACT_APP_MAP_ACCESS_TOKEN}>
//         markers
//     </ReactMapGL>
//   )
}
