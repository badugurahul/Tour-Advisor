import React, { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css'
import './LocationMap.css'



const LocationMap = () => {
   const [mark, setMark] = useState( [] )
   const mapMarker = async () => {
      const res = await fetch( "http://localhost:5000/api/location" )
      const data = await res.json()
      setMark( data )
      // console.log(data,"hi")
   }


   useEffect( () => {
      mapMarker()
   }, [] )

   return (
      <div>
         <div className='globalcontainer'>
            <div className='map'>
               <Map initialViewState={
                  {
                     longitude: 78.4867,
                     latitude: 17.3850,
                     zoom: 8,
                  }
               }
                  // zoom: 6

                  mapboxAccessToken='pk.eyJ1Ijoic2hpdmExNjgiLCJhIjoiY2xjMWZyZWlhMGNwZDN2b2R4dzVyOGFlYSJ9.snSXqrmACLeeadbFeZlkcw'
                  style={{
                     height: "400px",
                     borderRadius: '5px',
                     overflow: 'hidden',
                     boxShadow: "0px 0px 3px rgb(85, 85, 85)",
                  }}

                  mapStyle="mapbox://styles/mapbox/streets-v9"
               >
                  {
                     mark.map( ( item, i ) => {
                        const { location: { coordinate: [a, b] } } = item
                        return (
                           <>
                              <Marker key={i}
                                 longitude={a} latitude={b} />

                           </> )
                     } )
                  }

               </Map>
            </div>

         </div>
      </div>

   )
}

export default LocationMap
