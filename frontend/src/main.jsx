
import '../style.css'
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import { hideSplashScreen } from "vite-plugin-splash-screen/runtime";

function DelayedApp(){
  
  useEffect(() => {
    hideSplashScreen();
  }, []);
  
    return(
        <App />
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <DelayedApp />
    </React.StrictMode>
  );