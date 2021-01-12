import React, { createContext, useContext } from "react";
import { users as usersApi, setAuthorizationHeader } from "api";

const initState = {
  users: [],
  token: null,
};

const reducer = (state, action) => {
  const { type, token } = action;
  switch (type) {
    case "setUser":
      return { ...state, token };
    case "login":
      return { ...state, token };
    case "logout":
      return { ...state, ...initState };
    case "loadUsers":
      return { ...state, users: action.users};
    case "deleteUser":
      let newUsers = state.users.filter((a) => a.id !== action.user.id);
      return { ...state, newUsers };
    default:
      throw Error("no cases found");
  }
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
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
  dispatch({ type: "login", token });
  localStorage.setItem("userToken", token);
  setAuthorizationHeader(token);
};

export const logout = (dispatch) => {
  dispatch({ type: "logout" });
  setAuthorizationHeader();
  delete localStorage.userToken;
};

export const deleteUser = (dispatch, user) => {
  usersApi.delete(user).then(() => dispatch({ type: "deleteUser", user }))
  
};

export const loadUsers = (dispatch) => {
  usersApi.fetchAll().then((users) => dispatch({ type: "loadUsers", users }));
};
export default UserContext;
