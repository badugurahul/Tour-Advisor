import { useAuthContext } from "./useAuthContext.js"

export const useLogout = () => {
   const { dispatch } = useAuthContext()

   const logout = () => {
      // remove data from local storage
      
      localStorage.removeItem( "exists" )

      dispatch( { type: "LOGOUT" } )
   }

   return { logout }
}

