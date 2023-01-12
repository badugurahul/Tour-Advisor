import React, { useState, useEffect } from 'react'
import "./Viewmore.css"
import NewLocation from "../../Components/Map/Newlocation"
import Rating from './Rating'
import axios from 'axios'
import { useNavigate } from 'react-router'
import EditLocationdata from './editlocation'
import Imgcarousel from "./imgcarousel"
import { Link } from 'react-router-dom'
// import { useAuthContext } from '../../Hooks/useAuthContext'

const Viewmore = () => {
  const [editloc, setEditloc] = useState( false )
  const [editingloc, setEditingloc] = useState( false )
  const navigate = useNavigate()
  const [Viewdata, setviewData] = useState( [] )
  // const { user } = useAuthContext()

  // user id from userlogin 
  const userToken = JSON.parse( localStorage.getItem( 'exists' ) )
  const locid = JSON.parse( localStorage.getItem( 'loc' ) )
  let url = `http://localhost:5000/api/location/${locid}`
  const viewlocatoindata = async () => {
    const res = await fetch( url )
    const data = await res.json()
    setviewData( [data.Locationsdata] )
  }

  const del = async ( _id ) => {
    try {
      const url = `http://localhost:5000/api/location/${_id}`
      await axios.delete( url )
      navigate( "/locations" )
    }
    catch ( err ) {
      console.log( err )
    }

  }
  useEffect( () => {
    viewlocatoindata()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingloc] )
  return (
    <>
      <div className='viewmore'>
        {
          Viewdata.map( ( item, i ) => {
            const { _id, location: { coordinate: [a, b] }, title, address, locationfee, des, imagesd: { image }, userId, name } = item
            return (
              <div key={i} className="viewmorecontainer">
                <div className='leftsidecontainer'>
                  <div className='viewimage'>
                    <Imgcarousel imag={image} />
                  </div>
                  <div className='viewdatacontainer'>
                    <h1>More About {title}</h1>
                    <h3>{address}</h3>
                    <p>{des}</p>
                    <h2>${locationfee}</h2>
                    {
                      userToken.id === userId ?
                        <div className='viewmorebtn'>
                          <div className='viewmorebuttons'>
                            <div className='edit'>
                              <button onClick={() => setEditloc( !editloc )}>Edit</button>

                            </div>

                            <div className='delete'>

                              <button onClick={() => {
                                del( _id )

                              }}>Delete</button>
                            </div>
                          </div>
                          {
                            editloc ? <EditLocationdata editing={setEditingloc} /> : ""
                          }

                        </div> : ""
                    }
                    <Link to='/locations'><u>view all locations</u></Link>

                    <p>Post by : <strong>{name}</strong></p>

                  </div>


                </div>
                <div className='rightsidecontainer'>
                  <NewLocation lon={a} lat={b} />
                  <Rating />

                </div>

              </div>
            )
          } )
        }
      </div>
    </>
  )

}

export default Viewmore
