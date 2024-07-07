import React from 'react'
import { GoogleOAuthProvider, IdConfiguration } from '@react-oauth/google';

import { Outlet } from 'react-router-dom'
import { toast } from 'sonner';

const GoogleAuthProvider = ({ children }: { children: React.JSX.Element }) => {
  return process.env.REACT_APP_GOOGLE_CLIENT_ID ? <GoogleOAuthProvider onScriptLoadError={()=>{toast.error("Google Authentication Error")}} clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    {children}
  </GoogleOAuthProvider> : <>{children}</>
}

export default GoogleAuthProvider
