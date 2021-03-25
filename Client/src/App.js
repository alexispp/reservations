import "./App.css";

import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AdminView from "./components/AdminView/AdminView";
import ReservationView from "./components/ReservationView/ReservationView";
import PrivateRoute from './components/privateRoute'

import { ProvideAuth, useAuth } from "./hooks/auth.js";

function App() {
  // const [token, setToken] = useState();

  // function PrivateRoute({ children, ...rest }) {
  //   // const auth = useAuth();
  //   return (
  //     <Route
  //       {...rest}
  //       render={({ location }) =>
  //         auth.user ? (
  //           children
  //         ) : (
  //           <Redirect to={{ pathname: "/", state: { from: location } }} />
  //         )
  //       }
  //     />
  //   );
  // }

  return (
    <>
      {/* <ProvideAuth> */}
        <Router>
          <Switch>
            <PrivateRoute path="/admin">
              <AdminView  />
            </PrivateRoute>

            <Route path="/">
              <ReservationView />
            </Route>
          </Switch>
        </Router>
      {/* </ProvideAuth> */}
    </>
  );
}

export default App;
