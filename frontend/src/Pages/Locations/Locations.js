import React from 'react'

import LocationMap from '../../Components/Map/LocationMap'
import AddLocation from '../../Components/AddLocation/AddLocation'
import './Location.css'

const Locations = () => {


  return (
    <div className="Locationspage">
      <LocationMap />
      <AddLocation />

    </div>
  )
}
export default Locations
