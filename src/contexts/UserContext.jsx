import React, {createContext, useContext} from "react";

import {setAuthorizationHeader} from "api";

const initState = {
  token: null,
};

const reducer = (state, action) => {
  const {type, token} = action;
  switch (type) {
    case "setUser":
      return {...state, token};
    case "login":
      return {...state, token};
    case "logout":
      return {...state, ...initState};
    default:
      throw Error("no cases found");
  }
};

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, dispatch] = React.useReducer(reducer, initState);
 
  React.useEffect(() => {
    if (localStorage.userToken) {
      dispatch({
        type: "setUser",
        token: localStorage.userToken,
      });
      setAuthorizationHeader(localStorage.userToken);
    }
  }, []);
  const value = [user, dispatch];
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("useUser must be used within UserProvider");
  }
  return context;
}

export const login = (dispatch, token) => {
  dispatch({type: "login", token});
  localStorage.setItem("userToken", token)
  setAuthorizationHeader(token);
};

export const logout = dispatch => {
  dispatch({type: "logout"});
  setAuthorizationHeader();
  delete localStorage.userToken;
};

export default UserContext;