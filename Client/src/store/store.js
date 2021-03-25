import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import authentication from "./login/loginReducer";
import {isValidToken} from './utils'

const createRootReducer = () =>
  combineReducers({
    authentication,
  });

const initState = {
  authentication: {
    currentUser: localStorage.getItem("USER-TOKEN")
    ? isValidToken(localStorage.getItem("USER-TOKEN"))
    : null,
    token: localStorage.getItem("USER-TOKEN"),
    error: "",
    loading: false,
    isAuthenticated: false,
  },
};

const makeStore = (initialState = initState) => {
  let composeEnhancers = compose;
  const middlewares = [thunk];

  // if (process.env.NODE_ENV === "development") {
  //   if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  //     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  //   }
  // }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  // if (module.hot) {
  //   module.hot.accept("./login/loginReducer", () => {
  //     const nextReducer = require("./login/loginReducer").default;
  //     store.replaceReducer(nextReducer);
  //   });
  // }
  return store;
};

export default makeStore;
