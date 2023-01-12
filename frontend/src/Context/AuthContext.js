import { createContext, useContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()
export const authReducer = ( state, action ) => {
   switch ( action.type ) {
      case "LOGIN":
         return { user: action.payload };
      case "LOGOUT":
         return { user: null };
      default:
         return state
   }
}
const AuthContextProvider = ( { children } ) => {
   const [state, dispatch] = useReducer( authReducer, {
      user: ""
   } )
   
   useEffect( () => {
      const user = JSON.parse( localStorage.getItem( "exists" ) );
      if ( user ) {
         dispatch( { type: "LOGIN", payload: user } )
      }
   }, [] )






   useEffect( () => {
      const regi = JSON.parse( localStorage.getItem( "exists" ) )
      if ( regi ) {
         dispatch( { type: "REGISTER", payload: regi } )

      }

   }, [] )

   return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
         {children}
      </AuthContext.Provider>
   )
}

export const Globalcontext = () => {
   return useContext( AuthContext )
}

export default AuthContextProvider