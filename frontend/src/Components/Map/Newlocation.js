
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'



const Newlocation = ( { lon, lat } ) => {
   return (
      <div>
         <div className='globalcontainer'>
            <div className='map'>
               <Map

                  mapboxAccessToken='pk.eyJ1Ijoic2hpdmExNjgiLCJhIjoiY2xjMWZyZWlhMGNwZDN2b2R4dzVyOGFlYSJ9.snSXqrmACLeeadbFeZlkcw'
                  style={{
                     width: "600px",
                     height: "500px",
                     borderRadius: '5px',
                     overflow: 'hidden',
                     boxShadow: "0px 0px 3px rgb(85, 85, 85)",
                  }}
                  
                  initialViewState={
                     {
                        
                        zoom:12,
                        longitude:lon,
                        latitude:lat
                     }
                  }

                  mapStyle="mapbox://styles/mapbox/streets-v9"
               >


                  <Marker
                     longitude={lon} latitude={lat} />






               </Map>
            </div>

         </div>
      </div>

   )
}

export default Newlocation
