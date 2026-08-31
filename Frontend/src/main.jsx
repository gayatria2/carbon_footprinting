import React from "react";
import ReactDOM from "react-dom/client";


import {
  BrowserRouter,
} from "react-router-dom";

import {
  GoogleOAuthProvider,
} from "@react-oauth/google";

import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <BrowserRouter>

      <GoogleOAuthProvider
        clientId={
          import.meta.env.VITE_GOOGLE_CLIENT_ID
        }
      >

        <App />

          <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "14px",
              padding: "14px 18px",
              fontWeight: "600",
            },
          }}
        />


      </GoogleOAuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);



// import React from "react";
// import ReactDOM from "react-dom/client";

// import {
//   GoogleOAuthProvider,
// } from "@react-oauth/google";

// import App from "./App";
// import "./index.css";

// import {
//   ThemeProvider,
// } from "./context/ThemeContext";


// ReactDOM.createRoot(
//   document.getElementById("root")
// ).render(

//   <React.StrictMode>

//     <GoogleOAuthProvider
//       clientId={
//         import.meta.env.VITE_GOOGLE_CLIENT_ID
//       }
//     >

//       <ThemeProvider>

//         <App />

//       </ThemeProvider>

//     </GoogleOAuthProvider>

//   </React.StrictMode>

// );