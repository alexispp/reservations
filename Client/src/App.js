import "./App.scss";

import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminView from "./views/AdminView/AdminView";
import CeremoniesView from "./views/CeremoniesView/CeremoniesView";
import ReservationView from "./views/ReservationView/ReservationView";
import PrivateRoute from "./components/privateRoute";

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
                    <PrivateRoute path="/admin/ceremonies">
                        <CeremoniesView />
                    </PrivateRoute>
                    <PrivateRoute path="/admin">
                        <AdminView />
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
