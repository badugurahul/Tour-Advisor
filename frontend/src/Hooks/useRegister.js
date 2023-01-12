import { useState } from "react";



export const useRegister = () => {
   const [error, setError] = useState( null )
  
   const register = async ( name, email, password ) => {
      setError( null )
      const response = await fetch( "http://localhost:5000/api/user/register", {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify( { name, email, password } )
      } )
      const data = await response.json()
      if ( !response.ok ) {
         setError( data.error )
      }
      

   }
   return { register, error }

}